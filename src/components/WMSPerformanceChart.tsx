"use client";

import dynamic from "next/dynamic";

// Lazy-load toàn bộ recharts — chỉ tải khi component này được render
const ResponsiveContainer = dynamic(
    () => import("recharts").then((m) => ({ default: m.ResponsiveContainer })),
    { ssr: false }
);
const BarChart = dynamic(
    () => import("recharts").then((m) => ({ default: m.BarChart })),
    { ssr: false }
);
const Bar = dynamic(
    () => import("recharts").then((m) => ({ default: m.Bar })),
    { ssr: false }
);
const XAxis = dynamic(
    () => import("recharts").then((m) => ({ default: m.XAxis })),
    { ssr: false }
);
const YAxis = dynamic(
    () => import("recharts").then((m) => ({ default: m.YAxis })),
    { ssr: false }
);
const CartesianGrid = dynamic(
    () => import("recharts").then((m) => ({ default: m.CartesianGrid })),
    { ssr: false }
);
const Tooltip = dynamic(
    () => import("recharts").then((m) => ({ default: m.Tooltip })),
    { ssr: false }
);
const Legend = dynamic(
    () => import("recharts").then((m) => ({ default: m.Legend })),
    { ssr: false }
);

interface WMSChartProps {
    language: string;
}

export default function WMSPerformanceChart({ language }: WMSChartProps) {
    const data = [
        {
            name: language === "vi" ? "Thời gian nhận (giờ)" : "Receiving Time (hrs)",
            Before: 4.5,
            After: 1.2,
        },
        {
            name: language === "vi" ? "Lỗi tồn kho (%)" : "Inventory Error (%)",
            Before: 8.0,
            After: 0.5,
        },
        {
            name: language === "vi" ? "Thời gian nhặt (phút/đơn)" : "Picking Time (min/order)",
            Before: 15,
            After: 4,
        },
    ];

    return (
        <div className="mt-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
                {language === "vi"
                    ? "Hiệu suất kho hàng (Trước vs Sau khi triển khai WMS)"
                    : "Warehouse Performance (Before vs After WMS)"}
            </h3>
            <div className="h-72 w-full bg-slate-50 rounded-xl p-4 border border-slate-100">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#64748b" }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: "#64748b" }}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(241, 245, 249, 0.5)" }}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "none",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                            }}
                        />
                        <Legend
                            wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                            iconType="circle"
                        />
                        <Bar
                            dataKey="Before"
                            name={language === "vi" ? "Trước khi áp dụng" : "Before"}
                            fill="#cbd5e1"
                            radius={[4, 4, 4, 4]}
                            barSize={32}
                        />
                        <Bar
                            dataKey="After"
                            name={language === "vi" ? "Sau khi áp dụng" : "After"}
                            fill="#4f46e5"
                            radius={[4, 4, 4, 4]}
                            barSize={32}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
