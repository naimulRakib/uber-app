// "use client";
// import { useEffect, useState } from 'react';
// import { createClient } from '@/app/utils/supabase/client';
// import { 
//   Flame, 
//   CheckCircle2, 
//   AlertCircle, 
//   X, 
//   GraduationCap, 
//   BookOpen, 
//   MapPin, 
//   DollarSign, 
//   Clock, 
//   User as UserIcon 
// } from 'lucide-react';

// export default function SmartMatchList() {
//   const supabase = createClient();
//   const [matches, setMatches] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   // State for the Detailed Modal
//   const [selectedTutor, setSelectedTutor] = useState<any | null>(null);
//   const [detailLoading, setDetailLoading] = useState(false);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) return;

//       // 1. Get the smart matches (ID + Score)
//       const { data, error } = await supabase.rpc('get_smart_matches_for_student', {
//         input_student_id: user.id
//       });

//       if (data) setMatches(data);
//       setLoading(false);
//     };

//     fetchMatches();
//   }, []);

//   // 2. Fetch Full Details when clicking a card
//   const handleViewProfile = async (tutorId: string, baseScore: any) => {
//     setDetailLoading(true);
//     // Open modal immediately with loading state
//     setSelectedTutor({ loading: true }); 

//     // Fetch rich data from 'tutors' table based on your schema
//     const { data, error } = await supabase
//       .from('tutors')
//       .select('*')
//       .eq('id', tutorId)
//       .single();

//     if (data) {
//       // Merge the match score with the full profile data
//       setSelectedTutor({ ...data, match_score: baseScore });
//     }
//     setDetailLoading(false);
//   };

//   const closeProfile = () => setSelectedTutor(null);

//   if (loading) return <div className="p-4 text-xs text-gray-500 animate-pulse">Calculating Compatibility...</div>;

//   return (
//     <>
//       {/* --- LIST VIEW --- */}
//       <div className="w-full bg-white border rounded-xl shadow-sm overflow-hidden">
//         <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
//           <h3 className="font-bold text-sm text-gray-800">Top Recommendations</h3>
//           <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full">AI-Free Logic</span>
//         </div>

//         <div className="divide-y divide-gray-100">
//           {matches.map((tutor) => (
//             <div key={tutor.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleViewProfile(tutor.id, tutor.match_score)}>
//               <div className="flex justify-between items-start mb-2">
//                 <div>
//                   <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1">
//                     {tutor.name}
//                     {tutor.varsity_verified && <CheckCircle2 size={12} className="text-blue-500" />}
//                   </h4>
//                   <p className="text-[10px] text-gray-500">{tutor.primary_area}</p>
//                 </div>
                
//                 {/* SCORE BADGE */}
//                 <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold
//                   ${tutor.match_score >= 80 ? 'bg-green-100 text-green-700' : 
//                     tutor.match_score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
//                   <Flame size={12} />
//                   {tutor.match_score}%
//                 </div>
//               </div>

//               {/* MATCH REASONS */}
//               <div className="flex flex-wrap gap-1 mt-2">
//                 {tutor.match_reasons?.slice(0, 3).map((reason: string, i: number) => (
//                   <span key={i} className="text-[9px] border border-gray-200 px-1.5 py-0.5 rounded text-gray-600">
//                     {reason}
//                   </span>
//                 ))}
//               </div>
              
//               <button className="w-full mt-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-black text-white rounded hover:bg-gray-800">
//                 View Profile
//               </button>
//             </div>
//           ))}

//           {matches.length === 0 && (
//             <div className="p-6 text-center text-gray-400 text-xs">
//               <AlertCircle className="mx-auto mb-2 opacity-50" />
//               No perfect matches found nearby. <br/> Try updating your subjects or area.
//             </div>
//           )}
//         </div>
//       </div>

//       {/* --- DETAILED PROFILE MODAL --- */}
//       {selectedTutor && (
//         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
//           <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative">
            
//             {/* Close Button */}
//             <button onClick={closeProfile} className="absolute top-3 right-3 p-1 bg-white/20 hover:bg-gray-200 rounded-full z-10">
//               <X size={20} className="text-gray-600"/>
//             </button>

//             {selectedTutor.loading ? (
//                <div className="h-64 flex items-center justify-center text-gray-500 text-xs">Loading Dossier...</div>
//             ) : (
//               <>
//                 {/* Header Banner */}
//                 <div className={`h-24 ${selectedTutor.varsity_verified ? 'bg-blue-600' : 'bg-gray-800'} relative`}>
//                   <div className="absolute -bottom-8 left-6">
//                     <div className="w-16 h-16 bg-white rounded-full border-4 border-white flex items-center justify-center shadow-md">
//                        <UserIcon size={32} className="text-gray-400"/>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Body Content */}
//                 <div className="pt-10 px-6 pb-6">
                  
//                   {/* Identity */}
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
//                         {selectedTutor.basic_info?.full_name || "Tutor"}
//                         {selectedTutor.varsity_verified && <CheckCircle2 size={18} className="text-blue-500" />}
//                       </h2>
//                       <p className="text-xs text-gray-500 flex items-center gap-1">
//                         <MapPin size={10}/> {selectedTutor.primary_area} 
//                         {selectedTutor.teaching_details?.preferred_area && ` • ${selectedTutor.teaching_details.preferred_area}`}
//                       </p>
//                     </div>
//                     <div className="text-center">
//                        <span className="block text-2xl font-black text-green-600">{selectedTutor.match_score}%</span>
//                        <span className="text-[9px] text-gray-400 uppercase tracking-widest">Match</span>
//                     </div>
//                   </div>

//                   {/* University Badge (Using your varsity_infos JSON) */}
//                   {selectedTutor.varsity_verified && selectedTutor.varsity_infos && (
//                     <div className="bg-blue-50 border border-blue-100 p-3 rounded-xl mb-4 flex items-center gap-3">
//                       <div className="bg-blue-100 p-2 rounded-full text-blue-600">
//                         <GraduationCap size={20}/>
//                       </div>
//                       <div>
//                         <p className="text-xs font-bold text-blue-900">{selectedTutor.varsity_infos.university || "University"}</p>
//                         <p className="text-[10px] text-blue-700">
//                           {selectedTutor.varsity_infos.department} • Batch {selectedTutor.varsity_infos.batch}
//                         </p>
//                         <p className="text-[9px] text-blue-400 font-mono mt-0.5">ID: {selectedTutor.varsity_infos.student_id}</p>
//                       </div>
//                     </div>
//                   )}

//                   {/* Unverified Education Fallback */}
//                   {!selectedTutor.varsity_verified && selectedTutor.basic_info?.institution && (
//                      <div className="bg-gray-50 border border-gray-100 p-3 rounded-xl mb-4 flex items-center gap-3">
//                        <GraduationCap size={16} className="text-gray-400"/>
//                        <p className="text-xs text-gray-700">{selectedTutor.basic_info.institution}</p>
//                      </div>
//                   )}

//                   {/* Stats Grid (Salary, Subjects) */}
//                   <div className="grid grid-cols-2 gap-3 mb-4">
//                     <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
//                       <p className="text-[9px] text-gray-400 uppercase font-bold mb-1 flex items-center gap-1">
//                         <DollarSign size={10}/> Salary (Monthly)
//                       </p>
//                       <p className="text-sm font-bold text-gray-800">
//                         {selectedTutor.teaching_details?.salary_min ? `${selectedTutor.teaching_details.salary_min} - ${selectedTutor.teaching_details.salary_max}` : "Negotiable"} BDT
//                       </p>
//                     </div>
//                     <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
//                        <p className="text-[9px] text-gray-400 uppercase font-bold mb-1 flex items-center gap-1">
//                         <Clock size={10}/> Availability
//                       </p>
//                       <p className="text-sm font-bold text-gray-800">
//                         {selectedTutor.teaching_details?.days_per_week || "?"} Days/Week
//                       </p>
//                     </div>
//                   </div>

//                   {/* Subjects */}
//                   <div className="mb-4">
//                     <p className="text-[10px] text-gray-400 uppercase font-bold mb-2 flex items-center gap-1">
//                       <BookOpen size={10}/> Subjects
//                     </p>
//                     <div className="flex flex-wrap gap-1.5">
//                       {/* Handle subjects if it's an array or string */}
//                       {(() => {
//                         const subs = selectedTutor.teaching_details?.subject_pref;
//                         const subList = Array.isArray(subs) ? subs : (subs ? subs.split(',') : []);
//                         return subList.length > 0 ? subList.map((s: string, i: number) => (
//                           <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded font-medium">
//                             {s.trim()}
//                           </span>
//                         )) : <span className="text-xs text-gray-400">Not specified</span>;
//                       })()}
//                     </div>
//                   </div>

//                   {/* Bio */}
//                   {selectedTutor.bio && (
//                     <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 mb-6">
//                       <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Bio</p>
//                       <p className="text-xs text-gray-600 italic leading-relaxed">"{selectedTutor.bio}"</p>
//                     </div>
//                   )}

//                   {/* Action Button */}
//                   <button className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-all flex justify-center items-center gap-2">
//                     Start Chat Request
//                   </button>

//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }