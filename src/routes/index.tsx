import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Receipt,
  LayoutDashboard,
  BarChart3,
  PieChart as PieIcon,
  Map,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

type MonthRow = {
  month: string;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  revenue: number;
  orders: number;
  customers: number;
};

const MONTHLY: MonthRow[] = [
  { month: "Jan", quarter: "Q1", revenue: 142000, orders: 320, customers: 180 },
  { month: "Feb", quarter: "Q1", revenue: 158000, orders: 365, customers: 210 },
  { month: "Mar", quarter: "Q1", revenue: 175000, orders: 410, customers: 245 },
  { month: "Apr", quarter: "Q2", revenue: 163000, orders: 388, customers: 230 },
  { month: "May", quarter: "Q2", revenue: 191000, orders: 452, customers: 278 },
  { month: "Jun", quarter: "Q2", revenue: 204000, orders: 480, customers: 295 },
  { month: "Jul", quarter: "Q3", revenue: 187000, orders: 440, customers: 265 },
  { month: "Aug", quarter: "Q3", revenue: 215000, orders: 510, customers: 318 },
  { month: "Sep", quarter: "Q3", revenue: 228000, orders: 535, customers: 340 },
  { month: "Oct", quarter: "Q4", revenue: 243000, orders: 572, customers: 362 },
  { month: "Nov", quarter: "Q4", revenue: 267000, orders: 630, customers: 398 },
  { month: "Dec", quarter: "Q4", revenue: 312000, orders: 720, customers: 445 },
];

const CATEGORIES = [
  { name: "Electronics", value: 38, color: "#2563EB" },
  { name: "Clothing", value: 24, color: "#059669" },
  { name: "Home & Living", value: 19, color: "#D97706" },
  { name: "Sports", value: 12, color: "#E11D48" },
  { name: "Other", value: 7, color: "#8B5CF6" },
];

const REGIONS = [
  { name: "Cairo", value: 2450000 },
  { name: "Alexandria", value: 1820000 },
  { name: "Giza", value: 1340000 },
  { name: "Mansoura", value: 980000 },
  { name: "Assiut", value: 720000 },
];

const QUARTERS = ["Full Year", "Q1", "Q2", "Q3", "Q4"] as const;
type QuarterFilter = (typeof QUARTERS)[number];

const fmt = (n: number) => n.toLocaleString();
const fmtEGP = (n: number) => `${n.toLocaleString()} EGP`;

function Dashboard() {
  const [quarter, setQuarter] = useState<QuarterFilter>("Full Year");
  const [sortKey, setSortKey] = useState<keyof MonthRow | "aov" | "growth">("month");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(
    () => (quarter === "Full Year" ? MONTHLY : MONTHLY.filter((m) => m.quarter === quarter)),
    [quarter],
  );

  const totals = useMemo(() => {
    const rev = filtered.reduce((s, m) => s + m.revenue, 0);
    const ord = filtered.reduce((s, m) => s + m.orders, 0);
    const cus = filtered.reduce((s, m) => s + m.customers, 0);
    return {
      revenue: rev,
      orders: ord,
      customers: cus,
      aov: ord ? Math.round(rev / ord) : 0,
    };
  }, [filtered]);

  const tableRows = useMemo(() => {
    const rows = filtered.map((m, i) => {
      const prev = i === 0 ? null : filtered[i - 1];
      const growth = prev ? ((m.revenue - prev.revenue) / prev.revenue) * 100 : 0;
      return { ...m, aov: Math.round(m.revenue / m.orders), growth };
    });
    rows.sort((a, b) => {
      const av = a[sortKey as keyof typeof a] as number | string;
      const bv = b[sortKey as keyof typeof b] as number | string;
      if (typeof av === "number" && typeof bv === "number")
        return sortDir === "asc" ? av - bv : bv - av;
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
    return rows;
  }, [filtered, sortKey, sortDir]);

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const kpis = [
    {
      label: "Total Revenue",
      value: fmtEGP(totals.revenue),
      trend: "+23.4%",
      icon: DollarSign,
      gradient: "from-blue-500 to-blue-700",
    },
    {
      label: "Total Orders",
      value: fmt(totals.orders),
      trend: "+18.7%",
      icon: ShoppingCart,
      gradient: "from-emerald-500 to-emerald-700",
    },
    {
      label: "Total Customers",
      value: fmt(totals.customers),
      trend: "+31.2%",
      icon: Users,
      gradient: "from-amber-500 to-amber-700",
    },
    {
      label: "Avg Order Value",
      value: `${fmt(totals.aov)} EGP`,
      trend: "+4.0%",
      icon: Receipt,
      gradient: "from-rose-500 to-rose-700",
    },
  ];

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", active: true },
    { icon: BarChart3, label: "Sales" },
    { icon: PieIcon, label: "Products" },
    { icon: Map, label: "Regions" },
    { icon: Users, label: "Customers" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-slate-900 text-slate-100 p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold">Pulse</div>
            <div className="text-xs text-slate-400">Analytics Suite</div>
          </div>
        </div>
        <nav className="space-y-1 flex-1">
          {navItems.map((n) => (
            <button
              key={n.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                n.active
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <n.icon className="w-4 h-4" />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600">
          <div className="text-xs text-blue-100 mb-1">Live Demo</div>
          <div className="text-sm font-semibold">Beyond Power BI</div>
          <div className="text-xs text-blue-100 mt-1">
            Interactive · Responsive · Embeddable
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-10 space-y-6 overflow-x-hidden">
        {/* Header + Filter */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Sales Analytics Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {quarter === "Full Year" ? "Full year 2024" : `${quarter} 2024`} · Live interactive view
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-white rounded-xl shadow-sm border border-slate-200">
            {QUARTERS.map((q) => (
              <button
                key={q}
                onClick={() => setQuarter(q)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  quarter === q
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`relative overflow-hidden rounded-2xl p-5 text-white bg-gradient-to-br ${k.gradient} shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/80">
                    {k.label}
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold mt-2">{k.value}</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <k.icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-xs font-semibold">
                <TrendingUp className="w-3 h-3" />
                {k.trend} vs last year
              </div>
              <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10" />
            </motion.div>
          ))}
        </div>

        {/* Revenue Line Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold">Monthly Revenue Performance 2024</h2>
              <p className="text-xs text-slate-500 mt-0.5">Hover any point for details</p>
            </div>
            <div className="text-xs px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 font-medium">
              EGP
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={filtered} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis
                stroke="#64748B"
                fontSize={12}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "#0F172A",
                  border: "none",
                  borderRadius: 12,
                  color: "white",
                }}
                formatter={(value: number, name: string) => {
                  if (name === "revenue") return [fmtEGP(value), "Revenue"];
                  return [fmt(value), name.charAt(0).toUpperCase() + name.slice(1)];
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="url(#lineGrad)"
                strokeWidth={3}
                dot={{ r: 5, fill: "#2563EB", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7 }}
                animationDuration={1200}
              />
              <Line type="monotone" dataKey="orders" stroke="transparent" />
              <Line type="monotone" dataKey="customers" stroke="transparent" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Two charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >
            <h2 className="text-lg font-bold mb-1">Revenue by Category</h2>
            <p className="text-xs text-slate-500 mb-4">Distribution across product lines</p>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={CATEGORIES}
                  dataKey="value"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={3}
                  animationDuration={1000}
                >
                  {CATEGORIES.map((c) => (
                    <Cell key={c.name} fill={c.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center -mt-[170px] mb-[130px] pointer-events-none">
              <div className="text-xs text-slate-500">Total Revenue</div>
              <div className="text-xl font-bold">{fmtEGP(totals.revenue)}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {CATEGORIES.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-sm">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-slate-600">{c.name}</span>
                  <span className="ml-auto font-semibold">{c.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
          >
            <h2 className="text-lg font-bold mb-1">Top Regions</h2>
            <p className="text-xs text-slate-500 mb-4">Revenue by city (EGP)</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={REGIONS} layout="vertical" margin={{ left: 20 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="#64748B"
                  fontSize={12}
                  tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
                />
                <YAxis dataKey="name" type="category" stroke="#64748B" fontSize={12} width={80} />
                <Tooltip
                  formatter={(v: number) => fmtEGP(v)}
                  contentStyle={{
                    background: "#0F172A",
                    border: "none",
                    borderRadius: 12,
                    color: "white",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="url(#barGrad)"
                  radius={[0, 8, 8, 0]}
                  animationDuration={1000}
                  label={{
                    position: "right",
                    fill: "#0F172A",
                    fontSize: 11,
                    formatter: (v: number) => `${(v / 1000000).toFixed(2)}M`,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Table + AI Insights */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
          >
            <div className="p-6 pb-3">
              <h2 className="text-lg font-bold">Monthly Breakdown</h2>
              <p className="text-xs text-slate-500 mt-0.5">Click any column header to sort</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
                  <tr>
                    {(
                      [
                        ["month", "Month"],
                        ["revenue", "Revenue"],
                        ["orders", "Orders"],
                        ["customers", "Customers"],
                        ["aov", "Avg Order"],
                        ["growth", "MoM Growth"],
                      ] as const
                    ).map(([k, label]) => (
                      <th
                        key={k}
                        onClick={() => toggleSort(k as typeof sortKey)}
                        className="px-4 py-3 text-left cursor-pointer hover:text-blue-600 select-none"
                      >
                        <span className="inline-flex items-center gap-1">
                          {label}
                          <ArrowUpDown className="w-3 h-3 opacity-50" />
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((r, i) => (
                    <tr
                      key={r.month}
                      className={`${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"} hover:bg-blue-50/50 transition-colors`}
                    >
                      <td className="px-4 py-3 font-semibold">{r.month}</td>
                      <td className="px-4 py-3">{fmtEGP(r.revenue)}</td>
                      <td className="px-4 py-3">{fmt(r.orders)}</td>
                      <td className="px-4 py-3">{fmt(r.customers)}</td>
                      <td className="px-4 py-3">{fmt(r.aov)} EGP</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                            r.growth >= 0
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {r.growth >= 0 ? (
                            <ArrowUp className="w-3 h-3" />
                          ) : (
                            <ArrowDown className="w-3 h-3" />
                          )}
                          {r.growth.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-rose-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold">AI Insights</h2>
                <p className="text-xs text-slate-400">Auto-generated highlights</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                <>
                  December achieved peak revenue of{" "}
                  <span className="text-amber-400 font-bold">312,000 EGP</span> —{" "}
                  <span className="text-amber-400 font-bold">87%</span> above January baseline.
                </>,
                <>
                  Q4 outperformed Q1 by{" "}
                  <span className="text-amber-400 font-bold">94%</span> in total revenue.
                </>,
                <>
                  Customer acquisition accelerated in H2, adding{" "}
                  <span className="text-amber-400 font-bold">212</span> new customers vs{" "}
                  <span className="text-amber-400 font-bold">163</span> in H1.
                </>,
              ].map((txt, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/50 text-sm leading-relaxed"
                >
                  {txt}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <footer className="text-center text-xs text-slate-400 pt-4">
          Pulse Analytics · Interactive web dashboard · Powered by React + Recharts
        </footer>
      </main>
    </div>
  );
}
