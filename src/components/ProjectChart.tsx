"use client";

import dynamic from "next/dynamic";

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
const Cell = dynamic(
    () => import("recharts").then((m) => ({ default: m.Cell })),
    { ssr: false }
);

interface ProjectChartProps {
    data: { name: string; value: number }[];
    label: string;
}

export default function ProjectChart({ data, label }: ProjectChartProps) {
    return (
        <div className="mt-4">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">{label}</p>
            <div className="h-48 w-full bg-slate-50/50 dark:bg-slate-900/50 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: "#94a3b8" }}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(241, 245, 249, 0.3)" }}
                            contentStyle={{
                                borderRadius: "8px",
                                border: "none",
                                fontSize: "12px",
                                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            }}
                        />
                        <Bar
                            dataKey="value"
                            radius={[4, 4, 4, 4]}
                            barSize={30}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 0 ? "#cbd5e1" : "#4f46e5"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
