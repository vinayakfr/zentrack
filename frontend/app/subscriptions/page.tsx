"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AuthGuard } from "../components/AuthGuard";
import { apiFetch } from "../../lib/api";

interface Subscription {
  id: string;
  service_name: string;
  plan_name: string;
  price: number;
  billing_cycle: string;
  next_due_date: string;
  status: string;
  created_at?: string;
}

// Minimalistic Sparkline Component for visual micro-charts
const Sparkline = ({ color = "#F44D27", id = "grad1" }: { color?: string; id?: string }) => {
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

const SERVICE_COLORS: Record<string, string> = {
  netflix: "#E50914",
  spotify: "#1DB954",
  youtube: "#FF0000",
  disney: "#113CCF",
  apple: "#A2AAAD",
  amazon: "#FF9900",
  hbo: "#B028F5",
  default: "#F44D27",
};

function getServiceColor(serviceName: string): string {
  const lower = serviceName.toLowerCase();
  for (const key of Object.keys(SERVICE_COLORS)) {
    if (lower.includes(key)) return SERVICE_COLORS[key];
  }
  return SERVICE_COLORS.default;
}

function SubscriptionsContent() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [serviceName, setServiceName] = useState("");
  const [planName, setPlanName] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [nextDueDate, setNextDueDate] = useState("");

  const fetchSubscriptions = useCallback(async () => {
    try {
      const res = await apiFetch("/subscriptions/");
      if (res.ok) {
        const data = await res.json();
        setSubscriptions(data);
      }
    } catch (err) {
      console.error("Failed to fetch subscriptions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await apiFetch("/subscriptions/", {
        method: "POST",
        body: JSON.stringify({
          service_name: serviceName,
          plan_name: planName,
          price: parseFloat(price),
          billing_cycle: billingCycle,
          next_due_date: nextDueDate,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to create subscription");
      }

      // Reset form and close modal
      setServiceName("");
      setPlanName("");
      setPrice("");
      setBillingCycle("monthly");
      setNextDueDate("");
      setIsModalOpen(false);

      // Refresh list
      await fetchSubscriptions();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create subscription");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (subId: string) => {
    try {
      const res = await apiFetch(`/subscriptions/${subId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove from local state
        setSubscriptions((prev) => prev.filter((s) => s.id !== subId));
      }
    } catch (err) {
      console.error("Failed to cancel subscription:", err);
    }
  };

  const totalMonthly = subscriptions.reduce((sum, sub) => {
    if (sub.billing_cycle === "yearly") return sum + sub.price / 12;
    return sum + sub.price;
  }, 0);

  return (
    <div className="h-screen bg-[#0A0A0A] text-white flex overflow-hidden selection:bg-orange-500/30 relative">
      
      <Sidebar activePath="/subscriptions" />

      {/* Main Layout Area */}
      <main className="flex-1 p-8 pt-6 pr-4 relative z-10 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10 pr-6 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">My Subscriptions</h1>
            <p className="text-sm text-zinc-400 mt-1">
              {subscriptions.length > 0
                ? `${subscriptions.length} active subscriptions · $${totalMonthly.toFixed(2)}/mo`
                : "Track and manage your recurring subscriptions."}
            </p>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="primary" 
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-500 text-white text-sm border-none shadow-[0_0_15px_rgba(234,88,12,0.2)]"
            >
              + Add Subscription
            </Button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pr-6 pb-24">
          
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              
              {subscriptions.map((sub, idx) => {
                const color = getServiceColor(sub.service_name);
                return (
                  <Card 
                    key={sub.id}
                    gradientBorder={idx === 0}
                    className={`flex flex-col border-none relative overflow-hidden group transition-transform hover:-translate-y-1 bg-[#1C1C1F]`}
                  >
                    {idx === 0 && (
                      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
                    )}

                    <div className="p-6 pb-0 flex justify-between items-start relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">{sub.status}</span>
                        </div>
                        <h3 className="text-xl font-medium tracking-tight">{sub.service_name}</h3>
                        <p className="text-xs text-zinc-500 mt-1">{sub.plan_name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-semibold tracking-tight">${sub.price}</div>
                        <div className="text-xs text-zinc-500">/{sub.billing_cycle === "monthly" ? "mo" : "yr"}</div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="p-6 pt-6 grid grid-cols-2 gap-4 relative z-10">
                      <div>
                        <div className="text-xs text-zinc-400 mb-1">Billing Cycle</div>
                        <div className="text-sm font-medium capitalize">{sub.billing_cycle}</div>
                      </div>
                      <div>
                        <div className="text-xs text-zinc-400 mb-1">Next Due</div>
                        <div className="text-sm font-medium">{sub.next_due_date}</div>
                      </div>
                    </div>

                    {/* Visual Chart */}
                    <div className="mt-auto relative z-0 opacity-70 group-hover:opacity-100 transition-opacity">
                       <Sparkline color={color} id={`spark-${sub.id}`} />
                    </div>

                    {/* Actions Footer */}
                    <div className="p-4 border-t border-white/5 flex gap-2 relative z-10 bg-[#1C1C1F]">
                      <Button
                        onClick={() => handleCancel(sub.id)}
                        className="flex-1 bg-transparent hover:bg-red-500/10 text-zinc-400 hover:text-red-400 border border-zinc-800 text-xs py-2 h-auto"
                      >
                        Cancel
                      </Button>
                    </div>
                  </Card>
                );
              })}

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
                <h3 className="font-medium text-white mb-2">Add Subscription</h3>
                <p className="text-xs text-zinc-500 max-w-[200px]">Track a new recurring service like Netflix, Spotify, or any other.</p>
              </div>

            </div>
          )}
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
                <h2 className="text-xl font-medium tracking-tight">Add Subscription</h2>
                <p className="text-sm text-zinc-400 mt-1 mb-6">Track a new recurring service.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-zinc-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
                {error}
              </div>
            )}
            
            <form className="space-y-5 flex-1 overflow-y-auto pr-2" onSubmit={handleCreate}>
              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">Service Name</label>
                <Input
                  placeholder="e.g. Netflix, Spotify, GitHub"
                  className="bg-[#1C1C1F] border-none focus-visible:ring-orange-500"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">Plan Name</label>
                <Input
                  placeholder="e.g. Premium, Pro, Basic"
                  className="bg-[#1C1C1F] border-none focus-visible:ring-orange-500"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Price ($)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="9.99"
                    className="bg-[#1C1C1F] border-none focus-visible:ring-orange-500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400">Billing Cycle</label>
                  <div className="relative">
                    <select
                      className="w-full h-11 rounded-lg bg-[#1C1C1F] px-4 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 text-zinc-100 appearance-none border border-transparent cursor-pointer"
                      value={billingCycle}
                      onChange={(e) => setBillingCycle(e.target.value)}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-zinc-400">Next Due Date</label>
                <Input
                  type="date"
                  className="bg-[#1C1C1F] border-none focus-visible:ring-orange-500"
                  value={nextDueDate}
                  onChange={(e) => setNextDueDate(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-3 pt-6 mt-4">
                <Button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-sm border-none py-3">Cancel</Button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-[#F44D27] hover:from-orange-500 hover:to-orange-500 text-white text-sm border-none shadow-[0_0_15px_rgba(234,88,12,0.3)] py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding...
                    </div>
                  ) : (
                    "Add Subscription"
                  )}
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function SubscriptionsPage() {
  return (
    <AuthGuard>
      <SubscriptionsContent />
    </AuthGuard>
  );
}
