'use client';

import React, { useState } from 'react';
import { 
  Radar, ShieldCheck, Zap, BrainCircuit, 
  MapPin, MessageSquare, Handshake, ShieldAlert, 
  TrendingUp, Users, Cpu, Lock, X, Search, Clock, Siren, Database, LayoutGrid
} from 'lucide-react';

// --- TRANSLATION DATA ---

const wowBengaliDesc = `
এটি স্কলারগ্রিডের সবচেয়ে শক্তিশালী টেকনিক্যাল দিক। আমরা শুধু সাধারণ ফিল্টার ব্যবহার করি না; আমরা PostGIS ব্যবহার করে টিউটর এবং ছাত্রের মধ্যে নিখুঁত জিও-লোকেশন ডিস্ট্যান্স এবং জোন পলিগন হিসাব করি। টিউটররা তাদের মূল লোকেশন, প্রেফারড জোন বা অপশনাল জোনের ভিত্তিতে ছাত্রদের অ্যানোনিমাস লোকেশন ম্যাপে দেখতে পাবেন। 

এখানে 'ব্লাইন্ড ম্যাচিং' হয় না—আমরা SQL ব্যবহার করে একটি 'ম্যাচিং পার্সেন্টেজ' বের করি। Gemini AI ব্যবহার করে ছাত্ররা টিউটরদের ডাটাবেস এনালাইসিস করতে পারবে এবং এমনকি গণিতের সমস্যাও সমাধান করতে পারবে। 

প্রাইভেসি আমাদের মূল মন্ত্র—ছাত্রের সঠিক তথ্য গোপন রেখে ডিজিটাল প্রপোজাল এবং নেগোসিয়েশনের মাধ্যমে ডেমো ক্লাস সেট করা হয়। আমাদের AI সিস্টেম দেরি করে আসা টিউটর এবং অভদ্র বা প্রতারক অভিভাবকদের চিহ্নিত করে সিস্টেম থেকে অটোমেটিক ব্ল্যাকলিস্ট করে দেয়।
`;

export default function WowFactorDeepDive() {
  const [showBengali, setShowBengali] = useState(false);

  const techFeatures = [
    {
      title: "PostGIS Geospatial Radar",
      desc: "Advanced SQL polygon matching between Tutor's Multi-Zones (Main/Preferred/Optional) and Student locations.",
      icon: <Radar className="text-emerald-400" />
    },
    {
      title: "Gemini AI LLM Integration",
      desc: "Connects tutor DB with Gemini. Students can ask 'Find me a math tutor who can solve this specific problem.'",
      icon: <BrainCircuit className="text-blue-400" />
    },
    {
      title: "Weighted Matching SQL",
      desc: "Non-binary ranking. We provide a % Match based on commute probability, university verification, and interests.",
      icon: <TrendingUp className="text-purple-400" />
    },
    {
      title: "Anonymized Privacy Shield",
      desc: "Student locations are vague on the map. Proposals and digital negotiations happen without sharing phone numbers.",
      icon: <Lock className="text-pink-400" />
    },
    {
      title: "Behavioral Guardrails",
      desc: "AI detects 'Late Tutors' via QR logs and 'Fraudulent Guardians' via sentiment analysis to purge bad actors.",
      icon: <ShieldAlert className="text-red-400" />
    }
  ];

  return (
    <div 
      onClick={() => setShowBengali(!showBengali)}
      className="h-full w-full bg-[#050505] rounded-[3rem] border border-emerald-500/20 p-12 relative cursor-pointer overflow-hidden transition-all duration-700 hover:border-emerald-500/50 shadow-[0_0_100px_-20px_rgba(16,185,129,0.1)]"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-12 opacity-5 -z-10 rotate-12">
        <Cpu size={400} />
      </div>

      {showBengali ? (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
           <div className="bg-emerald-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Wow Factor: Bengali Context</div>
           <h2 className="text-5xl font-black text-white leading-tight max-w-5xl">স্কলারগ্রিড ইন্টেলিজেন্স লেয়ার</h2>
           <p className="text-2xl text-zinc-300 leading-relaxed max-w-5xl border-l-4 border-emerald-500 pl-8 text-left">
             {wowBengaliDesc}
           </p>
           <p className="text-zinc-500 font-mono text-sm animate-pulse">Click to return to Tech Specifications</p>
        </div>
      ) : (
        <div className="h-full flex flex-col animate-in fade-in duration-500">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={18} className="text-emerald-500 fill-emerald-500" />
                <span className="text-emerald-500 font-black text-xs uppercase tracking-widest">Proprietary Matchmaking Engine</span>
              </div>
              <h1 className="text-6xl font-black text-white tracking-tighter">THE INTELLIGENCE <span className="text-emerald-400">OS</span></h1>
              <p className="text-zinc-500 mt-2 font-medium">Beyond simple lists—this is a verified ecosystem of proximity and trust.</p>
            </div>
            <div className="text-right">
               <p className="text-zinc-500 font-mono text-xs mb-1 uppercase tracking-widest">Algorithm Accuracy</p>
               <p className="text-4xl font-black text-emerald-500">98.2%</p>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {techFeatures.map((f, i) => (
              <div key={i} className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:bg-zinc-800/50 transition-all group relative">
                <div className="mb-4 p-3 bg-black rounded-xl w-fit group-hover:scale-110 transition-transform">{f.icon}</div>
                <h4 className="text-white font-bold mb-2 text-xl">{f.title}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
            
            {/* Behavior Monitor Card */}
            <div className="bg-emerald-500 p-8 rounded-3xl flex flex-col justify-center relative overflow-hidden group">
               <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2 text-black font-black text-[10px] uppercase tracking-widest">
                    <Clock size={12} /> Live Behavioral Scan
                 </div>
                 <h3 className="text-black font-black text-2xl leading-none">AUTO-PURGE SYSTEM</h3>
                 <p className="text-emerald-950 text-xs font-bold mt-2">Late Tutors and Fraudulent Guardians are auto-flagged via QR session logs and chat sentiment.</p>
               </div>
               <div className="absolute -right-4 -bottom-4 opacity-20">
                  <Siren size={100} className="text-black" />
               </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-8">
            <div className="flex gap-4">
               <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  <Database size={12}/> PostGIS 3.0
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                  <BrainCircuit size={12}/> Gemini 1.5 Flash
               </div>
            </div>
            <p className="text-[10px] text-zinc-700 font-mono uppercase">Click anywhere to read the strategy in Bengali</p>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
}