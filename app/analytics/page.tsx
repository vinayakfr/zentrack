"use client";

import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

const revenueData = [
  { name: "Jan", total: 4000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 5000 },
  { name: "Apr", total: 8000 },
  { name: "May", total: 7000 },
  { name: "Jun", total: 11000 },
  { name: "Jul", total: 13000 },
  { name: "Aug", total: 12000 },
  { name: "Sep", total: 15000 },
  { name: "Oct", total: 17000 },
  { name: "Nov", total: 20000 },
  { name: "Dec", total: 24000 },
];

const subscriberData = [
  { name: "Jan", users: 100 },
  { name: "Feb", users: 200 },
  { name: "Mar", users: 350 },
  { name: "Apr", users: 400 },
  { name: "May", users: 550 },
  { name: "Jun", users: 800 },
  { name: "Jul", users: 1000 },
];

const tierData = [
  { name: "Zen Basic", value: 1245 },
  { name: "Zen Premium", value: 840 },
  { name: "Zen Enterprise", value: 45 },
];
const COLORS = ["#F44D27", "#E95B1A", "#B1310A"];

export default function AnalyticsPage() {
  return (
    <div className="h-screen bg-[#0A0A0A] text-white flex overflow-hidden selection:bg-orange-500/30">
      
      <Sidebar activePath="/analytics" />

      {/* Main Layout Area */}
      <main className="flex-1 p-8 pt-6 relative z-10 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8 pr-4 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">Analytics Overview</h1>
            <p className="text-sm text-zinc-400 mt-1">Deep dive into your subscription metrics and revenue growth.</p>
          </div>
          <div className="flex gap-4 items-center">
            <select className="h-10 rounded-lg bg-[#1C1C1F] px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 text-zinc-100 border border-transparent appearance-none pr-8 relative cursor-pointer">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
              <option>Year to Date</option>
              <option>All Time</option>
            </select>
            <Button variant="primary" className="bg-orange-600 hover:bg-orange-500 text-white text-sm border-none shadow-[0_0_15px_rgba(234,88,12,0.2)]">
              Download Report
            </Button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-4 pb-20">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[40px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
              <div className="text-sm font-medium text-zinc-400 mb-2">Total MRR</div>
              <div className="text-3xl font-semibold tracking-tight">$69.6k</div>
              <div className="mt-3 text-xs font-medium text-orange-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                <span>+14.2% from last month</span>
              </div>
            </Card>
            
            <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl relative">
              <div className="text-sm font-medium text-zinc-400 mb-2">Active Subscribers</div>
              <div className="text-3xl font-semibold tracking-tight">2,130</div>
              <div className="mt-3 text-xs font-medium text-orange-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                <span>+5.1% from last month</span>
              </div>
            </Card>

            <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl relative">
              <div className="text-sm font-medium text-zinc-400 mb-2">Avg. Revenue Per User</div>
              <div className="text-3xl font-semibold tracking-tight">$32.67</div>
              <div className="mt-3 text-xs font-medium text-zinc-500 flex items-center gap-1">
                <span>Stable</span>
              </div>
            </Card>

            <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl relative">
              <div className="text-sm font-medium text-zinc-400 mb-2">Churn Rate</div>
              <div className="text-3xl font-semibold tracking-tight">1.2%</div>
              <div className="mt-3 text-xs font-medium text-green-400 flex items-center gap-1">
                <svg className="w-3 h-3 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                <span>-0.4% from last month</span>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Revenue Area Chart */}
            <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl lg:col-span-2">
              <h2 className="text-lg font-medium mb-6">Revenue Growth</h2>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                      tickFormatter={(value) => `$${value/1000}k`}
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#24242A', border: 'none', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#F44D27', fontWeight: 500 }}
                      formatter={(value) => [`$${value}`, 'Revenue']}
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
              </div>
            </Card>

            {/* Subscriber Tier Breakdown */}
            <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl flex flex-col">
              <h2 className="text-lg font-medium mb-2">Subscription Tiers</h2>
              <div className="flex-1 w-full min-h-[250px] relative">
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
                      {tierData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#24242A', border: 'none', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#fff', fontWeight: 500 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Label inside Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <span className="text-2xl font-bold">2.1k</span>
                   <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">Users</span>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 space-y-2">
                {tierData.map((entry, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                      <span className="text-zinc-300">{entry.name}</span>
                    </div>
                    <span className="font-medium text-white">{entry.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
             {/* Sub Growth Line Chart */}
             <Card className="p-6 bg-[#1C1C1F] border-none rounded-2xl">
              <h2 className="text-lg font-medium mb-6">User Acquisition</h2>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={subscriberData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                      dx={-10}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#24242A', border: 'none', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#F44D27', fontWeight: 500 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#E95B1A" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: '#E95B1A', strokeWidth: 0 }} 
                      activeDot={{ r: 6, fill: '#fff', stroke: '#E95B1A', strokeWidth: 2 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
