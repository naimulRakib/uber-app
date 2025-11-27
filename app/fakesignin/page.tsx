'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function GuestLoginButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleGuestLogin = async () => {
    setLoading(true);

    try {
      // 1. Generate a Random Agent Name (Crucial for your unique username constraint)
      const randomSuffix = Math.floor(10000 + Math.random() * 90000);
      const agentName = `agent_${randomSuffix}`;

      // 2. Official Supabase Anonymous Login
      // We pass metadata so the Database Trigger knows the username immediately
      const { data, error } = await supabase.auth.signInAnonymously({
        options: {
          data: {
            username: agentName,
            display_name: 'Ghost Agent',
            is_anonymous: true
          }
        }
      });

      if (error) throw error;

      // 3. (Fallback) Manual Profile Creation
      // If you didn't set up the Database Trigger, this ensures the profile exists.
      // If the trigger exists, this might fail gracefully (ignore duplicate).
      if (data.user) {
         const { error: profileError } = await supabase
            .from('profiles')
            .insert([{ 
                id: data.user.id,
                username: agentName,
                display_name: 'Ghost Agent',
                avatar_url: `https://api.dicebear.com/9.x/micah/svg?seed=${agentName}`
            }])
            .select();
         
         // Ignore "duplicate key" errors if trigger already did the job
         if (profileError && !profileError.message.includes('duplicate')) {
            console.error("Manual Profile Creation warning:", profileError);
         }
      }

      // 4. Redirect to Dashboard
      console.log("👻 Ghost Access Granted:", data.user?.id);
      router.push('/dashboard');
      router.refresh();

    } catch (error: any) {
      console.error("Guest Login Failed:", error.message);
      alert("System Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <button 
      onClick={handleGuestLogin}
      disabled={loading}
      className="relative w-full group overflow-hidden rounded-xl border border-white/20 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Inner Gradient Glow (The Ectoplasm) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover:translate-x-[100%]"></div>

      <div className="relative flex items-center justify-center gap-3 py-3.5 backdrop-blur-md rounded-xl">
        
        {loading ? (
          <>
             {/* Ghostly Spinner */}
             <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
             <span className="text-gray-400 font-mono text-xs tracking-widest animate-pulse">SUMMONING...</span>
          </>
        ) : (
          <>
            {/* Ghost Icon Container */}
            <div className="relative w-8 h-8 flex items-center justify-center">
               {/* Glow behind icon */}
               <div className="absolute inset-0 bg-white/20 blur-lg rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
               
               {/* The Ghost Icon */}
               <svg className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0a2 2 0 002 2v0a2 2 0 012 2v0a2 2 0 01-2 2v0a2 2 0 01-2-2v0a2 2 0 00-2-2v0a2 2 0 00-2 2v0a2 2 0 01-2 2v0a2 2 0 01-2-2v0a2 2 0 012-2v0a2 2 0 002-2m-6 0h2m2-13.5V3a3 3 0 013-3h0a3 3 0 013 3v1.5M9 9h.01M15 9h.01"></path>
               </svg>
            </div>

            <div className="text-left flex flex-col">
              <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest group-hover:text-gray-400 transition-colors">
                Anonymous Access
              </span>
              <span className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors drop-shadow-sm">
                Ghost Mode 
              </span>
            </div>
            
            {/* Arrow */}
            <svg className="w-4 h-4 text-gray-600 ml-auto mr-4 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </>
        )}
      </div>
    </button>
  );
}