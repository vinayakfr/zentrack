"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Card } from "../components/Card";
import Image from "next/image";
import { useAuth } from "../components/AuthContext";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0A0A0A] text-white overflow-hidden relative selection:bg-orange-500/30">

      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-purple-900/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3/4 h-1/2 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Navbar */}
      <header className="w-full px-8 py-6 flex items-center justify-between z-20">
        <div className="text-xl font-medium tracking-tight">ZenTrack</div>

        <nav className="hidden md:flex items-center space-x-8 bg-white/5 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 text-sm font-medium">
          <Link href="/" className="hover:text-orange-400 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-orange-400 text-zinc-400 transition-colors">About Us</Link>
          <Link href="#" className="text-zinc-400 hover:text-zinc-200 transition-colors">Contact</Link>
        </nav>

        <div className="w-24 hidden md:block"></div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-6xl flex items-center justify-center p-4 z-10 relative">
        <Card className="w-full min-h-[600px] flex flex-col md:flex-row overflow-hidden border-white/10 bg-[#161618]/60 !rounded-[2rem]">
          {/* Left Side Visual Element */}
          <div className="hidden md:flex w-5/12 p-4 relative flex-col">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-orange-400/20 to-purple-600/20 rounded-3xl m-4" />
            <div className="relative z-10 w-full h-full rounded-[1.5rem] overflow-hidden bg-[#24242A]">
              <Image
                src="/signup-illustration.png"
                alt="3D Dashboard Render"
                fill
                className="object-cover opacity-90 transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right Side Form */}
          <div className="w-full md:w-7/12 flex flex-col p-8 md:p-16 justify-center">

            <div className="max-w-md w-full mx-auto space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-medium tracking-tight">Create an account</h2>
                <p className="text-sm text-zinc-400">
                  Already have an account? <Link href="/login" className="text-white font-medium hover:text-orange-400 transition-colors">Log In</Link>
                </p>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-[#1C1C1F] border-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-[#1C1C1F] border-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <div className="flex items-center space-x-2 pt-2">
                  <input type="checkbox" id="terms" className="w-4 h-4 rounded appearance-none border border-zinc-600 bg-[#1C1C1F] checked:bg-orange-500 checked:border-orange-500 flex items-center justify-center relative before:content-['✓'] before:absolute before:text-white before:text-xs before:hidden checked:before:block" />
                  <label htmlFor="terms" className="text-sm text-zinc-400 select-none cursor-pointer">
                    I agree to the <Link href="#" className="underline hover:text-white">Terms and Condition</Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-[#232327] hover:bg-[#323238] border border-white/5 py-3.5 text-sm rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </div>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>

              <div className="flex items-center space-x-2">
                <label htmlFor="terms" className="text-sm text-zinc-400 select-none cursor-pointer">
                  Already have an account? <Link href="/login" className="underline hover:text-white">Log In</Link>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4 relative">
                <Button className="w-full bg-[#1C1C1F] hover:bg-[#2A2A30] border-none text-xs gap-2 py-6">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                  Continue with Google
                </Button>
                <Button className="w-full bg-[#1C1C1F] hover:bg-[#2A2A30] border-none text-xs gap-2 py-6">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.08-.46-2.09-.48-3.18 0-1.02.46-2.1.58-3.03-.36-2.28-2.26-4.08-6.13-3.1-9.58.48-1.72 1.54-2.91 3.12-3.41 1.05-.34 2.14-.14 2.97.27.7.35 1.15.54 1.48.54.34 0 .86-.23 1.62-.64 1.25-.66 2.81-.6 4.09.2a4.41 4.41 0 0 1 2.06 3.5c-2.45 1.05-2.93 4.25-.8 5.43-1.02 2.02-2.13 3.5-3.16 4.6" /><path d="M12.03 7.25A4.52 4.52 0 0 1 15 5c.16 2.65-2.06 4.79-4.32 4.45-.1-.97.16-1.89.6-2.73.4-.73.97-1.25 1.75-1.47" /></svg>
                  Continue with Apple
                </Button>
              </div>

            </div>
          </div>
        </Card>
      </main>

    </div>
  );
}
