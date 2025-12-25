"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/app/utils/supabase/client';
import { Check, X, DollarSign, Calendar, BookOpen, Loader2, Briefcase } from 'lucide-react';

export default function ContractManager({ tutorId }: { tutorId: string }) {
  const supabase = createClient();
  const [pendingContracts, setPendingContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      const { data } = await supabase
        .from('contracts')
        .select('*, student:student_id(username)')
        .eq('tutor_id', tutorId)
        .eq('status', 'pending');
      
      if (data) setPendingContracts(data);
      setLoading(false);
    };
    fetchContracts();
  }, [tutorId, supabase]);

  const handleUpdateStatus = async (contractId: string, newStatus: 'active' | 'rejected') => {
    setActionLoading(contractId);
    const { error } = await supabase
      .from('contracts')
      .update({ status: newStatus })
      .eq('id', contractId);

    if (!error) {
      setPendingContracts(prev => prev.filter(c => c.id !== contractId));
      if (newStatus === 'active') alert("Tuition Started! Phase 2 is now active.");
    }
    setActionLoading(null);
  };

  if (loading) return <Loader2 className="animate-spin mx-auto text-gray-400" />;
  if (pendingContracts.length === 0) return null;

  return (
    <div className="space-y-4 mb-6 animate-in fade-in slide-in-from-top-4">
      <h3 className="text-sm font-black uppercase tracking-widest text-emerald-500 flex items-center gap-2">
        <Briefcase size={16} /> New Job Offers (Phase 2)
      </h3>
      
      {pendingContracts.map(contract => (
        <div key={contract.id} className="bg-zinc-900 border border-emerald-500/20 rounded-2xl p-5 shadow-xl">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] text-emerald-500 font-bold uppercase">Hire Request From</p>
              <h4 className="text-white font-bold text-lg">{contract.student?.username}</h4>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-emerald-400 font-mono font-bold">
                <DollarSign size={14} /> {contract.monthly_fee}/mo
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/5 p-2 rounded-lg flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <span className="text-xs text-gray-300">{contract.days_per_week} Days / Week</span>
            </div>
            <div className="bg-white/5 p-2 rounded-lg flex items-center gap-2">
              <BookOpen size={14} className="text-gray-400" />
              <span className="text-xs text-gray-300 capitalize">{contract.subjects.join(', ')}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => handleUpdateStatus(contract.id, 'active')}
              disabled={!!actionLoading}
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
            >
              {actionLoading === contract.id ? <Loader2 className="animate-spin" size={14}/> : <Check size={16} />}
              ACCEPT & START TUITION
            </button>
            <button 
              onClick={() => handleUpdateStatus(contract.id, 'rejected')}
              disabled={!!actionLoading}
              className="px-4 border border-white/10 text-gray-400 hover:text-red-500 rounded-xl transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}