import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function SettingsPage() {
  return (
    <div className="h-screen bg-[#0A0A0A] text-white flex overflow-hidden selection:bg-orange-500/30">

      <Sidebar activePath="/settings" />

      {/* Main Layout Area */}
      <main className="flex-1 p-8 pt-6 pr-4 relative z-10 flex flex-col h-full overflow-hidden">
        <header className="flex justify-between items-center mb-10 pr-6 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-medium tracking-tight">Settings</h1>
            <p className="text-sm text-zinc-400 mt-1">Manage your company account and subscription preferences.</p>
          </div>
          <div className="flex gap-4">
            {/* <Button className="bg-[#1C1C1F] hover:bg-[#2A2A30] border-none text-sm text-zinc-300 transition-colors">
              Discard Changes
            </Button> */}
            <Button variant="primary" className="bg-orange-600 hover:bg-orange-500 text-white text-sm border-none shadow-[0_0_15px_rgba(234,88,12,0.2)]">
              Edit Settings
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl w-full flex-1 overflow-hidden">

          {/* Left Column - Navigation/Sections */}
          <div className="lg:col-span-1 space-y-2 flex-shrink-0">
            <nav className="flex flex-col space-y-1 sticky top-6">
              <button className="text-left px-4 py-2.5 rounded-lg text-sm bg-zinc-800/80 text-white font-medium transition-colors border-l-2 border-orange-500">
                General Profile
              </button>
              <button className="text-left px-4 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors border-l-2 border-transparent">
                Subscription Plan
              </button>
              <button className="text-left px-4 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors border-l-2 border-transparent">
                Billing & Payment
              </button>
              <button className="text-left px-4 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors border-l-2 border-transparent">
                Invoice History
              </button>
            </nav>
          </div>

          {/* Right Column - Forms and Content */}
          <div className="lg:col-span-3 overflow-y-auto space-y-12 pb-16 h-full pr-6 pb-24">

            {/* General Profile Section */}
            <section id="general">
              <h2 className="text-lg font-medium mb-5">Company Profile</h2>
              <Card className="p-7 bg-[#1C1C1F] border-none space-y-8 rounded-2xl">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-orange-500 to-purple-600 flex items-center justify-center text-3xl font-bold shadow-lg shadow-orange-500/10">
                    Z
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-medium">Company Logo</div>
                    <div className="flex gap-3">
                      <Button className="bg-zinc-800 hover:bg-zinc-700 text-xs border-none h-8 px-4 rounded-lg">Upload New</Button>
                      <Button className="bg-transparent hover:bg-red-500/10 text-red-400 text-xs border-none h-8 px-4 rounded-lg">Remove</Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Company Name</label>
                    <Input placeholder="ZenTrack Inc." className="bg-[#24242A] border-zinc-800/40 focus:border-orange-500/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400">Contact Email</label>
                    <Input placeholder="hello@zentrack.com" className="bg-[#24242A] border-zinc-800/40 focus:border-orange-500/50" />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-xs font-medium text-zinc-400">Billing Address</label>
                    <Input placeholder="123 Innovation Drive, Tech City, TC 90210" className="bg-[#24242A] border-zinc-800/40 focus:border-orange-500/50" />
                  </div>
                </div>
              </Card>
            </section>

            {/* Subscription Section */}
            <section id="subscription">
              <h2 className="text-lg font-medium mb-5">Current Subscription</h2>
              <Card gradientBorder className="p-0 border-none bg-[#1C1C1F] overflow-hidden relative rounded-2xl">
                {/* Ambient glow for active state visualization */}
                <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-gradient-to-b from-orange-500/10 to-transparent rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

                <div className="p-7 relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                      <div className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase bg-orange-500/10 text-orange-400 mb-3 border border-orange-500/20">
                        Active Plan
                      </div>
                      <h3 className="text-2xl font-medium tracking-tight">Zen Premium Annually</h3>
                      <p className="text-sm text-zinc-400 mt-1">Your next automatic charge of $500.00 is out on Oct 24, 2027.</p>
                    </div>
                    <div className="text-left md:text-right">
                      <div className="text-3xl font-semibold tracking-tight">$50.00 <span className="text-sm font-normal text-zinc-500">/mo</span></div>
                      <div className="text-xs text-zinc-500 mt-1">Billed Annually ($600)</div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-[#24242A] p-5 rounded-xl mb-8 border border-white/5">
                    <div className="flex justify-between items-end text-sm">
                      <div>
                        <div className="font-medium text-zinc-300">Active Seats</div>
                        <div className="text-xs text-zinc-500 mt-1">Include full access to dashboard features.</div>
                      </div>
                      <div className="font-medium">
                        <span className="text-white">8</span> <span className="text-zinc-500">/ 10</span>
                      </div>
                    </div>
                    <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-orange-600 to-orange-400 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: '80%' }}></div>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-zinc-800/50">
                    <Button className="bg-white text-black hover:bg-zinc-200 text-sm font-medium border-none px-6 shadow-sm">
                      Upgrade Plan
                    </Button>
                    <Button className="bg-transparent text-zinc-400 hover:text-red-400 border border-zinc-700 hover:border-red-500/30 text-sm px-6 transition-colors">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </Card>
            </section>

            {/* Payment Method Section */}
            <section id="payment">
              <h2 className="text-lg font-medium mb-5">Payment Methods</h2>
              <Card className="p-7 bg-[#1C1C1F] border-none space-y-4 rounded-2xl">

                <div className="flex items-center justify-between p-5 bg-[#24242A] rounded-xl border border-orange-500/20 relative overflow-hidden transition-all hover:border-orange-500/40 group">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
                  <div className="flex items-center space-x-5">
                    <div className="w-14 h-10 bg-zinc-900 rounded-md flex items-center justify-center border border-zinc-800 shadow-sm">
                      {/* Abstract Mastercard icon */}
                      <div className="relative flex">
                        <div className="w-5 h-5 rounded-full bg-red-500/80 mix-blend-screen -mr-2 z-10" />
                        <div className="w-5 h-5 rounded-full bg-orange-500/80 mix-blend-screen" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium tracking-tight">Mastercard ending in 4242</div>
                      <div className="text-xs text-zinc-500 mt-0.5">Expires 12/28</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="px-2.5 py-1 bg-zinc-800 text-[10px] uppercase tracking-wider font-medium text-zinc-300 rounded-md">Default</span>
                    <button className="text-zinc-500 hover:text-white transition-colors p-1 opacity-0 group-hover:opacity-100">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-[#1C1C1F] border border-dashed border-zinc-700 text-zinc-400 hover:bg-[#24242A] hover:text-white hover:border-zinc-500 text-sm py-6 rounded-xl transition-all">
                  + Add new payment method
                </Button>
              </Card>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
