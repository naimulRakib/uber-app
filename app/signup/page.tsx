'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // <--- Using your existing client
import { useToast } from '../context/ToastContext';
export default function SignUpPage() {
  const toast=useToast();
  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  // Username Availability State
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  const router = useRouter();

  // --- 1. CHECK USERNAME AVAILABILITY (Debounced) ---
  useEffect(() => {
    const checkUsername = async () => {
        if (username.length < 3) {
            setIsAvailable(null);
            return;
        }

        setIsChecking(true);
        try {
            // Check public 'profiles' table
            const { data } = await supabase
                .from('profiles')
                .select('username')
                .eq('username', username)
                .single();

            // If data exists, username is taken
            if (data) {
                setIsAvailable(false);
            } else {
                setIsAvailable(true);
            }
        } catch (error) {
            // If error is "Row not found", it means username is free!
            setIsAvailable(true);
        } finally {
            setIsChecking(false);
        }
    };

    const timeoutId = setTimeout(() => checkUsername(), 500);
    return () => clearTimeout(timeoutId);
  }, [username]);


  // --- 2. HANDLE SIGN UP ---
  const handleToSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!isAvailable) return toast.info("Please choose a valid, unique handle.");
      if (password.length < 6) return toast.info("Password must be at least 6 characters.");

      setLoading(true);

      try {
          // A. Create Auth User
          // We pass the username in 'options.data' so the Trigger can find it!
          const { data: authData, error: authError } = await supabase.auth.signUp({
              email,
              password,
              options: { 
                data: { 
                    username: username // <--- Crucial: Passed to Trigger
                } 
              } 
          });

          if (authError) throw authError;
          
          // --- REMOVED MANUAL INSERT BLOCK ---
          // The database trigger does this part now!
          // -----------------------------------

          console.log('✅ Sign-up successful!');
          
          // B. Redirect
          toast.success("Registered. Initializing Dashboard...");
          router.push('/dashboard');

      } catch (error: any) {
          console.error('❌ Sign-up failed:', error.message);
          toast.error("Error: " + error.message);
      } finally {
          setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-emerald-500 selection:text-black relative overflow-hidden flex items-center justify-center my-10 py-10">

      {/* --- CSS ANIMATIONS --- */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>

      {/* --- DYNAMIC BACKGROUND --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[100px] animate-blob delay-2000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* --- MAIN GLASS CARD --- */}
      <main className="w-full max-w-md relative z-10 px-6">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center gap-2 font-bold text-2xl tracking-tighter cursor-pointer hover:scale-105 transition-transform">
              <div className="w-8 h-8 bg-gradient-to-tr from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Twisted<span className="text-emerald-500">.ai</span>
              </span>
            </div>
          </Link>
          <p className="text-gray-500 text-sm mt-2">Initialize your anonymous link.</p>
        </div>

        {/* Form */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>

          <form onSubmit={handleToSignUp} className="space-y-5 relative z-10">
            
            {/* HANDLE INPUT */}
            <div className="space-y-1 group">
              <div className="flex justify-between">
                  <label className="text-xs font-mono text-gray-400 ml-1">PUBLIC HANDLE</label>
                  <div className="text-xs font-bold">
                    {isChecking && <span className="text-yellow-500 animate-pulse">Scanning...</span>}
                    {!isChecking && isAvailable === true && <span className="text-green-400">✓ Available</span>}
                    {!isChecking && isAvailable === false && <span className="text-red-500">✕ Taken</span>}
                  </div>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-emerald-400 transition-colors">@</span>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} 
                  placeholder="username"
                  className={`w-full bg-black/40 border rounded-xl px-4 py-3 pl-8 text-white placeholder-gray-600 focus:outline-none focus:bg-black/60 transition-all ${
                      isAvailable === false ? 'border-red-500/50 focus:border-red-500' : 
                      isAvailable === true ? 'border-green-500/50 focus:border-green-500' : 
                      'border-white/10 focus:border-emerald-500/50'
                  }`}
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-1 group">
              <label className="text-xs font-mono text-gray-400 ml-1">EMAIL ADDRESS</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all"
                />
                <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3.5 group-focus-within:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1 group">
              <label className="text-xs font-mono text-gray-400 ml-1">CREATE PASSPHRASE</label>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-black/60 transition-all"
                />
                <svg className="w-5 h-5 text-gray-500 absolute left-3 top-3.5 group-focus-within:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit" 
              disabled={loading || (username.length > 0 && !isAvailable)}
              className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 text-black font-bold py-3.5 rounded-xl hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
              ) : (
                <>Activate Account <span className="text-lg">➔</span></>
              )}
            </button>
          </form>

           <p className="text-center text-[10px] text-gray-600 mt-4">
            By activating, you agree to our Terms of Service.
          </p>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500">
          Already have a link?{' '}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold underline decoration-emerald-500/30 underline-offset-4 hover:decoration-emerald-500 transition-all">
            Login here
          </Link>
        </p>

      </main>
    </div>
  );
}


//cards: id (uuid) ,created_at, message, reply, prompt_used.
//identity: id, created_at, master_hash, last_ip, device_name, fingerprint_history (jsonb)
//linkhistory : id, created_at, content, author_name, creator_user_id,
//links: id, created_at,creator_user_id, name .
//message: id , created_at, content,author_name,link_id,reply, lat, lng, spy(jsonb), master_id
// profiles: id, username,display_name,avatar_url,created_at