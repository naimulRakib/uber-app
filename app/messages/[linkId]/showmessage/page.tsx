"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";
import Link from "next/link";
import PrivateRoute from "@/app/component/PrivateRoute";
import PremiumBackButton from "@/app/component/PremiumBackButton";
interface Message {
  id: number;
  created_at: string;
  content: string;
  author_name: string;
  reply: string | null;
  link_id: number;
}

const MessageViewPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submittingId, setSubmittingId] = useState<number | null>(null);
  
  // --- NEW STATE FOR EDITING ---
  const [editingId, setEditingId] = useState<number | null>(null);

  const params = useParams();
  const linkId = params.linkId as string;

  const fetchMessages = useCallback(async () => {
    if (!linkId) return;
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("link_id", linkId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to decrypt messages.");
    } finally {
      setLoading(false);
    }
  }, [linkId]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleReplyChange = (messageId: number, content: string) => {
    setReplyContent((prev) => ({ ...prev, [messageId]: content }));
  };

  // --- HANDLE EDIT CLICK ---
  const startEditing = (msg: Message) => {
    setEditingId(msg.id);
    // Pre-fill the textarea with the existing reply
    setReplyContent((prev) => ({ ...prev, [msg.id]: msg.reply || "" }));
  };

  // --- HANDLE CANCEL CLICK ---
  const cancelEditing = (id: number) => {
    setEditingId(null);
    // Optional: Clear the draft from state if needed, or keep it
  };

  const handlePostReply = async (messageId: number) => {
    const content = replyContent[messageId];
    if (!content?.trim()) return alert("Cannot send empty reply.");
    
    setSubmittingId(messageId);

    try {
      const { data, error } = await supabase
        .from("messages")
        .update({ reply: content })
        .eq("id", messageId)
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setMessages((prev) => prev.map((msg) => msg.id === messageId ? { ...msg, reply: data[0].reply } : msg));
        setEditingId(null); // Exit edit mode on success
      }
    } catch (err) {
      alert("Transmission failed.");
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-black">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-900/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/10 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-[spin_3s_linear_infinite]"></div>
                <div className="absolute inset-2 rounded-full border-2 border-cyan-500/20 border-b-cyan-500 animate-[spin_1.5s_linear_infinite_reverse]"></div>
                <div className="absolute inset-8 bg-emerald-500/20 rounded-full animate-pulse flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                </div>
            </div>
            <h2 className="text-emerald-500 font-bold tracking-[0.2em] text-sm animate-pulse">DECRYPTING INBOX</h2>
        </div>
      </div>
    );
  }

  if (error) return <div className="min-h-screen bg-[#030303] flex items-center justify-center text-red-500 font-mono">{error}</div>;

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-emerald-500 selection:text-black relative overflow-hidden py-10 px-4">

        {/* Background FX */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <div>
              <PremiumBackButton/>
              <br /><br />
              <h1 className="text-3xl font-black tracking-tighter text-white">
                Secure <span className="text-emerald-500">Inbox</span>
              </h1>
              <p className="text-gray-500 text-xs font-mono mt-1 uppercase tracking-widest">
                 {messages.length} Encrypted Transmissions
              </p>
            </div>
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            </div>
          </div>

          {/* Messages List */}
          <div className="space-y-6">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg.id} className="group relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Hover Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>

                  {/* Card */}
                  <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                    
                    {/* Top Row: Author & Date */}
                    <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/10 text-gray-400">
                          <span className="font-bold text-xs">{msg.author_name.substring(0,1).toUpperCase()}</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-white">{msg.author_name}</h3>
                          <span className="text-[10px] text-emerald-500 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full">ID: {msg.id}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {new Date(msg.created_at).toLocaleDateString()} • {new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>

                    {/* Message Content */}
                    <div className="mb-6">
                      <p className="text-lg text-gray-200 font-medium leading-relaxed">
                        {msg.content}
                      </p>
                    </div>

                    {/* --- REPLY LOGIC --- */}
                    <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                      
                      {/* CONDITION: Show View Mode if Reply exists AND NOT editing */}
                      {msg.reply && editingId !== msg.id ? (
                        <div className="space-y-2 relative">
                          
                          {/* Header with Edit Button */}
                          <div className="flex justify-between items-center">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                You Replied
                            </p>
                            
                            {/* EDIT BUTTON */}
                            <button 
                                onClick={() => startEditing(msg)}
                                className="text-gray-500 hover:text-emerald-400 transition-colors p-1 rounded hover:bg-white/5"
                                title="Edit Reply"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </button>
                          </div>

                          <p className="text-sm text-gray-300 border-l-2 border-emerald-500/50 pl-3">
                            {msg.reply}
                          </p>
                          <div className="pt-3 flex justify-end">
                             <Link
                                href={`/cardgenerator?msg=${encodeURIComponent(msg.content)}&reply=${encodeURIComponent(msg.reply)}`}
                                className="text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-lg shadow-purple-500/20"
                              >
                            Generate Story Card
                              </Link>
                              
                          </div>
                        </div>
                      ) : (
                        // Show Input Mode if NO reply OR Currently Editing
                        <div className="space-y-3 animate-in fade-in duration-300">
                          <div className="flex justify-between">
                             <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">
                                {editingId === msg.id ? "Edit Your Reply" : "Write a Reply"}
                             </p>
                             {editingId === msg.id && (
                                 <button onClick={() => cancelEditing(msg.id)} className="text-[10px] text-red-400 hover:text-red-300">Cancel</button>
                             )}
                          </div>
                          
                          <textarea
                            placeholder="Type your response..."
                            value={replyContent[msg.id] || ""}
                            onChange={(e) => handleReplyChange(msg.id, e.target.value)}
                            rows={2}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all resize-none"
                          />
                          
                          <div className="flex gap-3 justify-end">
                            {/* Only show AI button if NOT editing (optional preference) */}
                            {!editingId && (
                                <Link
                                href={`/cardgenerator?msg=${encodeURIComponent(msg.content)}`}
                                className="px-4 py-2 rounded-lg border border-white/10 text-gray-400 text-xs font-bold hover:text-white hover:bg-white/5 transition"
                                >
                                AI Reply & Card 🤖
                                </Link>
                            )}
                            
                            {/* Post/Update Button */}
                            <button
                              onClick={() => handlePostReply(msg.id)}
                              disabled={submittingId === msg.id}
                              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg text-black text-xs font-bold hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                              {submittingId === msg.id ? 'Sending...' : (editingId === msg.id ? 'Update Reply' : 'Send Reply')}
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              ))
            ) : (
              // Empty State
              <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-white/5 border-dashed rounded-3xl text-center animate-in fade-in">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">No Transmissions</h4>
                <p className="text-gray-500 text-sm max-w-xs">
                  Share your link to receive anonymous data.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </PrivateRoute>
  );
};

export default MessageViewPage;