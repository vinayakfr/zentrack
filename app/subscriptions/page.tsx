"use client";

import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

// Minimalistic Sparkline Component for visual micro-charts
const Sparkline = ({ color = "#F44D27", id = "grad1" }) => {
  return (
    <div className="w-full h-16 relative">
      <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path 
          d="M0,80 Q10,60 20,70 T40,40 T60,50 T80,20 T100,10 L100,100 L0,100 Z" 
          fill={`url(#${id})`} 
        />
        <path 
          d="M0,80 Q10,60 20,70 T40,40 T60,50 T80,20 T100,10" 
          fill="none" 
          stroke={color} 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round" 
        />
      </svg>
    </div>
  );
};

export default function SubscriptionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const subscriptionPlans = [
    {
      id: 1,
      title: "Zen Basic",
      price: "$15",
      interval: "mo",
      status: "Active",
      subscribers: "1,245",
      mrr: "$18.6k",
      growth: "+12%",
      color: "#F44D27",
      isPrimary: false
    },
    {
      id: 2,
      title: "Zen Premium",
      price: "$50",
      interval: "mo",
      status: "Active",
      subscribers: "840",
      mrr: "$42.0k",
      growth: "+24%",
      color: "#E95B1A",
      isPrimary: true
    },
    {
      id: 3,
      title: "Zen Enterprise",
      price: "$200",
      interval: "mo",
      status: "Active",
      subscribers: "45",
      mrr: "$9.0k",
      growth: "+5%",
      color: "#B1310A",
      isPrimary: false
    },
    {
      id: 4,
      title: "Starter Trial",
      price: "$0",
      interval: "14d",
      status: "Draft",
      subscribers: "0",
      mrr: "$0",
      growth: "0%",
      color: "#71717A",
      isPrimary: false
    }
  ];

  return (
    <div className="h-screen bg-[#0A0A0A] text-white flex overflow-hidden selection:bg-orange-500/30 relative">
      
      <Sidebar activePath="/subscriptions" />

      {/* Main Layout Area */}
      <main className="flex-1 p-8 pt-6 pr-4 relative z-10 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10 pr-6 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">My Subscriptions</h1>
            <p className="text-sm text-zinc-400 mt-1">Manage and monitor the subscription plans you offer.</p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-[#1C1C1F] hover:bg-[#2A2A30] border-none text-sm text-zinc-300 transition-colors">
              Export Data
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-500 text-white text-sm border-none shadow-[0_0_15px_rgba(234,88,12,0.2)]"
            >
              + New Plan
            </Button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-6 pb-24">
          
          {/* Tiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {subscriptionPlans.map((plan) => (
              <Card 
                key={plan.id}
                gradientBorder={plan.isPrimary}
                className={`flex flex-col border-none relative overflow-hidden group transition-transform hover:-translate-y-1 ${plan.isPrimary ? 'bg-[#1C1C1F]' : 'bg-[#1C1C1F]'}`}
              >
                {/* Ambient glow for primary plan */}
                {plan.isPrimary && (
                  <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
                )}

                <div className="p-6 pb-0 flex justify-between items-start relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${plan.status === 'Active' ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-zinc-600'}`}></div>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">{plan.status}</span>
                    </div>
                    <h3 className="text-xl font-medium tracking-tight">{plan.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold tracking-tight">{plan.price}</div>
                    <div className="text-xs text-zinc-500">/{plan.interval}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-6 pt-6 grid grid-cols-2 gap-4 relative z-10">
                  <div>
                    <div className="text-xs text-zinc-400 mb-1">Subscribers</div>
                    <div className="text-lg font-medium">{plan.subscribers}</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 mb-1">Monthly MRR</div>
                    <div className="flex items-baseline gap-2">
                       <div className="text-lg font-medium">{plan.mrr}</div>
                       <div className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${plan.growth.startsWith('+') ? 'bg-orange-500/10 text-orange-400' : 'bg-zinc-800 text-zinc-400'}`}>
                         {plan.growth}
                       </div>
                    </div>
                  </div>
                </div>

                {/* Visual Chart */}
                <div className="mt-auto relative z-0 opacity-70 group-hover:opacity-100 transition-opacity">
                   <Sparkline color={plan.status === 'Active' ? plan.color : '#52525B'} id={`spark-${plan.id}`} />
                </div>

                {/* Actions Footer */}
                <div className="p-4 border-t border-white/5 flex gap-2 relative z-10 bg-[#1C1C1F]">
                  <Button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-xs border-none py-2 h-auto">Manage</Button>
                  <Button className="flex-1 bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs py-2 h-auto">Edit Plan</Button>
                </div>
              </Card>
            ))}

            {/* Empty State / Add New Tile */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800/80 hover:border-orange-500/40 bg-[#161618]/50 rounded-[2rem] p-12 text-center transition-colors cursor-pointer group min-h-[320px]"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-800 group-hover:bg-orange-600/20 flex items-center justify-center text-zinc-400 group-hover:text-orange-500 transition-colors mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="font-medium text-white mb-2">Create New Plan</h3>
              <p className="text-xs text-zinc-500 max-w-[200px]">Launch a new subscription tier to capture more user segments.</p>
            </div>

          </div>
        </div>
      </main>

      {/* Pop-up Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity">
          {/* Overlay to close */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setIsModalOpen(false)}></div>
          
          <Card className="w-full max-w-xl bg-[#161618] border border-white/10 p-8 relative z-10 rounded-[2rem] shadow-2xl flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-xl font-medium tracking-tight">Create New Plan</h2>
                <p className="text-sm text-zinc-400 mt-1 mb-6">Define the pricing and features for your new subscription tier.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-zinc-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form className="space-y-5 flex-1 overflow-y-auto pr-2">
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">Plan Name</label>
                <Input placeholder="e.g. Zen Ultimate" className="bg-[#1C1C1F] border-none focus-visible:ring-orange-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Price ($)</label>
                  <Input type="number" placeholder="99" className="bg-[#1C1C1F] border-none focus-visible:ring-orange-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Billing Interval</label>
                  <div className="relative">
                    <select className="w-full h-11 rounded-lg bg-[#1C1C1F] px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 text-zinc-100 appearance-none border border-transparent cursor-pointer">
                      <option value="mo">Monthly (/mo)</option>
                      <option value="yr">Annually (/yr)</option>
                      <option value="wk">Weekly (/wk)</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">Plan Description</label>
                <textarea 
                  rows={3}
                  className="w-full rounded-lg bg-[#1C1C1F] px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 border border-transparent focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none" 
                  placeholder="Describe your plan benefits here..."
                ></textarea>
              </div>
              
              <div className="space-y-3 pt-2">
                <label className="text-xs font-medium text-zinc-400">Highlight Color</label>
                <div className="flex gap-4">
                  {['#F44D27', '#E95B1A', '#B1310A', '#8B5CF6', '#10B981', '#3B82F6'].map((color, i) => (
                     <div key={color} className={`w-8 h-8 rounded-full border-2 ${i === 0 ? 'border-orange-500 shadow-[0_0_10px_rgba(244,77,39,0.5)]' : 'border-transparent hover:border-white/30'} cursor-pointer transition-all`} style={{ backgroundColor: color }}></div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-white/5">
                <input type="checkbox" id="isPrimary" className="w-5 h-5 rounded appearance-none border border-zinc-600 bg-[#1C1C1F] checked:bg-orange-500 checked:border-orange-500 flex flex-shrink-0 items-center justify-center relative before:content-['✓'] before:absolute before:text-white before:font-bold before:text-xs before:hidden checked:before:block cursor-pointer transition-colors" />
                <label htmlFor="isPrimary" className="text-sm text-zinc-300 select-none cursor-pointer">
                  Mark as primary/recommended plan
                </label>
              </div>

            </form>

            <div className="flex gap-3 pt-6 mt-4">
              <Button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-sm border-none py-3">Cancel</Button>
              <Button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gradient-to-r from-orange-600 to-[#F44D27] hover:from-orange-500 hover:to-orange-500 text-white text-sm border-none shadow-[0_0_15px_rgba(234,88,12,0.3)] py-3">Publish Plan</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
