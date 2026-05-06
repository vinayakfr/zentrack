import React from "react";
import Link from "next/link";

export default function AboutPage() {
  const accentColor = "#FF6B2B"; // Giant glowing sun core accent color

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-300 selection:bg-[#FF6B2B]/30 flex flex-col font-sans">
      
      {/* Navbar - Kept consistent with base design */}
      <header className="sticky top-0 left-0 right-0 w-full px-8 py-6 flex items-center justify-between z-30 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <Link href='/' className="text-xl font-medium tracking-tight text-white">ZenTrack</Link>

        <nav className="hidden md:flex items-center space-x-6 bg-white/5 px-6 py-2.5 rounded-full border border-white/10 text-sm font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="text-white transition-colors">About Us</Link>
          <Link href="#" className="hover:text-white transition-colors">Contact Us</Link>
        </nav>

        <div className="w-24 hidden md:block flex justify-end">
          <Link href="/login" className="text-sm font-medium hover:text-white transition-colors">Log In</Link>
        </div>
      </header>

      {/* Main Content Area - Documentation Style */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row px-4 md:px-8 py-12 gap-12 relative z-10">
        
        {/* Left Sidebar Navigation - Modular Minimalist */}
        <aside className="w-full md:w-64 flex-shrink-0 relative hidden md:block">
          <div className="sticky top-32 space-y-8">
            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">About ZenTrack</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#mission" className="text-sm font-medium text-white flex items-center gap-3">
                    <div className="w-1 h-4 rounded-r-md" style={{ backgroundColor: accentColor }}></div>
                    Our Mission
                  </a>
                </li>
                <li>
                  <a href="#story" className="text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors pl-4">
                    The Story
                  </a>
                </li>
                <li>
                  <a href="#values" className="text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors pl-4">
                    Core Values
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors pl-4">
                    Media Kit
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors pl-4">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Documentation Style Content Area */}
        <main className="flex-1 max-w-3xl prose prose-invert prose-zinc prose-headings:text-white prose-p:text-zinc-400 prose-a:text-[#FF6B2B]">
          
          <div id="mission" className="mb-20 scroll-mt-32">
            <h1 className="text-4xl font-medium tracking-tight text-white mb-6">Our Mission</h1>
            <p className="text-lg leading-relaxed text-zinc-300 mb-6">
              At ZenTrack, we believe that managing your digital life shouldn't be harder than the life itself. Our mission is to obliterate subscription fatigue by providing a centralized, intelligent, and beautifully crafted platform that puts you back in control of your recurring expenses.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              We started with a simple question: <em>"Why are we paying for things we no longer use?"</em> The answer led us to build a tool that not only tracks but actively optimizes your subscriptions, ensuring your hard-earned money is only spent on services that bring you value.
            </p>
            
            <div className="p-6 rounded-2xl bg-[#161618] border border-white/5 my-8">
              <h3 className="text-white text-xl font-medium mt-0 mb-3">Transparency First</h3>
              <p className="text-zinc-400 mb-0">
                We employ a strict anti-dark-pattern philosophy. We don't hide cancellation links, we don't make it difficult to export your data, and we certainly don't surprise you with hidden fees.
              </p>
            </div>
          </div>

          <hr className="border-white/5 my-16" />

          <div id="story" className="mb-20 scroll-mt-32">
            <h2 className="text-3xl font-medium tracking-tight text-white mb-6">The Story</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              The concept of ZenTrack was born in late 2023 when our founders realized they were collectively spending thousands of dollars annually on ghost subscriptions—services they had signed up for, forgotten about, and never used.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Existing tools were either too clunky, lacked critical integrations, or felt like spreadsheets masquerading as software. We wanted something that felt as premium as the services we were managing, heavily inspired by modern design principles and robust engineering. The result is what you see today.
            </p>
          </div>

          <hr className="border-white/5 my-16" />

          <div id="values" className="mb-20 scroll-mt-32">
            <h2 className="text-3xl font-medium tracking-tight text-white mb-6">Core Values</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {/* Value 1 */}
              <div className="flex flex-col p-6 rounded-2xl bg-[#161618] border border-white/5 hover:border-[#FF6B2B]/30 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-white font-medium text-lg mb-2">Simplicity</h3>
                <p className="text-sm text-zinc-400">Complexity is the enemy of action. We distill complex financial data into actionable, beautiful insights.</p>
              </div>

              {/* Value 2 */}
              <div className="flex flex-col p-6 rounded-2xl bg-[#161618] border border-white/5 hover:border-[#FF6B2B]/30 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-white font-medium text-lg mb-2">Privacy</h3>
                <p className="text-sm text-zinc-400">Your financial data is yours. We use bank-level encryption and never sell your personal information.</p>
              </div>

              {/* Value 3 */}
              <div className="flex flex-col p-6 rounded-2xl bg-[#161618] border border-white/5 hover:border-[#FF6B2B]/30 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-white font-medium text-lg mb-2">Empowerment</h3>
                <p className="text-sm text-zinc-400">We don't just track; we empower you to make informed decisions about your recurring expenses.</p>
              </div>
              
               {/* Value 4 */}
               <div className="flex flex-col p-6 rounded-2xl bg-[#161618] border border-white/5 hover:border-[#FF6B2B]/30 transition-colors">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="text-white font-medium text-lg mb-2">Design</h3>
                <p className="text-sm text-zinc-400">Utility shouldn't come at the cost of beauty. We believe in crafting experiences that are a joy to use everyday.</p>
              </div>
            </div>
          </div>
        </main>

        {/* Right empty space for true modular documentation feel (often used for 'On this page' toc, but keeping minimalist here) */}
        <div className="hidden lg:block w-48 flex-shrink-0"></div>
      </div>
      
      {/* Subtle ambient glow matching the accent color at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 rounded-full blur-[160px] pointer-events-none z-0" style={{ backgroundColor: `${accentColor}08` }} />

    </div>
  );
}
