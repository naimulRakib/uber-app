'use client';

import React, { useState } from 'react';
import { 
  XCircle, CheckCircle2, ShieldAlert, ShieldCheck, 
  MapPin, Zap, Lock, CreditCard, History, Search, Activity, MessageSquare
} from 'lucide-react';

export default function PlatformComparison() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const comparisonData = [
    {
      feature: "Trust Model (নিরাপত্তা)",
      traditional: "Passive (Profile Review)",
      scholarGrid: "Active (QR Handshake + SOS)",
      bengali: "চিরাচরিত সাইটগুলোতে শুধুমাত্র প্রোফাইল ভেরিফিকেশন করা হয়। স্কলারগ্রিড-এ আমরা QR হ্যান্ডশেক এবং নারী টিউটরদের জন্য বিশেষ প্যানিক বাটন (SOS) দিয়ে সরাসরি নিরাপত্তা নিশ্চিত করি।",
      traditionalIcon: <ShieldAlert className="text-zinc-500" />,
      scholarGridIcon: <ShieldCheck className="text-emerald-500" />,
    },
    {
      feature: "Matching Logic (ম্যাচিং)",
      traditional: "Manual Search (কল এবং ওয়েট)",
      scholarGrid: "Hyper-Local Radar (PostGIS)",
      bengali: "সাধারণ সাইটে আপনাকে হাজারো টিউটর খুঁজে ফোন দিতে হয়। আমাদের সিস্টেমে হাইপার-লোকাল রাডার ব্যবহার করে আপনার ১ কিমি এলাকার সবচেয়ে কাছের টিউটরকে অটোমেটিক খুঁজে বের করা হয়।",
      traditionalIcon: <Search className="text-zinc-500" />,
      scholarGridIcon: <Zap className="text-emerald-500" />,
    },
    {
      feature: "Payment (পেমেন্ট)",
      traditional: "Informal Cash (ঝুঁকিপূর্ণ)",
      scholarGrid: "8-Class Pulse (অটো-লক)",
      bengali: "মাসের শেষে বেতন চাওয়াটা টিউটরদের জন্য বিব্রতকর। আমাদের অপারেটিং সিস্টেম প্রতি ৮ ক্লাস পর পর টিউশন অটো-লক করে দেয়, ফলে বেতন নিয়ে কোনো ঝামেলা বা প্রতারণা হয় না।",
      traditionalIcon: <XCircle className="text-red-500" />,
      scholarGridIcon: <Lock className="text-emerald-500" />,
    },
    {
      feature: "Privacy (গোপনীয়তা)",
      traditional: "Public Phone Numbers",
      scholarGrid: "Handshake Protocol",
      bengali: "ফেসবুক বা অন্য সাইটে আপনার নম্বর ওপেন থাকে, ফলে স্প্যাম কল আসে। স্কলারগ্রিড-এ ডিজিটাল হ্যান্ডশেক না হওয়া পর্যন্ত আপনার তথ্য কেউ দেখতে পায় না।",
      traditionalIcon: <XCircle className="text-red-500" />,
      scholarGridIcon: <CheckCircle2 className="text-emerald-500" />,
    },
    {
      feature: "Tracking (ট্র্যাকিং)",
      traditional: "No Performance Data",
      scholarGrid: "Real-time Behavior Scan",
      bengali: "আপনার টিউটর ঠিক সময়ে আসছে কি না বা আপনার টিউশন জোন নিরাপদ কি না, তা আমাদের AI রিয়েল-টাইম ট্র্যাক করে। ট্র্যাডিশনাল সাইটে অভিযোগ না করা পর্যন্ত কোনো ব্যবস্থা নেওয়া হয় না।",
      traditionalIcon: <History className="text-zinc-500" />,
      scholarGridIcon: <Activity className="text-emerald-500" />,
    }
  ];

  return (
    <div className="h-full bg-[#050505] text-white p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full"></div>
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="mb-12">
          <h2 className="text-5xl font-black tracking-tighter mb-4">
            THE <span className="text-emerald-500">TRUST</span> EVOLUTION
          </h2>
          <p className="text-zinc-400 text-xl font-light">
            Traditional sites are <span className="text-white">Listing Directories</span>. 
            ScholarGrid is an <span className="text-emerald-400 font-bold uppercase">Enforced Ecosystem</span>.
          </p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
          {/* Header */}
          <div className="grid grid-cols-3 gap-8 px-6 pb-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 border-b border-white/5">
            <div>Feature</div>
            <div>Traditional Sites</div>
            <div className="text-emerald-500">ScholarGrid OS</div>
          </div>

          {/* Table Content */}
          {comparisonData.map((row, i) => (
            <div 
              key={i} 
              onClick={() => setActiveRow(activeRow === i ? null : i)}
              className={`flex flex-col gap-4 p-6 rounded-3xl border transition-all cursor-pointer group
                ${activeRow === i ? 'bg-zinc-900 border-emerald-500/50' : 'bg-zinc-900/30 border-white/5 hover:bg-zinc-900/50'}`}
            >
              <div className="grid grid-cols-3 gap-8 items-center">
                <div className="text-sm font-bold flex items-center gap-3">
                   <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_#10b981] ${activeRow === i ? 'bg-emerald-400' : 'bg-emerald-900'}`}></div>
                   {row.feature}
                </div>
                <div className="flex items-center gap-2 text-zinc-500 text-xs italic">
                  {row.traditionalIcon} {row.traditional}
                </div>
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-black uppercase tracking-tight">
                  {row.scholarGridIcon} {row.scholarGrid}
                </div>
              </div>

              {activeRow === i && (
                <div className="pt-4 border-t border-white/10 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex gap-3 bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/20">
                    <MessageSquare className="text-emerald-500 shrink-0" size={18} />
                    <p className="text-emerald-100/80 text-sm leading-relaxed font-medium">
                      {row.bengali}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
          <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Efficiency Audit v2.0 • Click rows for Bengali insights</p>
          <div className="bg-emerald-500 text-black px-6 py-2 rounded-xl font-black text-xs uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)]">
             Automated Enforcement vs Directory
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
}