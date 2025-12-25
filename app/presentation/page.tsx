'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, ChevronLeft, MapPin, ShieldCheck, 
  Lock, Zap, Users, Globe, Brain, 
  Smartphone, CreditCard, LayoutGrid, EyeOff, 
  Activity, Server, Database, Code, 
  Mic, HelpCircle, AlertTriangle, CheckCircle // <--- Fixed: Added CheckCircle
} from 'lucide-react';

// --- SLIDE DATA & COMPONENTS ---

const slides = [
  {
    id: 'title',
    component: <TitleSlide />
  },
  {
    id: 'problem',
    component: <ProblemSlide />
  },
  {
    id: 'solution',
    component: <SolutionOverviewSlide />
  },
  {
    id: 'architecture',
    component: <DeepDiveArchitecture />
  },
  {
    id: 'pitch',
    component: <PitchScriptSlide />
  },
  {
    id: 'stack',
    component: <TechStackSlide />
  },
  {
    id: 'market',
    component: <MarketGrowthSlide />
  },
  {
    id: 'wow',
    component: <WowFactorSlide />
  }
];

// --- SLIDE COMPONENTS ---

function TitleSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in duration-700">
      <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full mb-4 ring-1 ring-emerald-500/50">
        <LayoutGrid size={64} className="text-emerald-400" />
      </div>
      <h1 className="text-7xl font-black tracking-tighter text-white">
        SCHOLAR<span className="text-emerald-400">GRID</span>
      </h1>
      <p className="text-2xl text-zinc-400 font-light tracking-widest uppercase">
        The Trust Infrastructure for Home Education
      </p>
      <div className="mt-12 flex gap-4">
        <span className="px-4 py-2 rounded-full border border-zinc-800 text-zinc-500 text-sm">PostGIS</span>
        <span className="px-4 py-2 rounded-full border border-zinc-800 text-zinc-500 text-sm">AI Matching</span>
        <span className="px-4 py-2 rounded-full border border-zinc-800 text-zinc-500 text-sm">Secure Escrow</span>
      </div>
    </div>
  );
}

function ProblemSlide() {
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className="text-4xl font-bold text-red-400 mb-12 flex items-center gap-4">
        <AlertTriangle size={40} /> THE BLIND SPOT
      </h2>
      <div className="grid grid-cols-3 gap-8">
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-red-900/30">
          <EyeOff size={40} className="text-zinc-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Unknown Threats</h3>
          <p className="text-zinc-400">Parents don't know who is entering their home. Female tutors feel unsafe in unverified locations.</p>
        </div>
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-red-900/30">
          <Activity size={40} className="text-zinc-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Logistical Chaos</h3>
          <p className="text-zinc-400">Tutors travel hours for low pay because existing systems can't match "Hyper-Locally".</p>
        </div>
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-red-900/30">
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
            <div className="p-3 bg-emerald-900/20 rounded-lg h-fit"><MapPin className="text-emerald-400"/></div>
            <div>
              <h3 className="text-lg font-bold text-white">1. Hyper-Local Radar</h3>
              <p className="text-zinc-400 text-sm">PostGIS clustering finds tutors physically available in specific zones (e.g., Azimpur).</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 bg-emerald-900/20 rounded-lg h-fit"><ShieldCheck className="text-emerald-400"/></div>
            <div>
              <h3 className="text-lg font-bold text-white">2. The Privacy Shield</h3>
              <p className="text-zinc-400 text-sm">Anti-spam protocol. 1-Time contact rule. Personal details hidden until "Digital Handshake".</p>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="p-3 bg-emerald-900/20 rounded-lg h-fit"><Lock className="text-emerald-400"/></div>
            <div>
              <h3 className="text-lg font-bold text-white">3. Double-Lock Verification</h3>
              <p className="text-zinc-400 text-sm">Escrow Payment + 2-Step OTP Handshake ensures physical presence and payment security.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 bg-emerald-900/20 rounded-lg h-fit"><Zap className="text-emerald-400"/></div>
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
    <div className="h-full flex flex-col justify-center px-8 overflow-y-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center gap-3">
        <Server /> SYSTEM ARCHITECTURE & FLOW
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-zinc-900/50 p-3 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-cyan-900/30 text-cyan-400 flex items-center justify-center font-bold text-sm">
              {idx + 1}
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">{step.title}</h4>
              <p className="text-xs text-zinc-500">{step.desc}</p>
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
        <div className="bg-black border border-zinc-800 rounded-xl p-6 h-full overflow-y-auto custom-scrollbar">
          <h3 className="text-emerald-500 font-mono mb-4 flex items-center gap-2 sticky top-0 bg-black py-2"><Mic size={18}/> PITCH SCRIPT (3 MIN)</h3>
          
          <div className="space-y-6 text-zinc-300 text-sm leading-relaxed">
            <div>
              <strong className="text-white block mb-1">1. The Hook (30s)</strong>
              "Home tutoring in Bangladesh is currently blind. Parents don't know who is coming into their homes. Tutors travel hours for low pay because they can't find students nearby. And female tutors feel unsafe entering unknown locations. We built ScholarGrid to fix the logistics, the trust, and the safety—all in one ecosystem."
            </div>
            <div className="p-3 bg-zinc-900 rounded border-l-2 border-emerald-500">
              <strong className="text-emerald-400 block mb-1">2. Phase 1: Divide & Conquer (45s)</strong>
              "First, we solve the logistics using a <strong>Divide and Conquer</strong> strategy with <strong>PostGIS</strong>. 
              <br/><em className="text-zinc-500">[Action: Show Map/Zone Selector]</em><br/>
              A student selects their specific zone—say, Azimpur. With one click, our <strong>Student Radar</strong> activates. We don't just dump a list. We use real-time GPS coordinates to filter tutors who are *physically available* in that cluster. We apply Smart Filtering—matching subject, budget, and university verification instantly."
            </div>
            <div>
              <strong className="text-white block mb-1">3. Phase 2: Privacy Shield (45s)</strong>
              "Next, we solve privacy. On ScholarGrid, a tutor sees a student's interest and location, but <strong>never</strong> their personal details initially. We implemented a <strong>'One-Time Contact'</strong> rule. No spamming. Only if the student accepts does the 'Digital Handshake' happen."
            </div>
            <div className="p-3 bg-zinc-900 rounded border-l-2 border-emerald-500">
              <strong className="text-emerald-400 block mb-1">4. Phase 3: Double-Lock USP (45s)</strong>
              "This is our killer feature. For the demo class, we hold payment in escrow. When the tutor arrives:
              <br/>1. <strong>Code 1:</strong> Ensures check-in.
              <br/>2. <strong>Code 2:</strong> Is given by the student *after* class to release funds.
              <br/>It’s physically impossible to scam the system."
            </div>
            <div>
              <strong className="text-white block mb-1">5. Phase 4: Long Game (30s)</strong>
              "We manage the career. Daily attendance via QR Code ensuring automated bKash payments. And for <strong>Female Safety</strong>: If a tutor feels threatened, she hits our <strong>Live Trace</strong> button. It shares real-time geolocation with security instantly."
            </div>
          </div>
        </div>
      </div>

      {/* Q&A Column */}
      <div className="flex flex-col h-full overflow-hidden">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 h-full overflow-y-auto">
          <h3 className="text-yellow-500 font-mono mb-4 flex items-center gap-2"><HelpCircle size={18}/> Q&A CHEAT SHEET</h3>
          
          <div className="space-y-4">
            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-xs text-zinc-500 font-bold mb-1">Q: How do you handle location data?</p>
              <p className="text-sm text-zinc-300">"We use <strong>PostGIS</strong> for geospatial queries to find points within specific polygons (Dhaka zones). We store user location as geometry points but only render vague 'zones' to the frontend until a connection is confirmed to protect privacy."</p>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-xs text-zinc-500 font-bold mb-1">Q: What if a student refuses to pay?</p>
              <p className="text-sm text-zinc-300">"That’s why we have the <strong>Double OTP</strong> system. The money is legally held in escrow before class starts. If they don't give the 2nd code, money goes to a 'Dispute Hold' where our admin reviews the case."</p>
            </div>
            <div className="bg-black/50 p-4 rounded-lg">
              <p className="text-xs text-zinc-500 font-bold mb-1">Q: How do you prevent spam?</p>
              <p className="text-sm text-zinc-300">"We limit the API. A tutor account can only query a specific student ID <strong>once</strong>. If rejected, the link is severed permanently."</p>
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
      <h2 className="text-4xl font-bold text-white mb-12">THE STACK</h2>
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-center">
          <Globe className="mx-auto mb-4 text-blue-400" size={48} />
          <h3 className="font-bold text-xl">Next.js 14</h3>
          <p className="text-zinc-500 text-sm mt-2">App Router & Server Actions</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-center">
          <Database className="mx-auto mb-4 text-emerald-400" size={48} />
          <h3 className="font-bold text-xl">Supabase</h3>
          <p className="text-zinc-500 text-sm mt-2">Auth, Realtime & Postgres</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-center">
          <MapPin className="mx-auto mb-4 text-purple-400" size={48} />
          <h3 className="font-bold text-xl">PostGIS</h3>
          <p className="text-zinc-500 text-sm mt-2">Geospatial Indexing & Querying</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-center">
          <Smartphone className="mx-auto mb-4 text-pink-400" size={48} />
          <h3 className="font-bold text-xl">bKash API</h3>
          <p className="text-zinc-500 text-sm mt-2">Automated Payouts</p>
        </div>
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
            <li className="flex items-center gap-3"><CheckCircle className="text-emerald-500"/> 5% Commission on first-month salary.</li>
            <li className="flex items-center gap-3"><CheckCircle className="text-emerald-500"/> 2% Transaction fee on auto-payments.</li>
            <li className="flex items-center gap-3"><CheckCircle className="text-emerald-500"/> "Verified Pro" Tutor Subscription.</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-blue-400">Future Roadmap</h3>
          <ul className="space-y-4 text-lg text-zinc-300">
            <li className="flex items-center gap-3"><Brain className="text-blue-500"/> AI Tutor Recommendations based on success rate.</li>
            <li className="flex items-center gap-3"><Globe className="text-blue-500"/> Expansion to Chittagong & Sylhet (PostGIS makes this instant).</li>
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
      <h2 className="text-5xl font-black text-white mb-6">THE WOW FACTOR</h2>
      <p className="text-2xl text-zinc-300 max-w-3xl">
        We aren't just connecting students and teachers. <br/>
        <span className="text-emerald-400 font-bold">We are building the operating system for safe, verified, and professional home education.</span>
      </p>
      <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="border border-white/10 p-6 rounded-xl bg-black/50">
          <h4 className="font-bold text-white mb-2">Live Trace</h4>
          <p className="text-xs text-zinc-500">Real-time safety for female tutors</p>
        </div>
        <div className="border border-white/10 p-6 rounded-xl bg-black/50">
          <h4 className="font-bold text-white mb-2">Double OTP</h4>
          <p className="text-xs text-zinc-500">Escrow payment security</p>
        </div>
        <div className="border border-white/10 p-6 rounded-xl bg-black/50">
          <h4 className="font-bold text-white mb-2">Varsity Mail</h4>
          <p className="text-xs text-zinc-500">100% ID Verification</p>
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Navigation Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-full bg-[#050505] text-white font-sans overflow-hidden relative selection:bg-emerald-500 selection:text-black">
      
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 h-1 bg-emerald-500 transition-all duration-300 z-50" 
           style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} 
      />

      {/* Slide Container */}
      <div className="h-full w-full flex items-center justify-center p-8">
        <div className="w-full max-w-7xl h-[85vh] relative">
          {slides[currentSlide].component}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4 z-50">
        <span className="text-zinc-500 font-mono text-sm">
          {currentSlide + 1} / {slides.length}
        </span>
        <button 
          onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
          className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 transition disabled:opacity-50 border border-zinc-800"
          disabled={currentSlide === 0}
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
          className="p-3 bg-emerald-500 text-black rounded-full hover:bg-emerald-400 transition disabled:opacity-50 font-bold"
          disabled={currentSlide === slides.length - 1}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-900/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full" />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #111;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #10b981;
        }
      `}</style>
    </div>
  );
}