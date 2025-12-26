'use client';

import React, { useState } from 'react';
import { 
  MapPin, Clock, ShieldAlert, CreditCard, 
  CheckCircle2, AlertTriangle, Zap, Car, 
  UserCheck, Star, ArrowRight, ShieldCheck, X
} from 'lucide-react';

export default function DhakaProblemSolver() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const solutions = [
    {
      title: "Hyper-Local Gridlock",
      problem: "Dhaka traffic wastes 3+ hours per commute. Tutors burn out traveling across zones.",
      bengali: "ঢাকার ট্রাফিক জ্যামে প্রতিদিন ৩ ঘণ্টার বেশি সময় নষ্ট হয়। এক এলাকা থেকে অন্য এলাকায় যেতে গিয়ে টিউটররা ক্লান্ত হয়ে যায়, যার ফলে টিউশন বাতিল হয়। আমাদের সিস্টেম টিউটরদের শুধুমাত্র তাদের নিজ এলাকার আসেপাশে টিউশন খুঁজে দেয়।",
      efficiency: "80% Commute Reduction",
      tech: "PostGIS Zone Polygons & Radius Lockdown",
      icon: <Car className="text-red-400" />,
      color: "border-red-500/30",
      bg: "bg-red-500/5"
    },
    {
      title: "Ghost Attendance",
      problem: "Parents pay for missed sessions. Tutors lack proof of physical presence.",
      bengali: "অভিভাবকরা অনেক সময় না হওয়া ক্লাসের জন্য পেমেন্ট করেন, আবার টিউটরদের কাছেও উপস্থিতির কোনো প্রমাণ থাকে না। আমাদের QR হ্যান্ডশেক সিস্টেম নিশ্চিত করে যে টিউটর সশরীরে উপস্থিত আছেন কি না।",
      efficiency: "100% Verification",
      tech: "Cryptographic QR Handshake Protocol",
      icon: <UserCheck className="text-emerald-400" />,
      color: "border-emerald-500/30",
      bg: "bg-emerald-500/5"
    },
    {
      title: "Payment Friction",
      problem: "Awkward monthly money talks. Delays in salary. No escrow protection.",
      bengali: "মাসের শেষে বেতন চাওয়াটা অনেকের জন্য বিব্রতকর। আমাদের সিস্টেমে প্রতি ৮ ক্লাস পর পর অটোমেটিক পেমেন্ট লক হয়ে যায়, ফলে টিউটর এবং অভিভাবক উভয়েই আর্থিক ভাবে নিরাপদ থাকেন।",
      efficiency: "Bi-Weekly Auto-Settlement",
      tech: "The 8-Class Pulse & Payment Lockout",
      icon: <CreditCard className="text-yellow-400" />,
      color: "border-yellow-500/30",
      bg: "bg-yellow-500/5"
    },
    {
      title: "Reputation Fraud",
      problem: "Fake reviews from friends. No way to tell if a tutor is actually skilled.",
      bengali: "ভুয়া রিভিউ দিয়ে টিউটর প্রোফাইল ভারী করা এখন অসম্ভব। শুধুমাত্র টাকা দিয়ে অন্তত ৮টি ক্লাস সম্পন্ন করা ছাত্ররাই রিভিউ দিতে পারবে, ফলে প্রতিটি প্রোফাইল হবে ১০০% বিশ্বস্ত।",
      efficiency: "Verified-Only Feedback",
      tech: "Transaction-Linked Review Unlocking",
      icon: <Star className="text-purple-400" />,
      color: "border-purple-500/30",
      bg: "bg-purple-500/5"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-12 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 mb-4">
             <span className="bg-emerald-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
               Phase 2 Deploy
             </span>
             <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
               Urban Efficiency Protocol
             </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter leading-none mb-4">
            SOLVING <span className="text-emerald-500 text-glow">DHAKA</span> AT SCALE
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg">
            Converting a chaotic informal market into a trust-based digital infrastructure through automated enforcement.
          </p>
        </div>

        {/* --- Bento Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 relative">
          {solutions.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveCard(idx)}
              className={`p-8 rounded-[2.5rem] border cursor-pointer relative overflow-hidden transition-all duration-500 
                ${activeCard === idx ? 'ring-2 ring-emerald-500 bg-zinc-900 shadow-2xl scale-[1.02]' : `${item.color} ${item.bg} hover:scale-[1.01]`}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-black rounded-2xl border border-white/5">
                  {item.icon}
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">Efficiency Gain</p>
                  <p className="text-xl font-black text-white">{item.efficiency}</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>

              {activeCard === idx ? (
                <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                  <p className="text-emerald-400 text-sm leading-relaxed font-medium mb-4 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                    {item.bengali}
                  </p>
                  <button onClick={(e) => { e.stopPropagation(); setActiveCard(null); }} className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1 hover:text-white">
                    <X size={12}/> Close Description
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <AlertTriangle className="text-zinc-600 shrink-0" size={18} />
                    <p className="text-sm text-zinc-400 italic">"{item.problem}"</p>
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-white/5">
                    <Zap className="text-emerald-500 shrink-0" size={18} />
                    <div>
                      <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Technical Fix</p>
                      <p className="text-sm text-emerald-400/80 font-mono">{item.tech}</p>
                    </div>
                  </div>
                  <p className="text-[9px] text-zinc-600 animate-pulse mt-2 italic">Click to read in Bengali</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* --- Efficiency Summary Banner --- */}
        <div className="bg-emerald-500 p-8 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_50px_rgba(16,185,129,0.2)]">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-black rounded-full shadow-inner">
               <ShieldCheck size={40} className="text-emerald-500" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-black leading-none">THE SAFETY HQ OVERRIDE</h2>
              <p className="text-emerald-950 font-bold mt-1 max-w-lg">
                Emergency GPS injection for high-density areas. Solving the security gap for female tutors across Dhaka.
              </p>
            </div>
          </div>
          <button className="bg-black text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-zinc-900 transition-colors shrink-0">
            VIEW LIVE DASHBOARD <ArrowRight size={18} />
          </button>
        </div>

      </div>

      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }
      `}</style>
    </div>
  );
}