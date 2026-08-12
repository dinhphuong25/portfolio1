"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Reveal from "@/components/Reveal";
import dynamic from "next/dynamic";

// Dynamic Recharts imports to prevent SSR mismatch
const ResponsiveContainer = dynamic(
    () => import("recharts").then((m) => ({ default: m.ResponsiveContainer })),
    { ssr: false }
);
const LineChart = dynamic(
    () => import("recharts").then((m) => ({ default: m.LineChart })),
    { ssr: false }
);
const Line = dynamic(
    () => import("recharts").then((m) => ({ default: m.Line })),
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
const ReferenceLine = dynamic(
    () => import("recharts").then((m) => ({ default: m.ReferenceLine })),
    { ssr: false }
);

export default function ToolsPageClient() {
    const { language } = useLanguage();
    const isVi = language === "vi";
    const [activeTab, setActiveTab] = useState<"eoq" | "metrics">("eoq");

    // EOQ States
    const [demand, setDemand] = useState<number>(10000);
    const [orderCost, setOrderCost] = useState<number>(100);
    const [holdingCost, setHoldingCost] = useState<number>(2.5);

    // Warehouse Metrics States
    const [fulfilledOrders, setFulfilledOrders] = useState<number>(950);
    const [totalOrders, setTotalOrders] = useState<number>(1000);
    const [cogs, setCogs] = useState<number>(500000);
    const [avgInventory, setAvgInventory] = useState<number>(50000);

    // EOQ Calculations
    const eoq = Math.round(Math.sqrt((2 * demand * orderCost) / holdingCost));
    const annualOrderingCost = Math.round((demand / (eoq || 1)) * orderCost);
    const annualHoldingCost = Math.round(((eoq || 1) / 2) * holdingCost);
    const totalEOQCost = annualOrderingCost + annualHoldingCost;
    const ordersPerYear = (demand / (eoq || 1)).toFixed(1);
    const orderIntervalDays = Math.round(365 / (demand / (eoq || 1)));

    // EOQ LineChart data generation
    const getEOQChartData = () => {
        const data = [];
        if (!eoq || eoq <= 0) return [];
        const minQ = Math.max(10, Math.round(eoq * 0.3));
        const maxQ = Math.round(eoq * 2.2);
        const step = Math.max(5, Math.round((maxQ - minQ) / 10));

        for (let q = minQ; q <= maxQ; q += step) {
            const hCost = (q / 2) * holdingCost;
            const oCost = (demand / q) * orderCost;
            const tCost = hCost + oCost;
            data.push({
                q: Math.round(q),
                [isVi ? "Chi phí lưu kho" : "Holding Cost"]: Math.round(hCost),
                [isVi ? "Chi phí đặt hàng" : "Ordering Cost"]: Math.round(oCost),
                [isVi ? "Tổng chi phí" : "Total Cost"]: Math.round(tCost),
            });
        }
        return data;
    };

    // Metrics Calculations
    const fillRate = totalOrders > 0 ? ((fulfilledOrders / totalOrders) * 100).toFixed(1) : "0.0";
    const inventoryTurnover = avgInventory > 0 ? (cogs / avgInventory).toFixed(2) : "0.00";
    const daysToSell = parseFloat(inventoryTurnover) > 0 ? Math.round(365 / parseFloat(inventoryTurnover)) : 0;

    return (
        <div className="max-w-6xl mx-auto py-0 px-0 sm:py-4 sm:px-4 lg:py-6 lg:px-6 lg:pr-6">
            <div className="bg-white sm:rounded-2xl shadow-sm sm:border border-slate-200 p-5 sm:p-6 lg:p-8">
                {/* Header */}
                <Reveal direction="down" delay={100}>
                    <header className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                            {isVi ? "Công cụ Logistics tương tác" : "Interactive Logistics Utilities"}
                        </h1>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                            {isVi 
                                ? "Các bộ tính toán khoa học chuyên ngành quản trị chuỗi cung ứng, lập kế hoạch tồn kho và quản trị kho bãi." 
                                : "Scientific calculators for supply chain planning, inventory management, and warehouse metrics optimization."}
                        </p>
                    </header>
                </Reveal>

                {/* Tabs */}
                <Reveal direction="up" delay={150}>
                    <div className="flex border-b border-slate-100 mb-8 gap-2">
                        <button
                            onClick={() => setActiveTab("eoq")}
                            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all duration-300 ${
                                activeTab === "eoq"
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            {isVi ? "Mô hình Tồn kho EOQ" : "EOQ Model Calculator"}
                        </button>
                        <button
                            onClick={() => setActiveTab("metrics")}
                            className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all duration-300 ${
                                activeTab === "metrics"
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-slate-500 hover:text-slate-800"
                            }`}
                        >
                            {isVi ? "Chỉ số Kho bãi & Giao hàng" : "Warehouse & Delivery Metrics"}
                        </button>
                    </div>
                </Reveal>

                {/* TAB 1: EOQ */}
                {activeTab === "eoq" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* EOQ Form Control */}
                        <div className="lg:col-span-5 space-y-6">
                            <Reveal direction="up" delay={200}>
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-5 flex items-center gap-1.5">
                                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                        {isVi ? "Tham số đầu vào" : "Input Parameters"}
                                    </h3>
                                    
                                    <div className="space-y-5">
                                        {/* Annual Demand */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-semibold">
                                                <label className="text-slate-600">{isVi ? "Nhu cầu hàng năm (D)" : "Annual Demand (D)"}</label>
                                                <span className="text-indigo-600">{demand.toLocaleString()} {isVi ? "sản phẩm" : "units"}</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="1000" 
                                                max="50000" 
                                                step="500"
                                                value={demand}
                                                onChange={(e) => setDemand(Number(e.target.value))}
                                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                            />
                                        </div>

                                        {/* Order Cost */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-semibold">
                                                <label className="text-slate-600">{isVi ? "Chi phí mỗi lần đặt hàng (S)" : "Ordering Cost per Order (S)"}</label>
                                                <span className="text-indigo-600">${orderCost}</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="10" 
                                                max="500" 
                                                step="10"
                                                value={orderCost}
                                                onChange={(e) => setOrderCost(Number(e.target.value))}
                                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                            />
                                        </div>

                                        {/* Holding Cost */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-semibold">
                                                <label className="text-slate-600">{isVi ? "Chi phí lưu kho/đơn vị/năm (H)" : "Holding Cost per Unit/Year (H)"}</label>
                                                <span className="text-indigo-600">${holdingCost.toFixed(2)}</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="0.5" 
                                                max="15" 
                                                step="0.5"
                                                value={holdingCost}
                                                onChange={(e) => setHoldingCost(Number(e.target.value))}
                                                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal direction="up" delay={250}>
                                <div className="bg-indigo-600/5 dark:bg-indigo-500/5 rounded-2xl p-6 border border-indigo-500/10 space-y-4">
                                    <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-100 uppercase tracking-wider">
                                        {isVi ? "Phân tích Kết quả tối ưu" : "Optimization Results"}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white rounded-xl p-4 border border-slate-100">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{isVi ? "Sản lượng đặt tối ưu (EOQ)" : "Optimal Order Qty (EOQ)"}</p>
                                            <p className="text-2xl font-black text-indigo-600">{eoq}</p>
                                            <p className="text-[10px] text-slate-500 mt-1">{isVi ? "Đơn vị / lần đặt" : "units / order"}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-slate-100">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{isVi ? "Tổng chi phí tối thiểu" : "Total Min Cost"}</p>
                                            <p className="text-2xl font-black text-indigo-600">${totalEOQCost.toLocaleString()}</p>
                                            <p className="text-[10px] text-slate-500 mt-1">{isVi ? "Mỗi năm" : "per year"}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-slate-100">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{isVi ? "Tần suất đặt hàng" : "Order Frequency"}</p>
                                            <p className="text-2xl font-black text-indigo-600">{ordersPerYear}</p>
                                            <p className="text-[10px] text-slate-500 mt-1">{isVi ? "Lần / năm" : "orders / year"}</p>
                                        </div>
                                        <div className="bg-white rounded-xl p-4 border border-slate-100">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{isVi ? "Chu kỳ đặt hàng" : "Order Interval"}</p>
                                            <p className="text-2xl font-black text-indigo-600">{orderIntervalDays}</p>
                                            <p className="text-[10px] text-slate-500 mt-1">{isVi ? "Ngày / chu kỳ" : "days / cycle"}</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        {/* EOQ Graph */}
                        <div className="lg:col-span-7 space-y-6">
                            <Reveal direction="up" delay={300}>
                                <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                                            {isVi ? "Biểu đồ tổng chi phí và điểm EOQ tối ưu" : "Total Cost Curves & EOQ Intersect"}
                                        </h3>
                                        <p className="text-xs text-slate-500 mb-6">
                                            {isVi 
                                                ? "Điểm giao thoa giữa Chi phí lưu kho và Chi phí đặt hàng chính là điểm EOQ giúp tối thiểu hóa Tổng chi phí." 
                                                : "The intersection of holding cost and ordering cost yields the EOQ point which minimizes total costs."}
                                        </p>
                                    </div>

                                    <div className="h-72 w-full bg-slate-50/50 rounded-xl p-2 border border-slate-100">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={getEOQChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                <XAxis 
                                                    dataKey="q" 
                                                    label={{ value: isVi ? 'Sản lượng (Q)' : 'Quantity (Q)', position: 'insideBottomRight', offset: -5, fill: '#94a3b8', fontSize: 10 }}
                                                    tick={{ fontSize: 9, fill: "#94a3b8" }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                />
                                                <YAxis 
                                                    tick={{ fontSize: 9, fill: "#94a3b8" }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                />
                                                <Tooltip 
                                                    contentStyle={{
                                                        borderRadius: "12px",
                                                        border: "none",
                                                        fontSize: "12px",
                                                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)"
                                                    }}
                                                />
                                                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                                <ReferenceLine x={eoq} stroke="#6366f1" strokeDasharray="3 3" label={{ value: `EOQ: ${eoq}`, fill: '#6366f1', fontSize: 10, position: 'top' }} />
                                                <Line type="monotone" dataKey={isVi ? "Chi phí lưu kho" : "Holding Cost"} stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                                                <Line type="monotone" dataKey={isVi ? "Chi phí đặt hàng" : "Ordering Cost"} stroke="#f59e0b" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                                                <Line type="monotone" dataKey={isVi ? "Tổng chi phí" : "Total Cost"} stroke="#6366f1" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                )}

                {/* TAB 2: METRICS */}
                {activeTab === "metrics" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Fill Rate Metric Card */}
                        <Reveal direction="up" delay={200}>
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between h-full space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                        <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs font-bold">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        {isVi ? "Tỷ lệ Lấp đầy (Fill Rate)" : "Fill Rate Calculator"}
                                    </h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {isVi 
                                            ? "Phần trăm lượng hàng giao thành công trên tổng lượng hàng đặt của khách hàng. Chỉ số cao thể hiện chất lượng phục vụ kho tốt." 
                                            : "The percentage of customer demand met by immediate stock availability. High fill rate represents premium warehouse capability."}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-600">{isVi ? "Giao thành công" : "Fulfilled Items"}</label>
                                            <input 
                                                type="number"
                                                value={fulfilledOrders}
                                                onChange={(e) => setFulfilledOrders(Math.max(0, Number(e.target.value)))}
                                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-600">{isVi ? "Tổng số lượng đặt" : "Total Ordered Items"}</label>
                                            <input 
                                                type="number"
                                                value={totalOrders}
                                                onChange={(e) => setTotalOrders(Math.max(1, Number(e.target.value)))}
                                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{isVi ? "Tỷ Lệ Đạt Được" : "Resulting Fill Rate"}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">Formula: (Fulfilled / Ordered) * 100</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-3xl font-black text-emerald-500">{fillRate}%</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Inventory Turnover Metric Card */}
                        <Reveal direction="up" delay={250}>
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between h-full space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                                        <span className="w-6 h-6 rounded bg-amber-500/10 text-amber-600 flex items-center justify-center text-xs font-bold">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.228 9H18.9" />
                                            </svg>
                                        </span>
                                        {isVi ? "Vòng quay Tồn kho (Inventory Turnover)" : "Inventory Turnover Calculator"}
                                    </h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {isVi 
                                            ? "Số lần hàng tồn kho trung bình được bán và thay thế trong một kỳ. Chỉ số càng cao tức vòng quay giải phóng vốn càng tốt." 
                                            : "The rate at which average inventory is sold and replaced over a period. High turnover shows effective logistics flow."}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-600">{isVi ? "Giá vốn hàng bán (COGS)" : "Cost of Goods Sold"}</label>
                                            <input 
                                                type="number"
                                                value={cogs}
                                                onChange={(e) => setCogs(Math.max(0, Number(e.target.value)))}
                                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-slate-600">{isVi ? "Tồn kho trung bình" : "Average Inventory"}</label>
                                            <input 
                                                type="number"
                                                value={avgInventory}
                                                onChange={(e) => setAvgInventory(Math.max(1, Number(e.target.value)))}
                                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-white border border-slate-100 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{isVi ? "Hệ Số Vòng Quay" : "Turnover Ratio"}</p>
                                        <p className="text-xs text-slate-500 mt-0.5">{isVi ? `Bán hết trong ~${daysToSell} ngày` : `Holds inventory ~${daysToSell} days`}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-3xl font-black text-amber-500">{inventoryTurnover}</span>
                                        <span className="text-xs font-bold text-slate-400 ml-1">{isVi ? "vòng" : "turns"}</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                )}
            </div>
        </div>
    );
}
