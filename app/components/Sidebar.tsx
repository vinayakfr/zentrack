import React from "react";
import Link from "next/link";
import { Button } from "./Button";

export function Sidebar() {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", active: true },
    { name: "Analytics", href: "#", active: false },
    { name: "My Subscriptions", href: "#", active: false },
  ];

  const secondaryNavItems = [
    { name: "Settings", href: "#", active: false },
    { name: "Help", href: "#", active: false },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#1C1C1F] rounded-2xl flex flex-col justify-between py-6 px-4 m-4">
      
      <div className="space-y-8">
        <div className="px-2">
          <Link href="/" className="text-xl font-medium tracking-tight hover:text-orange-400 transition-colors">
            ZenTrack
          </Link>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                item.active 
                  ? "bg-zinc-800 text-white font-medium" 
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <nav className="space-y-1">
          {secondaryNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="space-y-6">
        {/* Ad Banner */}
        <div className="bg-gradient-to-br from-[#E95B1A] to-[#B1310A] p-6 rounded-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-xl font-medium mb-4 pr-4">Fast Payments for Sales</h3>
          <Button variant="primary" size="sm" className="bg-black hover:bg-zinc-900 border-none w-2/3 h-8" children={undefined}>
             
          </Button>
        </div>

        <Link href="/" className="block px-4 text-sm text-zinc-400 hover:text-white transition-colors">
          Logout
        </Link>
      </div>

    </aside>
  );
}
