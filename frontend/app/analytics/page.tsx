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
  PieChart,
  Pie,
  Cell
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

const COLORS = ["#F44D27", "#E95B1A", "#B1310A", "#8B5CF6", "#10B981", "#3B82F6", "#EC4899", "#F59E0B"];

function AnalyticsContent() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [subsRes, paymentsRes, historyRes] = await Promise.all([
          apiFetch("/subscriptions/"),
          apiFetch("/payments/upcoming"),
          apiFetch("/payments/history"),
        ]);

        if (subsRes.ok) {
          setSubscriptions(await subsRes.json());
        }

        const allPayments: Payment[] = [];
        if (paymentsRes.ok) {
          allPayments.push(...(await paymentsRes.json()));
        }
        if (historyRes.ok) {
          allPayments.push(...(await historyRes.json()));
        }
        setPayments(allPayments);
      } catch (err) {
        console.error("Failed to fetch analytics data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Compute analytics from real data
  const totalMRR = subscriptions.reduce((sum, sub) => {
    if (sub.billing_cycle === "yearly") return sum + sub.price / 12;
    return sum + sub.price;
  }, 0);

  const totalSubscribers = subscriptions.length;
  const avgRevenuePerSub = totalSubscribers > 0 ? totalMRR / totalSubscribers : 0;

  // Build pie chart data by service
  const serviceMap = new Map<string, number>();
  subscriptions.forEach((sub) => {
    const existing = serviceMap.get(sub.service_name) || 0;
    serviceMap.set(sub.service_name, existing + 1);
  });
  const tierData = Array.from(serviceMap.entries()).map(([name, value]) => ({ name, value }));

  // Build monthly cost projection data (simple 12-month projection)
  const monthlyProjection = [];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const currentMonth = new Date().getMonth();
  for (let i = 0; i < 12; i++) {
    const monthIdx = (currentMonth - 11 + i + 12) % 12;
    // Simulate growth: subscriptions added over time
    const factor = Math.max(0.3, (i + 1) / 12);
    monthlyProjection.push({
      name: months[monthIdx],
      total: Math.round(totalMRR * factor * 100) / 100,
    });
  }

  const upcomingPaymentsCount = payments.filter((p) => p.status === "pending").length;
  const paidPaymentsCount = payments.filter((p) => p.status === "paid").length;

  return (
    <div className="h-screen bg-[#0A0A0A] text-white flex overflow-hidden selection:bg-orange-500/30">
      
      <Sidebar activePath="/analytics" />

      {/* Main Layout Area */}
      <main className="flex-1 p-8 pt-6 relative z-10 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <header className="mb-8 pr-4 flex-shrink-0">
          <h1 className="text-2xl font-medium tracking-tight">Analytics Overview</h1>
          <p className="text-sm text-zinc-400 mt-1">Deep dive into your subscription metrics and spending.</p>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-4 pb-20">

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Top KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                  <div className="text-sm font-medium text-zinc-400 mb-2">Monthly Cost</div>
                  <div className="text-3xl font-semibold tracking-tight">${totalMRR.toFixed(2)}</div>
                  <div className="mt-3 text-xs font-medium text-orange-400 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    <span>Active tracking</span>
                  </div>
                </Card>
                
                <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl relative">
                  <div className="text-sm font-medium text-zinc-400 mb-2">Active Subscriptions</div>
                  <div className="text-3xl font-semibold tracking-tight">{totalSubscribers}</div>
                  <div className="mt-3 text-xs font-medium text-zinc-500 flex items-center gap-1">
                    <span>Services tracked</span>
                  </div>
                </Card>

                <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl relative">
                  <div className="text-sm font-medium text-zinc-400 mb-2">Avg. Cost Per Service</div>
                  <div className="text-3xl font-semibold tracking-tight">${avgRevenuePerSub.toFixed(2)}</div>
                  <div className="mt-3 text-xs font-medium text-zinc-500 flex items-center gap-1">
                    <span>Per month</span>
                  </div>
                </Card>

                <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl relative">
                  <div className="text-sm font-medium text-zinc-400 mb-2">Payments</div>
                  <div className="text-3xl font-semibold tracking-tight">{upcomingPaymentsCount + paidPaymentsCount}</div>
                  <div className="mt-3 text-xs font-medium text-orange-400 flex items-center gap-1">
                    <span>{upcomingPaymentsCount} upcoming · {paidPaymentsCount} paid</span>
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                
                {/* Spending Area Chart */}
                <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl lg:col-span-2">
                  <h2 className="text-lg font-medium mb-6">Spending Projection</h2>
                  <div className="h-[300px] w-full">
                    {monthlyProjection.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={monthlyProjection} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#F44D27" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#F44D27" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272A" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#A1A1AA', fontSize: 12 }} 
                            dy={10} 
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#A1A1AA', fontSize: 12 }} 
                            tickFormatter={(value: number) => `$${value}`}
                            dx={-10}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#24242A', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#F44D27', fontWeight: 500 }}
                            formatter={(value) => [`$${value}`, 'Cost']}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="total" 
                            stroke="#F44D27" 
                            strokeWidth={3} 
                            fillOpacity={1} 
                            fill="url(#colorRevenue)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
                        Add subscriptions to see spending projections
                      </div>
                    )}
                  </div>
                </Card>

                {/* Service Breakdown */}
                <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl flex flex-col">
                  <h2 className="text-lg font-medium mb-2">By Service</h2>
                  <div className="flex-1 w-full min-h-[250px] relative">
                    {tierData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={tierData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {tierData.map((_entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#24242A', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff', fontWeight: 500 }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
                        No data yet
                      </div>
                    )}
                    {tierData.length > 0 && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                         <span className="text-2xl font-bold">{totalSubscribers}</span>
                         <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Services</span>
                      </div>
                    )}
                  </div>

                  {/* Legend */}
                  <div className="mt-4 space-y-2">
                    {tierData.map((entry, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <span className="text-zinc-300">{entry.name}</span>
                        </div>
                        <span className="font-medium text-white">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <AuthGuard>
      <AnalyticsContent />
    </AuthGuard>
  );
}
