'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, ChevronLeft, MapPin, ShieldCheck, 
  Lock, Zap, Users, Globe, Brain, 
  Smartphone, CreditCard, LayoutGrid, EyeOff, 
  Activity, Server, Database, Code, 
  Mic, HelpCircle, AlertTriangle, CheckCircle // <--- Fixed: Added CheckCircle
} from 'lucide-react';

// --- BENGALI TRANSLATION MAP ---

const translationMap: Record<string, string> = {
  "Title": "স্কলারগ্রিড: নিরাপদ শিক্ষা অপারেটিং সিস্টেম",
  "Problem": "ঢাকার শিক্ষা খাতের প্রধান সমস্যাসমূহ: ট্রাফিক, নিরাপত্তা এবং ভুয়া প্রোফাইল।",
  "Solution": "আমাদের সমাধান: হাইপার-লোকাল রাডার এবং স্মার্ট ডিজিটাল কন্ট্রাক্ট।",
  "Architecture": "সিস্টেম আর্কিটেকচার: চুক্তি থেকে পেমেন্ট পর্যন্ত সব ডিজিটাল।",
  "Pitch": "পিচ স্ক্রিপ্ট: কিভাবে ইনভেস্টরদের সামনে আমাদের আইডিয়া তুলে ধরবেন।",
  "Stack": "টেক স্ট্যাক: আমাদের ব্যবহৃত আধুনিক টেকনোলজি সমূহ।",
  "Market": "মার্কেট ও বিজনেস: আমাদের আয়ের মডেল এবং ভবিষ্যৎ পরিকল্পনা।",
  "Wow": "ওয়াও ফ্যাক্টর: কেন আমরা একটি ডিজিটাল সিকিউরিটি ফার্ম হিসেবেও কাজ করি।"
};

const slideBengaliDescriptions: Record<string, string> = {
  "title": "স্কলারগ্রিড কোনো সাধারণ অ্যাপ নয়, এটি একটি নিরাপদ টিউশন ইকোসিস্টেম। এখানে আমরা টিউটরদের লোকেশন ভেরিফিকেশন এবং অভিভাবকদের পেমেন্ট সিকিউরিটি নিশ্চিত করি।",
  "problem": "ঢাকার অভিভাবকরা অচেনা মানুষদের বাসায় ডাকেন কোনো ভেরিফিকেশন ছাড়া। অন্যদিকে টিউটররা ট্রাফিক জ্যামে সময় নষ্ট করেন এবং নারী টিউটররা নিরাপত্তার অভাবে ভোগেন।",
  "solution": "আমরা একটি অপারেটিং সিস্টেম তৈরি করেছি। আমাদের হাইপার-লোকাল রাডার এবং ২-ধাপের ভেরিফিকেশন পেমেন্ট জালিয়াতি এবং ট্রাফিক সমস্যা সমাধান করে।",
  "architecture": "নিবন্ধন থেকে শুরু করে সফল পেমেন্ট এবং রিভিউ পর্যন্ত প্রতিটি ধাপ আমাদের জিপিএস এবং ভেরিফিকেশন মেকানিজমের মাধ্যমে পরিচালিত হয়।",
  "pitch": "ইনভেস্টরদের সামনে আমাদের মূল আকর্ষণ হলো - ঢাকার ট্রাফিক সমস্যা সমাধান এবং নারী টিউটরদের জন্য আমাদের বিশেষ নিরাপত্তা ব্যবস্থা।",
  "stack": "আমরা নেক্সট.জেএস এবং সুপারবেস এর মত আধুনিক প্রযুক্তি ব্যবহার করেছি যেন সিস্টেমটি দ্রুত এবং স্কেলেবল হয়।",
  "market": "প্রতি মাসে ১ বিলিয়ন ডলারের বেশি টিউশন মার্কেটকে ডিজিটাইজ করাই আমাদের লক্ষ্য। কমিশন এবং সাবস্ক্রিপশন মডেলের মাধ্যমে আমরা আয় করব।",
  "wow": "আমরা শুধু ছাত্র এবং শিক্ষককে মেলাই না, আমরা গৃহশিক্ষার জন্য একটি নিরাপদ ডিজিটাল পরিকাঠামো তৈরি করেছি যা জিপিএস এবং ওটিপি দিয়ে সুরক্ষিত।"
};

// --- BENGALI WRAPPER COMPONENT ---

function SlideWrapper({ id, titleKey, children }: { id: string, titleKey: string, children: React.ReactNode }) {
  const [showBengali, setShowBengali] = useState(false);
  return (
    <div 
      onClick={() => setShowBengali(!showBengali)} 
      className="h-full w-full cursor-pointer transition-all duration-500 relative group"
    >
      {showBengali ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-12 animate-in fade-in zoom-in duration-300">
           <h2 className="text-emerald-400 text-5xl font-black mb-6">{translationMap[titleKey]}</h2>
           <p className="text-zinc-300 text-3xl leading-relaxed max-w-4xl border-l-4 border-emerald-500 pl-8">
             {slideBengaliDescriptions[id]}
           </p>
           <p className="mt-8 text-zinc-500 font-mono text-sm animate-pulse italic">ইংরেজিতে ফিরতে ক্লিক করুন</p>
        </div>
      ) : (
        <div className="h-full w-full animate-in fade-in slide-in-from-right-4 duration-500">
          {children}
          <div className="absolute top-0 right-0 p-2 text-[10px] text-zinc-700 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
            CLICK FOR BENGALI
          </div>
        </div>
      )}
    </div>
  );
}

// --- SLIDE COMPONENTS ---

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in duration-700">
      <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full mb-4 ring-1 ring-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        <LayoutGrid size={80} className="text-emerald-400" />
      </div>
      <div>
        <h1 className="text-7xl font-black tracking-tighter text-white mb-2 text-glow">
          SCHOLAR<span className="text-emerald-400">GRID</span>
        </h1>
        <div className="flex justify-center gap-2">
          <span className="h-1 w-12 bg-emerald-500 rounded-full"></span>
          <span className="h-1 w-3 bg-emerald-500/50 rounded-full"></span>
        </div>
      </div>
      <p className="text-2xl text-zinc-400 font-light tracking-widest uppercase max-w-2xl mx-auto">
        The First <span className="text-white font-bold">Safe-OS</span> for Home Education.
      </p>
      <div className="mt-12 flex gap-4">
        <Badge text="PostGIS Radar" />
        <Badge text="Double-Lock Escrow" />
        <Badge text="Panic Protocol" />
      </div>
    </div>
  );
}

function ProblemSlide() {
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className="text-4xl font-bold text-red-400 mb-12 flex items-center gap-4">
        <AlertTriangle size={40} /> THE BLIND SPOTS
      </h2>
      <div className="grid grid-cols-3 gap-8">
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-red-900/30 hover:bg-zinc-900 transition-colors">
          <EyeOff size={40} className="text-zinc-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Unknown Threats</h3>
          <p className="text-zinc-400">Parents don't know who is entering their home. Female tutors feel unsafe in unverified locations.</p>
        </div>
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-red-900/30 hover:bg-zinc-900 transition-colors">
          <Activity size={40} className="text-zinc-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Logistical Chaos</h3>
          <p className="text-zinc-400">Tutors travel hours for low pay because existing systems can't match "Hyper-Locally".</p>
        </div>
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-red-900/30 hover:bg-zinc-900 transition-colors">
          <Lock size={40} className="text-zinc-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Payment Fraud</h3>
          <p className="text-zinc-400">No contracts. Late payments. No attendance tracking. It's an unorganized informal economy.</p>
        </div>
      </div>
    </div>
  );
}

function SolutionOverviewSlide() {
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className="text-4xl font-bold text-emerald-400 mb-4">DIVIDE, CONQUER & SECURE</h2>
      <p className="text-xl text-zinc-400 mb-12">We built an Operating System, not just an app.</p>
      
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="p-3 bg-emerald-900/20 rounded-lg h-fit text-emerald-400"><MapPin /></div>
            <div>
              <h3 className="text-lg font-bold text-white">1. Hyper-Local Radar</h3>
              <p className="text-zinc-400 text-sm">PostGIS clustering finds tutors physically available in specific zones (e.g., Azimpur).</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 bg-emerald-900/20 rounded-lg h-fit text-emerald-400"><ShieldCheck /></div>
            <div>
              <h3 className="text-lg font-bold text-white">2. The Privacy Shield</h3>
              <p className="text-zinc-400 text-sm">Anti-spam protocol. 1-Time contact rule. Personal details hidden until "Digital Handshake".</p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="p-3 bg-emerald-900/20 rounded-lg h-fit text-emerald-400"><Lock /></div>
            <div>
              <h3 className="text-lg font-bold text-white">3. Double-Lock Verification</h3>
              <p className="text-zinc-400 text-sm">Escrow Payment + 2-Step OTP Handshake ensures physical presence and payment security.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 bg-emerald-900/20 rounded-lg h-fit text-emerald-400"><Zap /></div>
            <div>
              <h3 className="text-lg font-bold text-white">4. Safety Infrastructure</h3>
              <p className="text-zinc-400 text-sm">Live Trace for female tutors. Automated bKash payments via QR attendance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeepDiveArchitecture() {
  const steps = [
    { title: "Sign Up & Trace", desc: "GPS Location & Varsity Email Verification" },
    { title: "Divide & Conquer", desc: "User selects Zone (e.g. Mirpur). Radar activates via PostGIS." },
    { title: "Smart Filtering", desc: "Filter by Subject, Budget, & Real-time Location." },
    { title: "Privacy Shield", desc: "Profile visible, Contact hidden. 1-Time Proposal limit." },
    { title: "Negotiation", desc: "If accepted -> Chat opens -> Appointment Set." },
    { title: "Double-Lock Class", desc: "OTP 1 (Start) + OTP 2 (Release Payment)." },
    { title: "Auto-Management", desc: "QR Attendance, bKash Auto-pay, AI Recommendations." },
  ];

  return (
    <div className="h-full flex flex-col justify-center px-8 relative overflow-hidden">
      <div className="absolute right-0 top-0 opacity-5 -z-10"><Server size={400}/></div>
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center gap-3">
        <Server /> SYSTEM ARCHITECTURE & FLOW
      </h2>
      <div className="grid grid-cols-1 gap-3 relative">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-zinc-900/50 p-3 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors group">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-900/30 text-cyan-400 flex items-center justify-center font-bold text-sm group-hover:bg-cyan-500 group-hover:text-black transition-colors">
              {idx + 1}
            </div>
            <div>
              <h4 className="font-bold text-white text-sm group-hover:text-cyan-400">{step.title}</h4>
              <p className="text-xs text-zinc-500 group-hover:text-zinc-300">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PitchScriptSlide() {
  return (
    <div className="h-full grid grid-cols-2 gap-8 px-8">
      {/* Script Column */}
      <div className="flex flex-col h-full overflow-hidden">
        <div className="bg-black border border-zinc-800 rounded-xl p-6 h-full overflow-y-auto custom-scrollbar relative">
          <h3 className="text-emerald-500 font-mono mb-4 flex items-center gap-2 sticky top-0 bg-black py-2 z-20"><Mic size={18}/> PITCH SCRIPT (3 MIN)</h3>
          
          <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
            <div>
              <strong className="text-white block mb-1">1. The Hook (30s)</strong>
              "Home tutoring in Bangladesh is currently blind. Parents don't know who is coming into their homes. Tutors travel hours for low pay because they can't find students nearby. And female tutors feel unsafe entering unknown locations. We built ScholarGrid to fix the logistics, the trust, and the safety—all in one ecosystem."
            </div>
            <div className="p-3 bg-zinc-900 rounded border-l-2 border-emerald-500">
              <strong className="text-emerald-400 block mb-1">2. Phase 1: Divide & Conquer (45s)</strong>
              "First, we solve the logistics using a <strong>Divide and Conquer</strong> strategy with <strong>PostGIS</strong>. A student selects their specific zone—say, Azimpur. With one click, our <strong>Student Radar</strong> activates. We use real-time GPS coordinates to filter tutors who are *physically available* in that cluster."
            </div>
            <div>
              <strong className="text-white block mb-1">3. Phase 2: Privacy Shield (45s)</strong>
              "Next, we solve privacy. On ScholarGrid, a tutor sees a student's interest and location, but <strong>never</strong> their personal details initially. We implemented a <strong>'One-Time Contact'</strong> rule. Only if the student accepts does the 'Digital Handshake' happen."
            </div>
            <div className="p-3 bg-zinc-900 rounded border-l-2 border-emerald-500">
              <strong className="text-emerald-400 block mb-1">4. Phase 3: Double-Lock USP (45s)</strong>
              "This is our killer feature. For the demo class, we hold payment in escrow. When the tutor arrives:
              <br/>1. <strong>Code 1:</strong> Ensures check-in.
              <br/>2. <strong>Code 2:</strong> Is given by the student *after* class to release funds."
            </div>
          </div>
        </div>
      </div>

      {/* Q&A Column */}
      <div className="flex flex-col h-full overflow-hidden">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 h-full overflow-y-auto custom-scrollbar">
          <h3 className="text-yellow-500 font-mono mb-4 flex items-center gap-2"><HelpCircle size={18}/> Q&A CHEAT SHEET</h3>
          
          <div className="space-y-4">
            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-xs text-zinc-500 font-bold mb-1 uppercase tracking-tighter">Q: How do you handle location data?</p>
              <p className="text-sm text-zinc-300">"We use <strong>PostGIS</strong> for geospatial queries. We store location as geometry points but only render vague zones until a connection is confirmed."</p>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-xs text-zinc-500 font-bold mb-1 uppercase tracking-tighter">Q: What if a student refuses to pay?</p>
              <p className="text-sm text-zinc-300">"That’s why we have the <strong>Double OTP</strong> system. The money is held in escrow before class starts. If the student ghosts, the money stays in a dispute hold."</p>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-xs text-zinc-500 font-bold mb-1 uppercase tracking-tighter">Q: How do you verify users?</p>
              <p className="text-sm text-zinc-300">"University email matching + National ID verification logic on the backend for 100% authenticity."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TechStackSlide() {
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className="text-4xl font-bold text-white mb-12">THE POWER STACK</h2>
      <div className="grid grid-cols-4 gap-6">
        <TechCard icon={<Globe className="text-blue-400"/>} title="Next.js 14" desc="Server Actions & App Router"/>
        <TechCard icon={<Database className="text-emerald-400"/>} title="Supabase" desc="Auth, Realtime & Postgres"/>
        <TechCard icon={<MapPin className="text-purple-400"/>} title="PostGIS" desc="Geospatial Indexing"/>
        <TechCard icon={<CreditCard className="text-pink-400"/>} title="bKash API" desc="Automated Payouts"/>
      </div>
    </div>
  );
}

function MarketGrowthSlide() {
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className="text-4xl font-bold text-white mb-8">GROWTH & BUSINESS</h2>
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-emerald-400">Revenue Model</h3>
          <ul className="space-y-4 text-lg text-zinc-300">
            <li className="flex items-center gap-3"><CheckCircle className="text-emerald-500" size={18}/> 5% Commission on first-month salary.</li>
            <li className="flex items-center gap-3"><CheckCircle className="text-emerald-500" size={18}/> 2% Transaction fee on auto-payments.</li>
            <li className="flex items-center gap-3"><CheckCircle className="text-emerald-500" size={18}/> "Verified Pro" Subscription.</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-blue-400">Expansion Roadmap</h3>
          <ul className="space-y-4 text-lg text-zinc-300">
            <li className="flex items-center gap-3"><Brain className="text-blue-500" size={18}/> AI Tutor Recommendations based on success rate.</li>
            <li className="flex items-center gap-3"><Globe className="text-blue-500" size={18}/> Expansion to Dhaka-wide zones then Chittagong.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function WowFactorSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-12">
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-emerald-500 blur-[100px] opacity-20"></div>
        <ShieldCheck size={120} className="text-emerald-400 relative z-10" />
      </div>
      <h2 className="text-5xl font-black text-white mb-6">THE FINAL VERDICT</h2>
      <p className="text-2xl text-zinc-300 max-w-3xl leading-snug">
        We didn't just build a "Tutor Finder". <br/>
        <span className="text-emerald-400 font-bold">We are building the operating system for safe, verified, and professional home education.</span>
      </p>
      <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="border border-white/10 p-6 rounded-xl bg-black/50 shadow-2xl">
          <h4 className="font-bold text-white mb-1">Live Trace</h4>
          <p className="text-xs text-zinc-500 uppercase tracking-tighter">Real-time safety</p>
        </div>
        <div className="border border-white/10 p-6 rounded-xl bg-black/50 shadow-2xl">
          <h4 className="font-bold text-white mb-1">Double OTP</h4>
          <p className="text-xs text-zinc-500 uppercase tracking-tighter">Escrow security</p>
        </div>
        <div className="border border-white/10 p-6 rounded-xl bg-black/50 shadow-2xl">
          <h4 className="font-bold text-white mb-1">Varsity ID</h4>
          <p className="text-xs text-zinc-500 uppercase tracking-tighter">100% Verification</p>
        </div>
      </div>
    </div>
  );
}

// --- SLIDE DATA MAPPING ---

const slidesData = [
  { id: 'title', key: 'Title', content: <TitleSlide /> },
  { id: 'problem', key: 'Problem', content: <ProblemSlide /> },
  { id: 'solution', key: 'Solution', content: <SolutionOverviewSlide /> },
  { id: 'architecture', key: 'Architecture', content: <DeepDiveArchitecture /> },
  { id: 'pitch', key: 'Pitch', content: <PitchScriptSlide /> },
  { id: 'stack', key: 'Stack', content: <TechStackSlide /> },
  { id: 'market', key: 'Market', content: <MarketGrowthSlide /> },
  { id: 'wow', key: 'Wow', content: <WowFactorSlide /> }
];

// --- HELPER COMPONENTS ---

const Badge = ({ text }: { text: string }) => (
  <span className="px-4 py-2 rounded-full border border-zinc-800 text-zinc-500 text-sm bg-zinc-900/50 backdrop-blur-md">
    {text}
  </span>
);

const TechCard = ({ icon, title, desc }: any) => (
  <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-center hover:border-emerald-500/30 transition-all shadow-xl">
    <div className="mx-auto mb-4 w-fit">{icon}</div>
    <h3 className="font-bold text-xl text-white">{title}</h3>
    <p className="text-zinc-500 text-sm mt-2 font-mono">{desc}</p>
  </div>
);

// --- MAIN PRESENTATION COMPONENT ---

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setCurrentSlide(prev => Math.min(prev + 1, slidesData.length - 1));
      if (e.key === 'ArrowLeft') setCurrentSlide(prev => Math.max(prev - 1, 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-full bg-[#050505] text-white font-sans overflow-hidden relative selection:bg-emerald-500 selection:text-black">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-emerald-500 transition-all duration-300 z-50 shadow-[0_0_20px_#10b981]" 
           style={{ width: `${((currentSlide + 1) / slidesData.length) * 100}%` }} 
      />

      {/* Main Container */}
      <div className="h-full w-full flex items-center justify-center p-8">
        <div className="w-full max-w-7xl h-[85vh] relative">
          <SlideWrapper id={slidesData[currentSlide].id} titleKey={slidesData[currentSlide].key}>
            {slidesData[currentSlide].content}
          </SlideWrapper>
        </div>
      </div>

      {/* Modern Controls */}
      <div className="absolute bottom-10 right-10 flex items-center gap-6 z-50 bg-black/60 backdrop-blur-2xl px-8 py-5 rounded-[2rem] border border-white/10 shadow-2xl">
        <div className="flex flex-col">
          <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest mb-1">Progress</span>
          <span className="text-white font-black text-xl">{currentSlide + 1} <span className="text-zinc-700">/</span> {slidesData.length}</span>
        </div>
        <div className="h-10 w-[1px] bg-white/10 mx-2"></div>
        <div className="flex gap-4">
          <button onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))} disabled={currentSlide === 0} className="p-4 bg-zinc-900 hover:bg-zinc-800 rounded-2xl transition disabled:opacity-20 border border-white/5"><ChevronLeft size={24} /></button>
          <button onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slidesData.length - 1))} disabled={currentSlide === slidesData.length - 1} className="p-4 bg-emerald-500 text-black rounded-2xl hover:bg-emerald-400 font-bold transition disabled:opacity-20 shadow-[0_0_30px_rgba(16,185,129,0.3)]"><ChevronRight size={24} /></button>
        </div>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-900/5 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-900/5 blur-[150px] rounded-full" />
      </div>

      <style jsx global>{`
        .text-glow { text-shadow: 0 0 30px rgba(16, 185, 129, 0.4); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #10b981; }
      `}</style>
    </div>
  );
}