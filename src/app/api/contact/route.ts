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

    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ tên, email và nội dung tin nhắn.' },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    // Email nhận thư thông báo khi khách gửi form (mặc định lấy từ CONTACT_EMAIL hoặc fallback)
    const toEmail = process.env.CONTACT_EMAIL || 'kimdinhphuong205@gmail.com';

    // Email gửi đi đại diện cho domain đã xác thực trên Resend (ví dụ: contact@dinhphuong.tech hoặc hi@dinhphuong.tech)
    const fromEmail = process.env.FROM_EMAIL || 'Portfolio Contact <contact@dinhphuong.tech>';

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `[Portfolio] Tin nhắn từ ${name}${subject ? `: ${subject}` : ''}`,
      replyTo: email,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 20px;">Tin nhắn liên hệ mới từ Portfolio</h2>
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

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json(
        { error: error.message || 'Không thể gửi email. Vui lòng kiểm tra lại cấu hình Resend.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Tin nhắn đã được gửi thành công!', data },
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
