'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { 
  Siren, MapPin, Phone, ShieldAlert, CheckCircle, 
  Clock, Navigation, User, AlertTriangle, Activity 
} from 'lucide-react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamic Import for Map to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// --- TYPES ---
type Alert = {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  status: 'active' | 'resolved';
  created_at: string;
  tutor?: {
    basic_info: any;
    emergency_contacts: any;
    mobile: string;
    photo_url?: string;
  };
};

export default function AdminSafetyPage() {
  const supabase = createClient();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- 1. SETUP & REALTIME ---
  useEffect(() => {
    // Load Siren Sound (Put a file named 'siren.mp3' in your public folder)
    audioRef.current = new Audio('/siren.mp3');
    audioRef.current.loop = true;

    const fetchInitial = async () => {
      const { data } = await supabase
        .from('safety_alerts')
        .select(`*, tutor:tutors(basic_info, emergency_contacts, mobile)`) // Join Tutor Data
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (data) {
        setAlerts(data);
        if (data.length > 0) {
          setSelectedAlert(data[0]);
          triggerAlarm(true);
        }
      }
    };

    fetchInitial();

    // LISTEN FOR LIVE UPDATES 📡
    const channel = supabase.channel('admin_safety')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'safety_alerts' }, async (payload) => {
        
        if (payload.eventType === 'INSERT') {
          // NEW ALERT! Fetch Tutor details immediately
          const { data: tutor } = await supabase.from('tutors').select('basic_info, emergency_contacts, mobile').eq('id', payload.new.user_id).single();
          const newAlert = { ...payload.new, tutor } as Alert;
          
          setAlerts(prev => [newAlert, ...prev]);
          setSelectedAlert(newAlert);
          triggerAlarm(true);
        } 
        else if (payload.eventType === 'UPDATE') {
          // LIVE TRACE UPDATE (Lat/Lng changed)
          setAlerts(prev => prev.map(a => a.id === payload.new.id ? { ...a, ...payload.new } : a));
          
          // Update selected view if matches
          setSelectedAlert(prev => prev?.id === payload.new.id ? { ...prev, ...payload.new, tutor: prev?.tutor } as Alert : prev);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); triggerAlarm(false); };
  }, []);

  const triggerAlarm = (play: boolean) => {
    if (play) audioRef.current?.play().catch(() => console.log("Audio permission needed"));
    else { audioRef.current?.pause(); if(audioRef.current) audioRef.current.currentTime = 0; }
  };

  const resolveAlert = async (id: string) => {
    if (!confirm("Confirm situation is safe? This will stop tracking.")) return;
    await supabase.from('safety_alerts').update({ status: 'resolved' }).eq('id', id);
    setAlerts(prev => prev.filter(a => a.id !== id));
    if (alerts.length <= 1) {
        setSelectedAlert(null);
        triggerAlarm(false);
    } else {
        setSelectedAlert(alerts[1]);
    }
  };

  // --- PARSERS ---
  const getTutorName = (a: Alert) => a.tutor?.basic_info?.full_name || "Unknown Tutor";
  const getContacts = (a: Alert) => a.tutor?.emergency_contacts || { father: {}, mother: {} };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex overflow-hidden">
      
      {/* --- SIDEBAR: ALERT LIST --- */}
      <div className="w-1/4 border-r border-zinc-800 flex flex-col bg-zinc-900/50">
        <div className="p-4 border-b border-red-900/30 bg-red-950/10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${alerts.length > 0 ? 'bg-red-500 animate-pulse' : 'bg-zinc-800'}`}>
              <Siren size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-black text-lg tracking-tight">SECURITY PROTOCOL</h1>
              <p className="text-xs text-red-400 font-mono font-bold">{alerts.length} ACTIVE THREATS</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {alerts.map(alert => (
            <div 
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className={`p-4 rounded-xl cursor-pointer border transition-all ${selectedAlert?.id === alert.id ? 'bg-red-600 border-red-400 shadow-lg shadow-red-900/50' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-sm truncate">{getTutorName(alert)}</span>
                <span className="text-[10px] font-mono bg-black/20 px-2 py-0.5 rounded">{new Date(alert.created_at).toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2 text-xs opacity-80">
                <MapPin size={12}/> <span className="font-mono">{alert.latitude.toFixed(4)}, {alert.longitude.toFixed(4)}</span>
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="text-center py-20 text-zinc-600">
              <CheckCircle size={40} className="mx-auto mb-4 opacity-50"/>
              <p className="text-sm font-bold">ALL SYSTEMS SECURE</p>
            </div>
          )}
        </div>
      </div>

      {/* --- MAIN: LIVE TRACE COMMAND --- */}
      <div className="flex-1 flex flex-col bg-zinc-950 relative">
        
        {selectedAlert ? (
          <>
            {/* TOP BAR: INFO */}
            <div className="h-[300px] border-b border-zinc-800 p-6 flex gap-8 bg-zinc-900/30">
              
              {/* 1. TUTOR PROFILE */}
              <div className="w-1/3 space-y-4">
                <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <User size={14}/> Distressed Person
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-zinc-800 rounded-full border-2 border-red-500 flex items-center justify-center overflow-hidden">
                    {/* Add Image if available */}
                    <User size={32} className="text-zinc-500"/> 
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">{getTutorName(selectedAlert)}</h2>
                    <p className="text-red-400 font-mono text-sm mt-1">{selectedAlert.tutor?.mobile || "No Number"}</p>
                    <div className="mt-3 flex gap-2">
                      <a href={`tel:${selectedAlert.tutor?.mobile}`} className="px-4 py-2 bg-white text-black font-bold text-xs rounded hover:bg-gray-200 flex items-center gap-2">
                        <Phone size={12}/> CALL TUTOR
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. EMERGENCY CONTACTS */}
              <div className="w-1/3 border-l border-zinc-800 pl-8 space-y-4">
                <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <ShieldAlert size={14}/> Notify Guardians
                </h3>
                <div className="space-y-3">
                  <ContactRow label="Father" data={getContacts(selectedAlert).father} />
                  <ContactRow label="Mother" data={getContacts(selectedAlert).mother} />
                </div>
              </div>

              {/* 3. ACTIONS */}
              <div className="w-1/3 flex flex-col justify-between items-end">
                <div className="text-right">
                  <p className="text-xs text-red-500 font-bold animate-pulse">LIVE TRACE ACTIVE</p>
                  <p className="text-zinc-500 text-[10px] font-mono mt-1">
                    UPDATED: {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <button 
                  onClick={() => resolveAlert(selectedAlert.id)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/20"
                >
                  <CheckCircle size={18}/> MARK SAFE & RESOLVE
                </button>
              </div>
            </div>

            {/* BOTTOM: LIVE MAP */}
            <div className="flex-1 bg-zinc-900 relative">
               {/* Map Placeholder or Actual Map */}
               <MapFrame lat={selectedAlert.latitude} lng={selectedAlert.longitude} />
               
               {/* Overlay Data */}
               <div className="absolute top-4 right-4 bg-black/80 backdrop-blur text-white p-4 rounded-lg border border-zinc-700 font-mono text-xs z-[1000]">
                  <p>LAT: <span className="text-yellow-400">{selectedAlert.latitude}</span></p>
                  <p>LNG: <span className="text-yellow-400">{selectedAlert.longitude}</span></p>
                  <p>ACC: <span className="text-green-400">HIGH (GPS)</span></p>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col text-zinc-600">
            <Activity size={64} className="mb-4 opacity-20"/>
            <h2 className="text-2xl font-black opacity-50">WAITING FOR SIGNALS</h2>
            <p className="text-sm">Monitoring System Active...</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const ContactRow = ({ label, data }: { label: string, data: any }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg flex justify-between items-center">
    <div>
      <p className="text-[10px] font-bold text-zinc-500 uppercase">{label}</p>
      <p className="text-sm font-bold text-white">{data?.name || "N/A"}</p>
    </div>
    {data?.phone && (
      <a href={`tel:${data.phone}`} className="w-8 h-8 bg-red-600 hover:bg-red-500 rounded flex items-center justify-center text-white transition-colors">
        <Phone size={14} />
      </a>
    )}
  </div>
);

const MapFrame = ({ lat, lng }: { lat: number, lng: number }) => {
  // Using a simple iframe for robust visual if Leaflet fails setup, or swap with real <MapContainer>
  // Here we use a direct Google Maps Embed for maximum reliability in Admin view
  return (
    <iframe
      width="100%"
      height="100%"
      frameBorder="0"
      style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} // Dark Mode Map Hack
      src={`https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
      allowFullScreen
    ></iframe>
  );
};