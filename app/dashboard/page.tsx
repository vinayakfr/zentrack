import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

// Mock Chart Components using SVG for now
const MonthlyProfitChart = () => (
  <div className="w-full h-48 relative flex items-end justify-between px-2 stroke-orange-500">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
      <path d="M0,80 L5,70 L10,75 L15,60 L20,85 L25,50 L30,45 L35,55 L40,30 L45,20 L50,15 L55,30 L60,40 L65,55 L70,80 L75,90 L80,75 L85,60 L90,65 L95,45 L100,50" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M0,80 L5,70 L10,75 L15,60 L20,85 L25,50 L30,45 L35,55 L40,30 L45,20 L50,15 L55,30 L60,40 L65,55 L70,80 L75,90 L80,75 L85,60 L90,65 L95,45 L100,50 L100,100 L0,100 Z" fill="url(#gradient-orange)" opacity="0.2"/>
      <path d="M0,90 L10,95 L20,80 L30,65 L40,70 L50,85 L60,40 L70,30 L80,45 L90,80 L100,75" fill="none" stroke="#B22286" strokeWidth="2"/>
      
      <defs>
        <linearGradient id="gradient-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F44D27" />
          <stop offset="100%" stopColor="#F44D27" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
    {Array.from({ length: 40 }).map((_, i) => (
      <div key={i} className="w-[1.5%] bg-indigo-500/30 rounded-t-sm" style={{ height: `${Math.random() * 40 + 10}%` }}></div>
    ))}
  </div>
);

const WeeklyProfitChart = () => (
  <div className="w-full h-32 flex items-end justify-around px-2 gap-1">
    {['Aug', 'Aug', 'Aug', 'Aug', 'Aug'].map((lbl, i) => (
      <div key={i} className="w-6 flex flex-col items-center gap-2">
        <div className="w-full bg-gradient-to-t from-purple-900 via-purple-500 to-purple-300 rounded-sm" style={{ height: `${[40, 80, 50, 90, 60][i]}px` }}></div>
        <span className="text-[10px] text-zinc-500">{lbl}</span>
      </div>
    ))}
  </div>
);

const MonthlySalesChart = () => (
  <div className="w-full h-32 relative text-orange-500">
    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
      <path d="M0,80 Q10,70 20,75 T40,60 T60,40 T80,55 T100,30" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M0,60 Q10,80 20,85 T40,70 T60,50 T80,35 T100,20" fill="none" stroke="#4F46E5" strokeWidth="2"/>
    </svg>
    <div className="absolute bottom-0 w-full flex justify-between px-2 pt-2 text-[10px] text-zinc-500">
      <span>NOV</span><span>DEC</span><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span>
    </div>
  </div>
);

export default function DashboardPage() {
  const statCards = [
    { title: "Total Price", value: "50,000", active: false },
    { title: "Total Price", value: "50,000", active: true },
    { title: "Total Price", value: "50,000", active: false },
    { title: "Total Price", value: "50,000", active: false },
  ];

  const tableHeaders = ["Order ID", "Customer", "Order", "Cost", "Due Date", "Delivery Status", "Payment"];
  // Just mock data for table spacing
  const mockTableData = [
    { id: "#000123", customer: "John Doe", order: "Zen Premium", cost: "$50", date: "Oct 24, 2026", status: "Delivered", payment: "Paid" },
    { id: "#000124", customer: "Jane Smith", order: "Zen Basic", cost: "$15", date: "Oct 25, 2026", status: "Pending", payment: "Unpaid" },
  ];

  return (
    <div className="h-screen bg-[#0A0A0A] text-white flex overflow-hidden">
      
      <Sidebar />

      {/* Main Layout Area */}
      <main className="flex-1 overflow-y-auto p-8 pt-6 pr-10">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-medium tracking-tight">Dashboard</h1>
          <div className="flex gap-4 w-72">
            <Input placeholder="Search" className="bg-[#1C1C1F] border-none !h-10 text-sm" />
            <Button variant="primary" className="h-10 w-10 hover:bg-[#3f3f46]">
              {/* Filter icon placeholder */}
              <div className="w-4 h-4 rounded-[4px] bg-zinc-400" />
            </Button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {statCards.map((stat, i) => (
            <Card key={i} gradientBorder={stat.active} className={`p-4 ${stat.active ? "" : "border-none bg-[#1C1C1F]"}`}>
              <div className="flex flex-col space-y-2">
                <span className="text-xs text-zinc-400 font-medium">{stat.title}</span>
                <span className="text-2xl font-semibold tracking-tight">{stat.value}</span>
                {/* Visual fading gradient inside active card */}
                {stat.active && (
                  <div className="absolute right-0 bottom-0 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          
          <Card className="col-span-2 p-5 bg-[#1C1C1F] border-none flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium">Monthly Profit</h3>
              <select className="bg-zinc-800 text-xs px-3 py-1.5 rounded-md border border-zinc-700 outline-none text-zinc-300">
                <option>One Year</option>
                <option>6 Months</option>
              </select>
            </div>
          </Card>

          <div className="flex flex-col gap-4">
            <Card className="p-4 bg-[#1C1C1F] border-none flex flex-col justify-between h-[180px]">
              <h3 className="text-sm font-medium mb-2">Weekly Profit</h3>
            </Card>
            
            <Card className="p-4 bg-[#1C1C1F] border-none flex flex-col justify-between h-[180px]">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium">Monthly Sales</h3>
                <span className="bg-zinc-800 text-[10px] px-2 py-1 rounded text-zinc-400">September</span>
              </div>
              <MonthlySalesChart />
            </Card>
          </div>
          
        </div>

        {/* Table Bottom Row */}
        <Card className="p-5 bg-[#1C1C1F] border-none">
          <h3 className="text-sm font-medium mb-4">Subscription List</h3>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-zinc-500 border-b border-zinc-800/50">
                  {tableHeaders.map((header) => (
                    <th key={header} className="pb-3 font-medium px-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                {mockTableData.map((row) => (
                  <tr key={row.id} className="border-b border-zinc-800/20 last:border-0">
                    <td className="py-3 px-2">{row.id}</td>
                    <td className="py-3 px-2">{row.customer}</td>
                    <td className="py-3 px-2">{row.order}</td>
                    <td className="py-3 px-2">{row.cost}</td>
                    <td className="py-3 px-2">{row.date}</td>
                    <td className="py-3 px-2">
                       <span className={`px-2 py-1 rounded-full text-[10px] ${row.status === 'Delivered' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-orange-500/10 text-orange-400'}`}>
                         {row.status}
                       </span>
                    </td>
                    <td className="py-3 px-2">{row.payment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </main>

    </div>
  );
}
