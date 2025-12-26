'use client';

import React, { useState } from 'react';
import { 
  Lightbulb, ShieldCheck, Zap, Cpu, 
  X, Fingerprint, Repeat, Trophy, 
  Layers, Lock, Sparkles, ArrowRight 
} from 'lucide-react';

export default function InnovationMoatPresentation() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const innovations = [
    {
      title: "The Zero-Trust Protocol",
      subtitle: "Beyond Simple Listing",
      description: "Unlike others who just 'list' tutors, we 'verify' work. Our QR Handshake creates a non-repudiable log of physical sessions.",
      bengali: "অন্যান্য প্ল্যাটফর্মগুলো শুধু টিউটরের বিজ্ঞাপন দেয়, কিন্তু আমরা টিউটরের কাজকে ভেরিফাই করি। আমাদের QR হ্যান্ডশেক সিস্টেম নিশ্চিত করে যে টিউটর সশরীরে উপস্থিত ছিলেন কি না, যা অন্য কোনো স্টার্টআপে নেই। এটি একটি 'জিরো-ট্রাস্ট' সিকিউরিটি লেয়ার।",
      icon: <Fingerprint className="text-cyan-400" />,
      color: "border-cyan-500/30",
      bg: "bg-cyan-500/5",
      isUnique: true
    },
    {
      title: "The 8-Class Escrow Pulse",
      subtitle: "Financial Innovation",
      description: "Most startups fail at billing. Our system automates the payment cycle every 8 classes, removing human friction entirely.",
      bengali: "আমাদের পেমেন্ট সিস্টেমটি একটি ইনোভেশন। প্রতি ৮ ক্লাস পর পর পেমেন্ট লক হয়ে যাওয়ার ফিচারটি বাংলাদেশে প্রথম। এটি টিউটরকে বেতন পাওয়ার নিশ্চয়তা দেয় এবং অভিভাবকদের প্রতি মাসে বড় অংকের টাকা অগ্রিম দেওয়ার ঝুঁকি কমায়।",
      icon: <Repeat className="text-orange-400" />,
      color: "border-orange-500/30",
      bg: "bg-orange-500/5",
      isUnique: true
    },
    {
      title: "Geospatial Zone Lockdown",
      subtitle: "Urban Engineering",
      description: "Competitors show you tutors 20km away. We use PostGIS to lock matching within 'Commute Polygons' that ignore Dhaka traffic.",
      bengali: "অন্যান্য অ্যাপ আপনাকে ২০ কিমি দূরের টিউটর দেখায় যা ঢাকার ট্রাফিকে অসম্ভব। আমরা PostGIS ব্যবহার করে এমন একটি জোন তৈরি করি যেখানে টিউটর এবং ছাত্রের দূরত্ব মাত্র ১৫-২০ মিনিটের। এটি আমাদের সার্ভিসকে অত্যন্ত কার্যকর করে তোলে।",
      icon: <Layers className="text-emerald-400" />,
      color: "border-emerald-500/30",
      bg: "bg-emerald-500/5",
      isUnique: true
    },
    {
      title: "Transactional Reputation",
      subtitle: "Integrity Innovation",
      description: "Reviews on ScholarGrid cannot be faked or bought. They are cryptographically linked to a paid 8-class cycle completion.",
      bengali: "আমাদের প্ল্যাটফর্মে রিভিউ কেনা বা ভুয়া রিভিউ দেওয়া অসম্ভব। শুধুমাত্র টাকা দিয়ে অন্তত ১টি সাইকেল (৮ ক্লাস) সম্পন্ন করলেই ছাত্র রিভিউ দিতে পারে। এটিই আমাদের প্ল্যাটফর্মকে বাজারের সবচেয়ে বিশ্বস্ত এবং ইনোভেটিভ রিভিউ সিস্টেম বানিয়েছে।",
      icon: <ShieldCheck className="text-indigo-400" />,
      color: "border-indigo-500/30",
      bg: "bg-indigo-500/5",
      isUnique: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-12 border-b border-white/10 pb-8 relative">
          <div className="flex items-center gap-2 mb-4">
             <span className="bg-emerald-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
               Innovation Audit
             </span>
             <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
               Unfair Advantage Analysis
             </span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
            THE <span className="text-emerald-400">INNOVATION</span> STATEMENT
          </h1>
          <p className="text-zinc-400 max-w-3xl text-lg leading-relaxed">
            ScholarGrid isn't just "another" tuition platform. It is an <span className="text-white font-bold underline decoration-emerald-500">Active Enforcement OS</span>. 
            Most competitors are just <strong>Digital Directories</strong>; we are a <strong>Verified Economy</strong>.
          </p>
        </div>

        {/* --- Innovation Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {innovations.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveCard(idx)}
              className={`p-8 rounded-[2rem] border cursor-pointer relative transition-all duration-500 group overflow-hidden
                ${activeCard === idx 
                  ? 'bg-zinc-900 border-emerald-500/50 ring-1 ring-emerald-500/20 shadow-2xl scale-[1.02]' 
                  : `${item.color} ${item.bg} hover:border-white/20`}`}
            >
              {/* Unique Badge */}
              {item.isUnique && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[8px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full uppercase tracking-widest">
                  <Sparkles size={10} /> Market-First
                </div>
              )}

              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-2xl bg-black border border-white/5 transition-all ${activeCard === idx ? 'shadow-[0_0_20px_rgba(16,185,129,0.2)]' : ''}`}>
                  {item.icon}
                </div>
              </div>

              <div className="space-y-1 mb-4">
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">{item.subtitle}</p>
                <h3 className="text-2xl font-black text-white">{item.title}</h3>
              </div>

              <div className="relative">
                {activeCard === idx ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <p className="text-emerald-400 text-sm leading-relaxed mb-4 font-medium border-l-2 border-emerald-500 pl-4">
                      {item.bengali}
                    </p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveCard(null); }}
                      className="text-[10px] uppercase font-bold text-zinc-500 flex items-center gap-1 hover:text-white"
                    >
                      <X size={12}/> Hide Logic
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 text-[9px] text-emerald-500 font-black uppercase tracking-widest animate-pulse">
                      <Zap size={10}/> See our Unfair Advantage
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* --- Comparison Table / Footer --- */}
        <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden relative group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/30">
                <Trophy size={32} className="text-emerald-500" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white leading-none">THE COMPETITIVE MOAT</h2>
                <p className="text-zinc-500 text-sm mt-2 font-medium">
                  We don't just solve education; we solve the infrastructure of trust in a high-friction city.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="px-6 py-4 bg-black border border-white/10 rounded-2xl text-center">
                 <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1 tracking-widest">Directories</p>
                 <p className="text-red-500 font-black text-xs uppercase italic">Passive</p>
              </div>
              <div className="px-6 py-4 bg-emerald-500 border border-emerald-400 rounded-2xl text-center">
                 <p className="text-[10px] text-black font-bold uppercase mb-1 tracking-widest">ScholarGrid</p>
                 <p className="text-black font-black text-xs uppercase italic">Enforced</p>
              </div>
            </div>
          </div>
          
          {/* Animated Glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        </div>

      </div>
    </div>
  );
}