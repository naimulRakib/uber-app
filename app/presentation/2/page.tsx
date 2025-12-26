'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, FileText, PieChart, 
  Settings, Zap, X, BrainCircuit, 
  History, Wallet, Scale, LineChart, ArrowRight
} from 'lucide-react';

export default function Phase3OperatingSystem() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    {
      title: "Smart Contract Ledger",
      subtitle: "Automated Legal Protection",
      description: "Digital agreements that govern salaries, cancellation policies, and session timings automatically.",
      bengali: "ডিজিটাল কন্ট্রাক্ট সিস্টেম যা বেতন, টিউশন বাতিলের নিয়ম এবং ক্লাসের সময়সূচী স্বয়ংক্রিয়ভাবে পরিচালনা করে। এতে টিউটর এবং অভিভাবক উভয়ের আইনি সুরক্ষা নিশ্চিত হয় এবং কোনো মৌখিক ভুল বোঝাবুঝির সুযোগ থাকে না।",
      icon: <FileText className="text-blue-400" />,
      color: "border-blue-500/30",
      bg: "bg-blue-500/5"
    },
    {
      title: "AI Performance Analytics",
      subtitle: "Learning Progress Tracking",
      description: "AI analyzes session logs to predict student performance and tutor effectiveness over time.",
      bengali: "আমাদের AI সিস্টেম টিউটরের পড়ানোর ধরণ এবং ছাত্রের উন্নতির গ্রাফ বিশ্লেষণ করে। এর মাধ্যমে বোঝা যায় ছাত্র কোন বিষয়ে পিছিয়ে আছে এবং টিউটর কতটা কার্যকরভাবে পাঠদান করছেন, যা ভবিষ্যতের রেজাল্ট ভালো করতে সাহায্য করে।",
      icon: <BrainCircuit className="text-purple-400" />,
      color: "border-purple-500/30",
      bg: "bg-purple-500/5"
    },
    {
      title: "FinTech Payroll Engine",
      subtitle: "One-Click Salary Settlement",
      description: "Automated tax calculation, platform fees, and instant bank/bKash transfers for tutors.",
      bengali: "টিউটরদের বেতন এখন সরাসরি ব্যাংকে বা বিকাশে চলে যাবে এক ক্লিকেই। সিস্টেম নিজেই প্লাটফর্ম ফি এবং ট্যাক্স হিসাব করে নেয়, ফলে প্রতি মাসের শেষে টাকা নিয়ে কোনো চিন্তা করতে হয় না। এটি একটি পূর্ণাঙ্গ ফিনটেক সলিউশন।",
      icon: <Wallet className="text-emerald-400" />,
      color: "border-emerald-500/30",
      bg: "bg-emerald-500/5"
    },
    {
      title: "Dispute Resolution OS",
      subtitle: "Evidence-Based Mediation",
      description: "Digital evidence from QR logs and chat history used to resolve any tutor-student conflicts.",
      bengali: "যদি কোনো কারণে টিউটর এবং অভিভাবকের মধ্যে মতভেদ দেখা দেয়, সিস্টেমের QR লগ এবং চ্যাট হিস্ট্রি ব্যবহার করে তার সুষ্ঠু সমাধান করা হয়। প্রমাণের ভিত্তিতে দ্রুত বিচার নিশ্চিত করার জন্য এটি একটি ডিজিটাল সালিশি ব্যবস্থা।",
      icon: <Scale className="text-orange-400" />,
      color: "border-orange-500/30",
      bg: "bg-orange-500/5"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-12 border-b border-white/10 pb-8 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
             <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-[0_0_15px_rgba(37,99,235,0.4)]">
               Phase 3 Live
             </span>
             <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
               Enterprise Management Layer
             </span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
            SCHOLARGRID <span className="text-blue-500">OS</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
            The ultimate operating system to manage, scale, and secure thousands of tutor-student relationships simultaneously.
          </p>
          
          {/* Animated Background Pulse */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
        </div>

        {/* --- OS Feature Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveFeature(idx)}
              className={`p-8 rounded-[2rem] border cursor-pointer relative transition-all duration-500 group
                ${activeFeature === idx 
                  ? 'bg-zinc-900 border-blue-500 ring-1 ring-blue-500/50 shadow-2xl scale-[1.02]' 
                  : `${feature.color} ${feature.bg} hover:border-white/20`}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className={`p-4 rounded-2xl bg-black border border-white/5 transition-transform duration-500 ${activeFeature === idx ? 'scale-110 rotate-3' : ''}`}>
                  {feature.icon}
                </div>
                {activeFeature === idx && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveFeature(null); }}
                    className="p-2 hover:bg-white/10 rounded-full text-zinc-500 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-1 mb-4">
                <p className="text-[10px] font-black uppercase text-blue-400 tracking-[0.2em]">{feature.subtitle}</p>
                <h3 className="text-2xl font-black text-white">{feature.title}</h3>
              </div>

              <div className="relative">
                {activeFeature === idx ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-blue-100/90 text-sm leading-relaxed mb-4 font-medium border-l-2 border-blue-500 pl-4 py-1">
                      {feature.bengali}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase">
                      <History size={12}/> System Active & Logging
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-between pt-4">
                       <div className="flex -space-x-2">
                          {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border border-black"></div>)}
                       </div>
                       <p className="text-[9px] text-blue-500 font-black uppercase tracking-widest animate-pulse">
                         Click to Open OS Details
                       </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* --- System Health / Footer --- */}
        <div className="bg-gradient-to-r from-zinc-900 to-black p-10 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="flex items-center gap-8">
            <div className="relative">
              <LayoutDashboard size={48} className="text-blue-500" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h2 className="text-3xl font-black text-white leading-none">OS GLOBAL DASHBOARD</h2>
              <div className="flex items-center gap-4 mt-3">
                 <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 1,240 Nodes Active
                 </div>
                 <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> 99.9% Uptime
                 </div>
              </div>
            </div>
          </div>
          <button className="group bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-sm flex items-center gap-3 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)]">
            LAUNCH SYSTEM <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
}