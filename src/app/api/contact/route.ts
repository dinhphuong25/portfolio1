import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured in environment variables.');
      return NextResponse.json(
        { error: 'Hệ thống gửi mail chưa được cấu hình API Key. Vui lòng thêm RESEND_API_KEY.' },
        { status: 500 }
      );
    }

    const { name, email, subject, message, language } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ tên, email và nội dung tin nhắn.' },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);
    const isEn = language === 'en';

    // Email nhận thư thông báo khi khách gửi form (email cá nhân của Đình Phương)
    const toEmail = process.env.CONTACT_EMAIL || 'kimdinhphuong205@gmail.com';

    // Email gửi đi đại diện cho domain đã xác thực trên Resend (ví dụ: contact@dinhphuong.tech)
    const fromEmail = process.env.FROM_EMAIL || 'Kim Đình Phương <contact@dinhphuong.tech>';

    // 1. Thư thông báo chi tiết gửi về cho bạn (Đình Phương)
    const adminEmailPromise = resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `[Portfolio] Tin nhắn từ ${name}${subject ? `: ${subject}` : ''}`,
      replyTo: email,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 20px;">📬 Tin nhắn liên hệ mới từ Portfolio</h2>
            <p style="color: #64748b; margin: 4px 0 0 0; font-size: 13px;">Nhận từ trang dinhphuong.tech/contact</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 120px; font-size: 14px;">Người gửi:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: bold; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; font-size: 14px;">Email liên hệ:</td>
              <td style="padding: 8px 0; font-size: 14px;">
                <a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${email}</a>
              </td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; font-size: 14px;">Chủ đề:</td>
              <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${subject}</td>
            </tr>
            ` : ''}
          </table>

          <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
            <p style="color: #475569; font-weight: 600; margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Nội dung tin nhắn:</p>
            <p style="color: #1e293b; margin: 0; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <a href="mailto:${email}?subject=Re: [Portfolio] ${encodeURIComponent(subject || 'Phản hồi tin nhắn của bạn')}" 
               style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
              Trả lời ${name} (${email})
            </a>
          </div>
        </div>
      `,
    });

    // 2. Thư tự động phản hồi & cảm ơn gửi trực tiếp đến người dùng vừa điền form
    const autoReplySubject = isEn
      ? `Thank you for reaching out, ${name}! - Kim Đình Phương`
      : `Cảm ơn bạn đã liên hệ, ${name}! - Kim Đình Phương`;

    const autoReplyHtml = isEn
      ? `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
          <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800;">Kim Đình Phương</h2>
            <p style="color: #64748b; margin: 4px 0 0 0; font-size: 13px; font-weight: 500;">Logistics & Supply Chain Specialist</p>
          </div>

          <p style="font-size: 16px; margin-top: 0; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
          
          <p style="font-size: 15px; line-height: 1.7; color: #334155;">
            Thank you for reaching out through my website! I have received your message and will review it carefully.
          </p>

          <p style="font-size: 15px; line-height: 1.7; color: #334155;">
            I usually respond within <strong>24 hours</strong>. If your matter is urgent, you can also reach me directly via Zalo or LinkedIn.
          </p>

          <div style="background-color: #f8fafc; border-radius: 12px; padding: 18px; border: 1px solid #e2e8f0; margin: 24px 0;">
            <p style="color: #64748b; font-weight: 700; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Summary of your message:</p>
            <p style="color: #1e293b; margin: 0; line-height: 1.6; font-size: 14px; font-style: italic;">"${message.replace(/\n/g, '<br>')}"</p>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 28px;">
            <p style="margin: 0 0 4px 0; font-size: 14px; color: #64748b;">Warm regards,</p>
            <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #0f172a;">Kim Đình Phương</p>
            <p style="margin: 4px 0; font-size: 13px; color: #475569;">🌐 Portfolio: <a href="https://dinhphuong.tech" style="color: #2563eb; text-decoration: none;">dinhphuong.tech</a></p>
            <p style="margin: 4px 0; font-size: 13px; color: #475569;">💼 LinkedIn: <a href="https://www.linkedin.com/in/kimdinhphuong/" style="color: #2563eb; text-decoration: none;">linkedin.com/in/kimdinhphuong</a></p>
            <p style="margin: 4px 0; font-size: 13px; color: #475569;">💬 Zalo: <a href="https://zalo.me/0903917400" style="color: #2563eb; text-decoration: none;">0903 917 400</a></p>
          </div>
        </div>
      `
      : `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
          <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 22px; font-weight: 800;">Kim Đình Phương</h2>
            <p style="color: #64748b; margin: 4px 0 0 0; font-size: 13px; font-weight: 500;">Logistics & Supply Chain Specialist</p>
          </div>

          <p style="font-size: 16px; margin-top: 0; line-height: 1.6;">Chào <strong>${name}</strong>,</p>
          
          <p style="font-size: 15px; line-height: 1.7; color: #334155;">
            Cảm ơn bạn đã gửi lời nhắn qua trang thông tin của Phương tại website <strong>dinhphuong.tech</strong>! Phương đã nhận được tin nhắn và sẽ xem xét thật kỹ.
          </p>

          <p style="font-size: 15px; line-height: 1.7; color: #334155;">
            Phương sẽ phản hồi lại bạn sớm nhất có thể (thường trong vòng <strong>24 giờ</strong>). Nếu có việc cần trao đổi gấp, bạn có thể liên hệ trực tiếp với Phương qua Zalo hoặc LinkedIn bên dưới nhé.
          </p>

          <div style="background-color: #f8fafc; border-radius: 12px; padding: 18px; border: 1px solid #e2e8f0; margin: 24px 0;">
            <p style="color: #64748b; font-weight: 700; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Nội dung tin nhắn bạn đã gửi:</p>
            <p style="color: #1e293b; margin: 0; line-height: 1.6; font-size: 14px; font-style: italic;">"${message.replace(/\n/g, '<br>')}"</p>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 28px;">
            <p style="margin: 0 0 4px 0; font-size: 14px; color: #64748b;">Trân trọng,</p>
            <p style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #0f172a;">Kim Đình Phương</p>
            <p style="margin: 4px 0; font-size: 13px; color: #475569;">🌐 Website: <a href="https://dinhphuong.tech" style="color: #2563eb; text-decoration: none;">dinhphuong.tech</a></p>
            <p style="margin: 4px 0; font-size: 13px; color: #475569;">💼 LinkedIn: <a href="https://www.linkedin.com/in/kimdinhphuong/" style="color: #2563eb; text-decoration: none;">linkedin.com/in/kimdinhphuong</a></p>
            <p style="margin: 4px 0; font-size: 13px; color: #475569;">💬 Zalo: <a href="https://zalo.me/0903917400" style="color: #2563eb; text-decoration: none;">0903 917 400</a></p>
          </div>
        </div>
      `;

    const autoReplyPromise = resend.emails.send({
      from: fromEmail,
      to: [email],
      subject: autoReplySubject,
      replyTo: toEmail,
      html: autoReplyHtml,
    });

    const [adminResult, autoReplyResult] = await Promise.allSettled([
      adminEmailPromise,
      autoReplyPromise,
    ]);

    if (adminResult.status === 'rejected') {
      console.error('Failed to send notification to admin:', adminResult.reason);
      return NextResponse.json(
        { error: 'Không thể gửi email thông báo. Vui lòng thử lại sau.' },
        { status: 500 }
      );
    }

    if (autoReplyResult.status === 'rejected') {
      console.warn('Failed to send auto-reply to user:', autoReplyResult.reason);
    }

    return NextResponse.json(
      {
        success: true,
        message: isEn
          ? 'Your message has been sent successfully! A confirmation email has been sent to your inbox.'
          : 'Tin nhắn đã được gửi thành công! Một email xác nhận đã được gửi đến hòm thư của bạn.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Đã xảy ra lỗi khi gửi email. Vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
