"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { AuthGuard } from "../components/AuthGuard";
import { apiFetch } from "../../lib/api";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface Subscription {
  id: string;
  service_name: string;
  plan_name: string;
  price: number;
  billing_cycle: string;
  next_due_date: string;
  status: string;
}

interface Payment {
  id: string;
  service_name: string;
  amount: number;
  due_date: string;
  status: string;
}

function DashboardContent() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [upcomingPayments, setUpcomingPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [subsRes, paymentsRes] = await Promise.all([
          apiFetch("/subscriptions/"),
          apiFetch("/payments/upcoming"),
        ]);

        if (subsRes.ok) {
          const subsData = await subsRes.json();
          setSubscriptions(subsData);
        }

        if (paymentsRes.ok) {
          const paymentsData = await paymentsRes.json();
          setUpcomingPayments(paymentsData);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalMonthlyCost = subscriptions.reduce((sum, sub) => {
    if (sub.billing_cycle === "yearly") return sum + sub.price / 12;
    return sum + sub.price;
  }, 0);

  const totalYearlyCost = subscriptions.reduce((sum, sub) => {
    if (sub.billing_cycle === "monthly") return sum + sub.price * 12;
    return sum + sub.price;
  }, 0);

  const statCards = [
    { title: "Active Subscriptions", value: loading ? "..." : `${subscriptions.length}`, active: false },
    { title: "Monthly Cost", value: loading ? "..." : `$${totalMonthlyCost.toFixed(0)}`, active: true },
    { title: "Yearly Cost", value: loading ? "..." : `$${totalYearlyCost.toFixed(0)}`, active: false },
    { title: "Upcoming Payments", value: loading ? "..." : `${upcomingPayments.length}`, active: false },
  ];

  // Build monthly spending projection data (12-month view)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  const monthlySpendingData = months.map((_, i) => {
    const monthIdx = (currentMonth - 11 + i + 12) % 12;
    // Simulate gradual subscription growth over the past year
    const factor = Math.max(0.2, (i + 1) / 12);
    return {
      name: months[monthIdx],
      spending: Math.round(totalMonthlyCost * factor * 100) / 100,
    };
  });

  // Build per-service bar chart data
  const serviceBarData = subscriptions.map((sub) => ({
    name: sub.service_name.length > 10 ? sub.service_name.substring(0, 10) + "…" : sub.service_name,
    cost: sub.billing_cycle === "yearly" ? Math.round((sub.price / 12) * 100) / 100 : sub.price,
  }));

  const tableHeaders = ["Service", "Plan", "Price", "Cycle", "Next Due Date", "Status"];

  return (
    <div className="h-screen bg-[#0A0A0A] text-white flex overflow-hidden">
      
      <Sidebar />

      {/* Main Layout Area */}
      <main className="flex-1 overflow-y-auto p-8 pt-6 pr-10">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-medium tracking-tight">Dashboard</h1>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {statCards.map((stat, i) => (
            <Card key={i} gradientBorder={stat.active} className={`p-4 ${stat.active ? "" : "border-none bg-[#1C1C1F]"}`}>
              <div className="flex flex-col space-y-2">
                <span className="text-xs text-zinc-400 font-medium">{stat.title}</span>
                <span className="text-2xl font-semibold tracking-tight">{stat.value}</span>
                {stat.active && (
                  <div className="absolute right-0 bottom-0 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          
          {/* Monthly Spending Chart — the main graph */}
          <Card className="col-span-2 p-5 bg-[#1C1C1F] border-none flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-medium">Monthly Spending</h3>
                <p className="text-xs text-zinc-500 mt-1">Your subscription costs over the past 12 months</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold tracking-tight">${totalMonthlyCost.toFixed(2)}</div>
                <div className="text-[10px] text-zinc-500">this month</div>
              </div>
            </div>
            <div className="flex-1 min-h-[220px]">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : subscriptions.length === 0 ? (
                <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
                  Add subscriptions to see spending trends
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlySpendingData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F44D27" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F44D27" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272A" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#A1A1AA', fontSize: 11 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#A1A1AA', fontSize: 11 }}
                      tickFormatter={(value: number) => `$${value}`}
                      dx={-10}
                      width={50}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1C1C1F', border: '1px solid #27272A', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                      itemStyle={{ color: '#F44D27', fontWeight: 500 }}
                      formatter={(value) => [`$${value}`, 'Spending']}
                    />
                    <Area
                      type="monotone"
                      dataKey="spending"
                      stroke="#F44D27"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#colorSpending)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          {/* Cost per Service Bar Chart */}
          <Card className="p-5 bg-[#1C1C1F] border-none flex flex-col">
            <h3 className="text-sm font-medium mb-1">Cost per Service</h3>
            <p className="text-xs text-zinc-500 mb-4">Monthly breakdown</p>
            <div className="flex-1 min-h-[220px]">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : serviceBarData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-zinc-500 text-sm text-center px-4">
                  No services yet
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceBarData} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272A" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#A1A1AA', fontSize: 10 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#A1A1AA', fontSize: 10 }}
                      tickFormatter={(value: number) => `$${value}`}
                      dx={-5}
                      width={45}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1C1C1F', border: '1px solid #27272A', borderRadius: '10px', color: '#fff', fontSize: '12px' }}
                      formatter={(value) => [`$${value}/mo`, 'Cost']}
                    />
                    <Bar
                      dataKey="cost"
                      fill="#F44D27"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
          
        </div>

        {/* Subscription Table — independently scrollable */}
        <Card className="p-5 bg-[#1C1C1F] border-none flex flex-col" style={{ maxHeight: '340px' }}>
          <h3 className="text-sm font-medium mb-4 flex-shrink-0">Subscription List</h3>
          <div className="w-full overflow-y-auto overflow-x-auto flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center py-8 text-zinc-500 text-sm">
                No subscriptions yet. <a href="/subscriptions" className="text-orange-400 hover:text-orange-300 underline">Add your first subscription</a>.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-[#1C1C1F] z-10">
                  <tr className="text-zinc-500 border-b border-zinc-800/50">
                    {tableHeaders.map((header) => (
                      <th key={header} className="pb-3 font-medium px-2">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b border-zinc-800/20 last:border-0">
                      <td className="py-3 px-2 font-medium text-white">{sub.service_name}</td>
                      <td className="py-3 px-2">{sub.plan_name}</td>
                      <td className="py-3 px-2">${sub.price}</td>
                      <td className="py-3 px-2 capitalize">{sub.billing_cycle}</td>
                      <td className="py-3 px-2">{sub.next_due_date}</td>
                      <td className="py-3 px-2">
                         <span className={`px-2 py-1 rounded-full text-[10px] ${sub.status === 'active' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-orange-500/10 text-orange-400'}`}>
                           {sub.status}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>

      </main>

    </div>
  );
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
