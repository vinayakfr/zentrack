import React from "react";
import Link from "next/link";
import { Button } from "./components/Button";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#0A0A0A] text-white selection:bg-orange-500/30">

      {/* Navbar */}
      <header className="absolute top-0 left-0 right-0 w-full px-8 py-6 flex items-center justify-between z-20">
        <Link href='/' className="text-xl font-medium tracking-tight">ZenTrack</Link>

        <nav className="hidden md:flex items-center space-x-6 bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 text-sm font-medium">
          <Link href="#" className="hover:text-orange-400 transition-colors">Home</Link>
          <Link href="/about" className="text-zinc-400 hover:text-zinc-200 transition-colors">About Us</Link>
          <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition-colors">Contact Us</Link>
        </nav>

        {/* Empty div for flex-between balance if needed, or we put login here? The design has Login/Signup in the center. So just an empty div placeholder. */}
        <div className="w-24 hidden md:block"></div>
      </header>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 w-full z-10 pt-32 pb-48">
        <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-medium leading-[1.1] tracking-tight mb-12 max-w-7xl">
          Master Your Subscriptions<br />
          Effortlessly
        </h1>

        <div className="flex items-center space-x-4">
          <Button link='/login' variant="primary" size="lg" className="px-10 bg-[#27272A] hover:bg-[#3f3f46] text-white">
            Log In
          </Button>
          <span className="text-sm font-medium text-zinc-500">Or</span>
          <Button link='/signup' variant="primary" size="lg" className="px-10 bg-[#27272A] hover:bg-[#3f3f46] text-white">
            Sign Up
          </Button>
        </div>
      </main>

      {/* Giant Glowing Sun/Horizon Effect at the bottom */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 translate-y-1/2 w-[200vw] md:w-[90vw] aspect-square rounded-full z-0 pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#B22286] via-[#F44D27] to-[#FFAE35] opacity-90 blur-[60px]" style={{ mixBlendMode: 'screen' }} />
        {/* Core solid sun to give it that intense horizon look */}
        <div className="absolute inset-10 rounded-full bg-gradient-to-t from-black via-[#D7355D] to-[#FF6B2B] shadow-[0_0_100px_#FF6B2B]" />
        <div className="flex place-content-center place-items-center absolute bottom-0 inset-x-0 h-1/2 bg-[#0A0A0A] rounded-b-full translate-y-1/4 scale-110 blur-3xl z-10"></div>
        {/* Pitch black ground */}
        <div className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[110%] h-[60%] bg-[#0A0A0A] rounded-[100%] z-20 blur-sm"></div>
      </div>

    </div>
  );
}
