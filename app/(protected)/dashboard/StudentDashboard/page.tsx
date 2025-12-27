"use client";

import { useEffect, useState, useMemo } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { 
  Map, 
  BookOpen, 
  Zap, 
  ShieldCheck, 
  UserCheck, 
  Search, 
  Radar, 
  ArrowRight,
  Terminal,
  Activity,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

// 👇 Reuse your existing managers
import TuitionManager from '@/app/component/dashboard/TuitionManager'; 
import ReviewManager from '@/app/component/reviews/ReviewManager.';

export default function StudentDashboardPage() {
  // 1. Stabilize Client
  const supabase = useMemo(() => createClient(), []);
  
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (isMounted) {
          setUser(user);
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth Error:", err);
        if (isMounted) setLoading(false);
      }
    };
    checkUser();
    return () => { isMounted = false; };
  }, [supabase]);

  // --- LOADING STATE ---
  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(6,182,212,0.3)]"></div>
      <p className="text-zinc-500 font-mono text-[10px] uppercase animate-pulse">Initializing_Student_Node...</p>
    </div>
  );
  
  if (!user) return <div className="text-white p-10">Unauthorized Access</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background Grid Pattern (Cyan Variant) */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#06b6d4 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-zinc-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500 text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter shadow-[0_0_10px_rgba(6,182,212,0.4)]">Student Active</span>
              <span className="text-zinc-600 text-[10px] font-mono uppercase tracking-[0.2em]">// Access_Level_1</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Learning <span className="text-cyan-400">Hub</span>
            </h1>
            <p className="text-zinc-500 text-xs mt-1">Manage classes, scan QR codes, and find tutors.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
               <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Radar Status</p>
               <p className="text-sm font-black text-cyan-400">Scanning...</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/10 animate-pulse"></div>
              <Radar className="text-cyan-500 relative z-10" size={20} />
            </div>
          </div>
        </header>

        {/* --- Action Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           
           {/* 1. Find Tutors (Primary Action) */}
           <div className="col-span-1 md:col-span-2 p-8 bg-gradient-to-r from-zinc-900 to-black border border-cyan-500/30 rounded-[2rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                 <Map size={180} className="text-cyan-500" />
              </div>
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-4">
                    <Search className="text-cyan-400" size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">PostGIS Radar</span>
                 </div>
                 <h2 className="text-3xl font-black text-white mb-2">NEED A TUTOR?</h2>
                 <p className="text-zinc-400 text-sm max-w-md mb-8 leading-relaxed">
                   Activate the hyper-local radar to find verified tutors within your specific zone. 
                   Filter by Subject, Budget, and University.
                 </p>
                 <Link href="/gps" className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-105 active:scale-95">
                   Launch Radar System <ArrowRight size={16} />
                 </Link>
              </div>
           </div>

           {/* 2. Stats Card */}
           <div className="p-6 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 rounded-[2rem] group hover:border-emerald-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <ShieldCheck className="text-emerald-500" size={24} />
                  <span className="text-[10px] text-zinc-500 font-mono bg-zinc-950 px-2 py-1 rounded">ID: {user.id.slice(0,6)}...</span>
                </div>
                <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Account Status</h3>
                <p className="text-2xl font-black mt-1 text-white">Verified</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl mt-4">
                 <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-2">
                   <UserCheck size={12}/> Parent Protection Active
                 </p>
              </div>
           </div>
        </div>

        {/* --- Main Operational Area --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Tuition Manager (QR Scanning) */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
               {/* Scanline Animation (Cyan) */}
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent animate-[scan_5s_linear_infinite]" />
               
               <div className="flex items-center justify-between mb-8">
                 <h2 className="text-lg font-bold uppercase tracking-tighter flex items-center gap-3">
                   <BookOpen className="text-cyan-400" size={20} /> Active_Classroom
                 </h2>
                 <span className="text-[10px] font-mono text-zinc-600">Attendance_Log</span>
               </div>
               
               {/* 👇 This component handles QR Scanning & Class Tracking */}
               <TuitionManager userId={user.id} />
            </section>
          </div>

          {/* Right Column: Review Manager (Rate Tutor) */}
          <div className="lg:col-span-5 space-y-8">
            <section className="bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] p-8">
               <div className="mb-8">
                 <h2 className="text-lg font-bold uppercase tracking-tighter flex items-center gap-3">
                   <Activity className="text-yellow-500" size={20} /> Evaluation_Node
                 </h2>
                 <p className="text-zinc-500 text-[10px] font-mono mt-2 uppercase tracking-widest">
                   Rate Your Tutors
                 </p>
               </div>

               <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-2xl mb-6">
                 <div className="flex items-center gap-2 mb-1">
                    <Terminal size={12} className="text-yellow-500" />
                    <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">Protocol</span>
                 </div>
                 <p className="text-[10px] text-zinc-400 leading-relaxed">
                   Payment releases are linked to reviews. Please rate your tutor after every cycle to maintain your Student Score.
                 </p>
               </div>

               {/* 👇 Reusing the SAME manager, it adapts to 'Student' role automatically */}
               <ReviewManager />

            </section>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-20 text-center pb-10">
          <p className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.5em]">
            ScholarGrid Student Node // v1.0.4 // Dhaka
          </p>
        </footer>

      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(500px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}