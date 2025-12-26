'use client';

import React, { useState } from 'react';
import { 
  Rocket, Target, TrendingUp, Landmark, 
  Users, Globe, Zap, X, BarChart, 
  ShieldCheck, Gem, PieChart, ArrowRight 
} from 'lucide-react';

export default function StartupGrowthPresentation() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const strategy = [
    {
      title: "Hyper-Growth Marketing",
      subtitle: "The Dhaka Dominance Strategy",
      description: "Leveraging nano-influencers (University Seniors) and localized SEO to build organic trust in high-density areas.",
      bengali: "আমাদের মার্কেটিং কৌশলটি মূলত ঢাকা শহরের নির্দিষ্ট এলাকাভিত্তিক। আমরা বিশ্ববিদ্যালয়ের সিনিয়র শিক্ষার্থীদের মাধ্যমে প্রচার করছি যেন অভিভাবকরা সহজেই আমাদের বিশ্বাস করতে পারেন। সোশ্যাল মিডিয়া এবং অফলাইন ক্যাম্পেইনের মাধ্যমে আমরা দ্রুত প্রতিটি পরিবারে পৌঁছাচ্ছি।",
      icon: <Target className="text-pink-400" />,
      color: "border-pink-500/30",
      bg: "bg-pink-500/5"
    },
    {
      title: "MVP to Unicorn Path",
      subtitle: "Scalable Scaling Logic",
      description: "Transitioning from manual matching to an automated 8-class pulse system that handles millions of transactions.",
      bengali: "আমাদের যাত্রা শুরু হয়েছে একটি ছোট MVP দিয়ে, যেখানে আমরা কেবল টিউটর এবং ছাত্র মিলিয়ে দিতাম। কিন্তু আমাদের ভবিষ্যৎ পরিকল্পনা হলো এটিকে একটি পূর্ণাঙ্গ ইকোসিস্টেমে রূপান্তর করা, যা প্রতিদিন লক্ষ লক্ষ পেমেন্ট এবং ক্লাস পরিচালনা করবে—যা আমাদের ইউনিকর্ন হওয়ার পথে এগিয়ে নিয়ে যাবে।",
      icon: <Rocket className="text-emerald-400" />,
      color: "border-emerald-500/30",
      bg: "bg-emerald-500/5"
    },
    {
      title: "The Data Advantage",
      subtitle: "Proprietary Learning Graphs",
      description: "Our database of attendance, ratings, and performance is a moat that competitors cannot easily copy.",
      bengali: "স্কলারগ্রিডের কাছে থাকা টিউটরদের পারফরম্যান্স এবং শিক্ষার্থীদের উন্নতির ডেটা আমাদের সবচেয়ে বড় সম্পদ। এই ডেটা ব্যবহার করে আমরা এমন সার্ভিস দিচ্ছি যা অন্য কোনো সাধারণ প্ল্যাটফর্ম দিতে পারবে না। এই ইনফরমেশন আমাদের বাজারে অপ্রতিদ্বন্দ্বী করে তুলবে।",
      icon: <BarChart className="text-yellow-400" />,
      color: "border-yellow-500/30",
      bg: "bg-yellow-500/5"
    },
    {
      title: "Global Future",
      subtitle: "Beyond Bangladesh",
      description: "Scaling the model to high-density emerging markets like India, Vietnam, and Indonesia using the same OS.",
      bengali: "বাংলাদেশ সফল হওয়ার পর আমরা এই একই মডেল ভারত, ভিয়েতনাম এবং ইন্দোনেশিয়ার মতো ঘনবসতিপূর্ণ দেশগুলোতে নিয়ে যাবো। আমাদের তৈরি এই অপারেটিং সিস্টেম বিশ্বের যেকোনো বড় শহরে টিউশন ম্যানেজমেন্টের সমস্যা সমাধানে সক্ষম।",
      icon: <Globe className="text-blue-400" />,
      color: "border-blue-500/30",
      bg: "bg-blue-500/5"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans selection:bg-pink-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header --- */}
        <div className="mb-12 border-b border-white/10 pb-8 relative">
          <div className="flex items-center gap-2 mb-4">
             <span className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter">
               Startup Vision 2026
             </span>
             <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
               Venture Strategy Layer
             </span>
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-none mb-4">
            MVP TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">UNICORN</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
            ScholarGrid isn't just an app; it's the financial and operational infrastructure for the future of private education.
          </p>
        </div>

        {/* --- Strategy Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {strategy.map((item, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveCard(idx)}
              className={`p-8 rounded-[2rem] border cursor-pointer relative transition-all duration-500 group overflow-hidden
                ${activeCard === idx 
                  ? 'bg-zinc-900 border-white/40 ring-1 ring-white/20 shadow-2xl scale-[1.02]' 
                  : `${item.color} ${item.bg} hover:border-white/20`}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-4 rounded-2xl bg-black border border-white/5">
                  {item.icon}
                </div>
                {activeCard === idx && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveCard(null); }}
                    className="p-2 hover:bg-white/10 rounded-full text-zinc-500 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              <div className="space-y-1 mb-4">
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">{item.subtitle}</p>
                <h3 className="text-2xl font-black text-white">{item.title}</h3>
              </div>

              <div className="relative">
                {activeCard === idx ? (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                    <p className="text-emerald-400 text-sm leading-relaxed mb-4 font-medium bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/10">
                      {item.bengali}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase">
                      <TrendingUp size={12}/> Growth Metrics Active
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest animate-pulse">
                      Click to expand Vision
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* --- Future Roadmap Banner --- */}
        <div className="bg-zinc-900 p-10 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 transition-colors">
              <Landmark size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white leading-none">THE $1B REVENUE GAP</h2>
              <p className="text-zinc-500 font-medium mt-2 max-w-md">
                The informal tuition market in Bangladesh is massive. We are the first to digitize its operations.
              </p>
            </div>
          </div>
          <button className="bg-white text-black px-10 py-5 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-emerald-400 transition-all z-10 shadow-xl">
            INVESTOR DECK <ArrowRight size={20} />
          </button>
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]"></div>
        </div>

      </div>
    </div>
  );
}