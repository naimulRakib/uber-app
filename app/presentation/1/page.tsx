'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, ChevronLeft, QrCode, Scan, 
  Lock, CreditCard, Star, ShieldCheck, 
  Zap, BarChart3, Users, Play, 
  Handshake, CheckCircle2, AlertCircle
} from 'lucide-react';

// --- SLIDE DATA ---

const slides = [
  { id: 'intro', component: <Phase2Intro /> },
  { id: 'attendance', component: <AttendanceSlide /> },
  { id: 'billing', component: <BillingPulseSlide /> },
  { id: 'trust', component: <VerifiedReputationSlide /> },
  { id: 'architecture', component: <WorkflowArchitecture /> },
  { id: 'market', component: <MarketImpactSlide /> },
  { id: 'demo', component: <DemoScriptSlide /> }
];

// --- COMPONENTS ---

function Phase2Intro() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-in fade-in duration-700">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-mono mb-4">
        <Zap size={14} /> PHASE 2: THE OPERATIONAL CORE
      </div>
      <h1 className="text-7xl font-black tracking-tighter text-white">
        FROM SEARCH TO <span className="text-emerald-400">SUCCESS</span>
      </h1>
      <p className="text-2xl text-zinc-400 font-light max-w-2xl">
        We solved discovery. Today, we solved the <strong>Lifecycle, Payments, and Trust.</strong>
      </p>
    </div>
  );
}

function AttendanceSlide() {
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-4">
        <QrCode className="text-emerald-400" size={40}/> THE QR HANDSHAKE
      </h2>
      <div className="grid grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="p-6 bg-zinc-900 rounded-2xl border-l-4 border-emerald-500">
            <h3 className="text-xl font-bold text-white mb-2 font-mono">Proof of Presence</h3>
            <p className="text-zinc-400 text-sm">No more "ghost classes." Tutors generate a dynamic session token that students scan to verify physical arrival.</p>
          </div>
          <div className="p-6 bg-zinc-900 rounded-2xl border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-white mb-2 font-mono">Fraud Prevention</h3>
            <p className="text-zinc-400 text-sm">Unique daily session keys prevent double-logging. Only the student's physical device can confirm the class.</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl w-fit mx-auto shadow-[0_0_50px_rgba(16,185,129,0.2)] group transition-transform hover:scale-105">
           <QrCode size={200} className="text-black" />
           <p className="text-black font-mono font-black text-center mt-4 tracking-widest">SESSION_KEY: 882 109</p>
        </div>
      </div>
    </div>
  );
}

function BillingPulseSlide() {
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className="text-4xl font-bold text-white mb-12 flex items-center gap-4">
        <BarChart3 className="text-yellow-400" size={40}/> THE 8-CLASS PULSE
      </h2>
      <div className="grid grid-cols-3 gap-8">
        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-zinc-700"></div>
          <h4 className="text-zinc-500 font-bold text-xs uppercase mb-4">Tracking</h4>
          <p className="text-4xl font-black text-white mb-2">5 / 8</p>
          <p className="text-xs text-zinc-400">Classes Completed</p>
        </div>
        <div className="bg-red-500/10 p-8 rounded-3xl border border-red-500/30 text-center scale-110 shadow-2xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-black text-[10px] font-black px-3 py-1 rounded-full">THRESHOLD REACHED</div>
          <h4 className="text-red-500 font-bold text-xs uppercase mb-4">The Lock</h4>
          <Lock className="mx-auto text-red-500 mb-4" size={40} />
          <p className="text-sm text-zinc-300 font-bold">Classroom Paused</p>
        </div>
        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 text-center relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500/50"></div>
          <h4 className="text-emerald-500 font-bold text-xs uppercase mb-4">Resolution</h4>
          <CreditCard className="mx-auto text-zinc-500 mb-4" size={40} />
          <p className="text-sm text-zinc-300">Auto-Billed Escrow</p>
        </div>
      </div>
      <p className="mt-12 text-center text-zinc-500 font-mono text-sm tracking-widest">SYSTEM REMOVES FINANCIAL FRICTION AUTOMATICALLY</p>
    </div>
  );
}

function VerifiedReputationSlide() {
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/30">
          <Star size={40} className="text-emerald-400" />
        </div>
        <h2 className="text-5xl font-black text-white">VERIFIED REPUTATION</h2>
      </div>
      <div className="grid grid-cols-2 gap-12">
        <div className="bg-black border border-zinc-800 p-8 rounded-3xl">
           <div className="flex items-center gap-2 text-yellow-500 mb-4">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
           </div>
           <p className="text-xl text-zinc-300 italic mb-6">"Best math tutor in Banani. Very punctual and explains complex formulas easily."</p>
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800"></div>
              <div>
                <p className="text-sm font-bold">Verified Student</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Handshake Verified</p>
              </div>
           </div>
        </div>
        <div className="flex flex-col justify-center space-y-6">
           <div className="flex gap-4">
              <CheckCircle2 className="text-emerald-500 flex-shrink-0" />
              <p className="text-zinc-400">Reviews are <strong>Locked</strong> until the first 8-class cycle is completed and paid.</p>
           </div>
           <div className="flex gap-4">
              <CheckCircle2 className="text-emerald-500 flex-shrink-0" />
              <p className="text-zinc-400">Zero Fake Ratings. Every 5-star review represents 8 hours of verified physical teaching.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function WorkflowArchitecture() {
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className="text-3xl font-bold text-cyan-400 mb-8 flex items-center gap-3">
        <Zap /> THE NEW WORKFLOW
      </h2>
      
      <div className="grid grid-cols-4 gap-4 mt-8">
        <Step icon={<Handshake />} title="Match" desc="Agreement Set" />
        <Step icon={<QrCode />} title="Sync" desc="QR Handshake" />
        <Step icon={<Lock />} title="Lock" desc="Threshold Met" />
        <Step icon={<CreditCard />} title="Settle" desc="Cycle Reset" />
      </div>
    </div>
  );
}

function MarketImpactSlide() {
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className="text-4xl font-bold text-white mb-12">WHY THIS WINS</h2>
      <div className="grid grid-cols-2 gap-8">
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl">
          <h3 className="text-emerald-400 font-bold mb-2">For Tutors</h3>
          <p className="text-zinc-400 text-sm">Eliminates the "Ask." No more chasing parents for payment. The system stops work if the cycle isn't paid, protecting the teacher's time.</p>
        </div>
        <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl">
          <h3 className="text-blue-400 font-bold mb-2">For Parents</h3>
          <p className="text-zinc-400 text-sm">Total visibility. Only pay for verified hours. Automatic bKash/Card settlement removes the monthly stress of managing cash.</p>
        </div>
      </div>
    </div>
  );
}

function DemoScriptSlide() {
  return (
    <div className="h-full flex flex-col justify-center px-12">
      <h2 className="text-3xl font-bold text-yellow-500 mb-8 flex items-center gap-3 font-mono">
        <Play /> THE 30s DEMO
      </h2>
      <div className="bg-black border border-zinc-800 p-8 rounded-3xl space-y-4 font-mono text-sm leading-relaxed">
        <p className="text-zinc-500 italic">"Now we move to the Classroom. I am the Tutor."</p>
        <p className="text-white"><span className="text-yellow-500">Action:</span> Click Generate QR. "I show this to the student."</p>
        <p className="text-zinc-500 italic">"I am now the Student. I input the code shown on the tutor's screen."</p>
        <p className="text-white"><span className="text-yellow-500">Action:</span> Input '492811' & Confirm. "The class is logged. We are 3/8ths through our contract."</p>
        <p className="text-zinc-500 italic">"Fast forward to class 8. The screen turns red. The system locks. The student pays, and the tutor's career reputation grows—all verified."</p>
      </div>
    </div>
  );
}

// --- HELPERS ---

function Step({ icon, title, desc }: any) {
  return (
    <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 flex flex-col items-center text-center group hover:border-emerald-500 transition-colors">
      <div className="text-zinc-500 group-hover:text-emerald-400 mb-3 transition-colors">{icon}</div>
      <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
      <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{desc}</p>
    </div>
  );
}

// --- MAIN PAGE ---

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
      if (e.key === 'ArrowLeft') setCurrentSlide(prev => Math.max(prev - 1, 0));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-full bg-[#050505] text-white font-sans overflow-hidden relative">
      <div className="absolute top-0 left-0 h-1 bg-emerald-500 transition-all duration-300 z-50" style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }} />
      <div className="h-full w-full flex items-center justify-center p-8">
        <div className="w-full max-w-7xl h-[85vh] relative animate-in fade-in zoom-in-95 duration-500" key={currentSlide}>
          {slides[currentSlide].component}
        </div>
      </div>
      <div className="absolute bottom-8 right-8 flex items-center gap-4 z-50">
        <span className="text-zinc-500 font-mono text-sm">{currentSlide + 1} / {slides.length}</span>
        <button onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))} disabled={currentSlide === 0} className="p-3 bg-zinc-900 rounded-full hover:bg-zinc-800 border border-zinc-800 disabled:opacity-30"><ChevronLeft size={20} /></button>
        <button onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))} disabled={currentSlide === slides.length - 1} className="p-3 bg-emerald-500 text-black rounded-full hover:bg-emerald-400 font-bold disabled:opacity-30"><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}