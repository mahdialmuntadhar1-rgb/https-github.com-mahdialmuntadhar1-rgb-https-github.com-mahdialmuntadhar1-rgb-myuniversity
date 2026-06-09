import React, { useState } from 'react';
import { Post, Opportunity, Story, Institution, User } from '../../types';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Search, 
  Send, 
  Sparkles, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Plus, 
  Eye, 
  UserPlus, 
  Zap, 
  Radio, 
  Layout, 
  User as UserIcon, 
  Cpu, 
  Bell, 
  Check 
} from 'lucide-react';

interface HomeProps {
  posts: Post[];
  onLike: (id: string) => void;
  onAddComment: (id: string, text: string) => void;
  onAddPost: (content: string, tag: string, gradientSrc?: string, imageSrc?: string) => void;
  opportunities: Opportunity[];
  onApplyOpportunity: (id: string) => void;
  stories: Story[];
  onViewStory: (story: Story) => void;
  institutions: Institution[];
  currentUser: User | null;
  onLogout: () => void;
  onTriggerAuth: () => void;
  univFilter: string;
  setUnivFilter: (univ: string) => void;
  govFilter: string;
  setGovFilter: (gov: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function NeonSocialHome({
  posts,
  onLike,
  onAddComment,
  onAddPost,
  opportunities,
  onApplyOpportunity,
  stories,
  onViewStory,
  institutions,
  currentUser,
  onLogout,
  onTriggerAuth,
  univFilter,
  setUnivFilter,
  govFilter,
  setGovFilter,
  searchQuery,
  setSearchQuery
}: HomeProps) {
  const [commentInput, setCommentInput] = useState<{ [key: string]: string }>({});
  const [newPostText, setNewPostText] = useState('');
  const [newPostTag, setNewPostTag] = useState('#أكواد_برمجة');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState('bg-gradient-to-tr from-[#06B6D4] to-[#A855F7]');

  const gradients = [
    'bg-gradient-to-tr from-[#06B6D4] to-[#A855F7]',
    'bg-gradient-to-r from-[#EC4899] to-[#2563EB]',
    'bg-gradient-to-tr from-[#A855F7] via-fuchsia-500 to-[#06B6D4]',
    'bg-gradient-to-br from-[#2563EB] to-cyan-500'
  ];

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput[postId]?.trim()) return;
    onAddComment(postId, commentInput[postId]);
    setCommentInput({ ...commentInput, [postId]: '' });
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    onAddPost(newPostText, newPostTag, selectedGradient);
    setNewPostText('');
    setShowCreatePost(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-[#E2E8F0] font-sans pb-24" dir="rtl">
      {/* Absolute Neon Grid Backdrops */}
      <div className="absolute inset-x-0 top-0 h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-purple-950/20 to-transparent pointer-events-none"></div>
      
      {/* Header Banner - Neon Matrix */}
      <div className="relative overflow-hidden bg-slate-950/80 border-b border-cyan-500/20 backdrop-blur-xl py-12 md:py-20 px-4 text-center rounded-b-3xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-purple-950/80 border border-[#A855F7] text-cyan-300 px-4 py-1.5 rounded-full font-bold text-xs md:text-xs shadow-[0_0_12px_rgba(168,85,247,0.4)] mb-4 animate-bounce">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            نظام تواصل الغد لطلاب الرافدين
          </div>
          
          <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
            ساحة <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-[#2563EB]">ستودنت هاب</span> السيبرانية
          </h1>
          
          <p className="mt-4 text-sm md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            منصة تواصل تفاعلية صُممت خصّيصاً للجيل الجديد من الطلاب والمبرمجين والمبتكرين في العراق. جرب توهج المعرفة! 🧬✨
          </p>

          <div className="flex justify-center gap-6 mt-8 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 rounded-xl border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.1)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs text-slate-300 font-mono">SERVER LIVE</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/60 rounded-xl border border-fuchsia-500/30">
              <Zap className="w-3.5 h-3.5 text-fuchsia-400" />
              <span className="text-xs text-slate-300 font-mono">1.2ms LATENCY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cyber Stories row */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="text-sm font-bold tracking-widest text-[#06B6D4] uppercase flex items-center gap-2 mb-4 font-mono">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          // LIVE STORY CHANNELS [📡]
        </h2>
        
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-slate-800">
          <div className="flex-none w-24 text-center snap-start">
            <div className="relative group cursor-pointer inline-block" onClick={onTriggerAuth}>
              <div className="w-18 h-18 rounded-full bg-slate-950 border-2 border-dashed border-cyan-500 flex items-center justify-center p-0.5 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:scale-105 transition-all">
                <div className="w-full h-full rounded-full bg-[#020617] flex items-center justify-center text-cyan-400">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
              <span className="block mt-2 text-[10px] font-bold text-slate-400 font-mono">ADD NODE</span>
            </div>
          </div>

          {stories.map(story => (
            <div 
              key={story.id} 
              className="flex-none w-24 text-center snap-start"
              onClick={() => onViewStory(story)}
            >
              <div className="relative inline-block cursor-pointer group">
                <div className="w-18 h-18 rounded-full bg-slate-950 p-[2px] border border-cyan-500/20 group-hover:border-[#EC4899] transition-all group-hover:scale-110">
                  <div className="w-full h-full rounded-full bg-slate-900 p-0.5 relative">
                    <img 
                      src={story.userAvatar} 
                      alt={story.userName}
                      className="w-full h-full rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    {/* Glowing outer aura for new stories */}
                    {!story.viewed && (
                      <span className="absolute inset-0 rounded-full border border-pink-500 animate-ping opacity-60"></span>
                    )}
                  </div>
                </div>
                {!story.viewed && (
                  <span className="absolute bottom-1 right-2 bg-[#EC4899] text-white text-[8px] font-black px-1 rounded shadow-[0_0_8px_rgba(236,72,153,0.8)]">
                    ONLINE
                  </span>
                )}
                <span className="block mt-2 text-[11px] font-bold text-slate-200 line-clamp-1 group-hover:text-cyan-400 font-sans">
                  {story.userName}
                </span>
                <span className="block text-[8px] font-mono text-slate-500">
                  {story.university.split(' ')[1] || story.university}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid container */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RIGHT SIDEBAR with neon glow boxes */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.05)]">
            <h3 className="font-mono text-xs font-black tracking-widest text-[#06B6D4] mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#06B6D4]" />
              _FILTER SYSTEM [⚙️]
            </h3>

            {/* Neon search */}
            <div className="relative mb-5">
              <input
                type="text"
                placeholder="ابحث في مصفوفة ستودنت هاب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-[#020617]/90 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs font-mono"
              />
              <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-slate-500" />
            </div>

            {/* University filters */}
            <div className="mb-4">
              <label className="block text-[10px] font-mono text-slate-400 mb-2">FILTER_UNIVERSITY:</label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                <button
                  onClick={() => setUnivFilter('')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono border transition-all cursor-pointer ${
                    univFilter === ''
                      ? 'bg-[#06B6D4] text-slate-950 border-[#06B6D4] shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                      : 'bg-slate-900 text-slate-405 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  ALL_UNIV
                </button>
                {['جامعة بغداد', 'جامعة النهرين', 'الجامعة التكنولوجية', 'جامعة تيشك الدولية', 'جامعة السليمانية', 'جامعة بابل'].map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnivFilter(univFilter === u ? '' : u)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono border transition-all cursor-pointer ${
                      univFilter === u
                        ? 'bg-[#A855F7] text-white border-[#A855F7] shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                        : 'bg-slate-900/60 text-slate-400 border-slate-850 hover:border-cyan-500/40'
                    }`}
                  >
                    {u.split(' ')[1] || u}
                  </button>
                ))}
              </div>
            </div>

            {/* Governorate filter */}
            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1.5">MAP_LOCATION:</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setGovFilter('')}
                  className={`px-3 py-1 rounded-lg text-[10px] font-mono border transition-all cursor-pointer ${
                    govFilter === ''
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  IRAQ_GOV
                </button>
                {['بغداد', 'أربيل', 'البصرة', 'السليمانية'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGovFilter(govFilter === g ? '' : g)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono border transition-all cursor-pointer ${
                      govFilter === g
                        ? 'bg-[#EC4899] text-white border-[#EC4899] shadow-[0_0_10px_rgba(236,72,153,0.4)]'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-cyan-500/30'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Create Post Action button glowing */}
          <div className="p-0.5 rounded-2xl bg-gradient-to-tr from-[#06B6D4] via-[#A855F7] to-[#EC4899] shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <div className="bg-slate-950 p-6 rounded-[14px]">
              <h3 className="font-mono text-xs text-[#EC4899] mb-2 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400 animate-bounce" />
                CREATE_NEW_POST
              </h3>
              <p className="text-xs text-slate-400 mb-4 leading-relaxed font-sans">
                انشر كود، مشروع، تساءل علمي، أو شارك الأجواء في حرم كليتكم بضغطة زر.
              </p>
              <button
                onClick={() => {
                  if (!currentUser) onTriggerAuth();
                  else setShowCreatePost(!showCreatePost);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-[#A855F7] cursor-pointer hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] active:scale-95 transition-all text-center block"
              >
                {showCreatePost ? 'إغلاق المحرر ✕' : '🦾 بث رد سيبراني'}
              </button>
            </div>
          </div>

          {/* Connected Hubs */}
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800">
            <h3 className="font-mono text-[10px] tracking-wider text-slate-400 mb-3 uppercase">// VERIFIED_CHANNELS [🎖️]</h3>
            <div className="space-y-3">
              {institutions.map(inst => (
                <div key={inst.id} className="flex items-center gap-3 p-2 bg-slate-900/40 rounded-xl border border-slate-850 hover:border-cyan-500/20 transition-all">
                  <img 
                    src={inst.logo} 
                    alt={inst.name}
                    className="w-9 h-9 rounded-lg object-cover border border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-200 truncate">{inst.name}</h4>
                    <p className="text-[9px] text-slate-500 font-mono">NODE: {inst.location} • CLI</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEED & OPPORTUNITIES */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Reactive Post Composer */}
          {showCreatePost && (
            <div className="bg-slate-950 p-6 rounded-2xl border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)] animate-fadeIn">
              <h4 className="font-mono text-xs text-[#06B6D4] mb-3 uppercase">// TERMINAL_REPLY_INPUT_STREAM</h4>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <textarea
                  placeholder="اكتب ردك السيبراني... استخدم لغة واضحة"
                  rows={3}
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full p-4 rounded-xl border border-slate-800 bg-[#020617] text-slate-200 text-xs focus:outline-none focus:border-cyan-400 font-sans"
                  required
                />
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500">TAG:</span>
                    <select
                      value={newPostTag}
                      onChange={(e) => setNewPostTag(e.target.value)}
                      className="text-[10px] font-mono bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg text-slate-300"
                    >
                      <option value="#أكواد_برمجة">#أكواد_برمجة</option>
                      <option value="#طلب_معونة">#طلب_معونة</option>
                      <option value="#هاكاثون">#هاكاثون</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    {gradients.map((g, ind) => (
                      <button
                        type="button"
                        key={ind}
                        onClick={() => setSelectedGradient(g)}
                        className={`w-5 h-5 rounded-full border border-slate-800 ${g} ${selectedGradient === g ? 'ring-2 ring-cyan-400 scale-110' : ''}`}
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    BROADCAST
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Cyber Opportunities Grid */}
          <div>
            <h2 className="text-sm font-bold tracking-widest text-[#A855F7] uppercase flex items-center gap-2 mb-4 font-mono">
              <Award className="w-5 h-5 text-fuchsia-400" />
              // ACCESSIBLE_OPPORTUNITIES_STREAM [💡]
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opportunities.map(op => (
                <div 
                  key={op.id}
                  className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <span className="bg-cyan-950 text-cyan-400 text-[8px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border border-cyan-800/40">
                        {op.type}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500">
                        // EXP: {op.deadline.includes('أيام') ? 'URGENT' : 'OPEN'}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-200 mt-3 hover:text-cyan-400 transition-colors">
                      {op.title}
                    </h3>
                    
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 font-sans">
                      <span className="text-fuchsia-400">⚡</span>
                      <span>{op.institution}</span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {op.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] font-mono bg-[#020617] text-slate-400 px-2 py-0.5 rounded border border-slate-900">
                          #{tag.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
                    <span className="text-[9px] text-slate-500 font-mono">
                      LAT: {op.location.split('،')[0]}
                    </span>

                    <button
                      onClick={() => onApplyOpportunity(op.id)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all cursor-pointer ${
                        op.applied
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800'
                          : 'bg-[#9333EA] text-white hover:bg-fuchsia-600 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                      }`}
                    >
                      {op.applied ? (
                        <span className="flex items-center gap-1 font-mono">// APPLIED ✓</span>
                      ) : 'CONNECT NODE 🦾'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social feed */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-widest text-[#06B6D4] uppercase flex items-center gap-2 font-mono">
                <Radio className="w-4 h-4 text-[#06B6D4] animate-pulse" />
                // NETWORK_COMMUNITY_FEED [🖧]
              </h2>
              {/* Reset filter badge if any active */}
              {(univFilter || govFilter || searchQuery) && (
                <button 
                  onClick={() => { setUnivFilter(''); setGovFilter(''); setSearchQuery(''); }}
                  className="text-xs text-[#EC4899] font-mono underline hover:text-pink-400 cursor-pointer"
                >
                  // FORCE_RESET
                </button>
              )}
            </div>

            {posts.length === 0 ? (
              <div className="bg-slate-950/80 p-12 text-center rounded-2xl border border-dashed border-slate-800">
                <p className="text-slate-400 font-mono text-sm">// NO_RECORDS_FOUND_IN_MATRIX</p>
                <p className="text-[10px] text-slate-600 mt-1">جرب إزالة معايير البحث والفرز لتظهر البيانات</p>
              </div>
            ) : (
              posts.map(post => {
                return (
                  <div 
                    key={post.id}
                    className="bg-slate-950/70 rounded-2xl border border-slate-800 hover:border-cyan-500/20 transition-all overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-4 md:p-5 flex items-center justify-between border-b border-slate-900 bg-slate-950/90">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-800"
                            referrerPolicy="no-referrer"
                          />
                          {post.author.verified && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border border-slate-950 flex items-center justify-center text-[6px] text-slate-950 font-black">✓</span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-white">{post.author.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[9px] text-[#06B6D4] mt-0.5 font-mono">
                            <span className="bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/20">
                              {post.author.university}
                            </span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-400">{post.author.governorate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left font-mono">
                        <span className="text-[9px] text-slate-500 block">{post.createdAt}</span>
                        <span className="text-[8px] text-[#A855F7] tracking-wider font-extrabold uppercase mt-1 inline-block">
                          {post.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-xs md:text-sm text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                        {post.content}
                      </p>

                      {post.imageUrl ? (
                        <div className="mt-4 rounded-xl overflow-hidden border border-slate-800">
                          <img 
                            src={post.imageUrl} 
                            alt="Post Media"
                            className="w-full max-h-64 object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        post.gradientStyle && (
                          <div className={`mt-4 h-28 rounded-xl ${post.gradientStyle} p-4 flex flex-col justify-end border border-slate-800 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]`}>
                            <p className="font-bold text-white text-xs leading-normal">
                              {post.content}
                            </p>
                            <span className="text-[8px] font-mono text-cyan-200 mt-2 block tracking-widest">// DECRYPTED_MEMO_STATION</span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Stats metrics */}
                    <div className="px-5 py-2.5 bg-slate-950/25 border-y border-slate-900 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span className="flex items-center gap-1 text-[#EC4899]">
                        <Heart className="w-3.5 h-3.5 fill-current" /> {post.likes} CODES
                      </span>
                      <span>{post.comments.length} REPLY_THREADS</span>
                    </div>

                    {/* Interactive inline actions */}
                    <div className="px-2 py-1.5 bg-[#020617]/40 flex items-center justify-around gap-1">
                      <button 
                        onClick={() => onLike(post.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-bold font-mono transition-all cursor-pointer ${
                          post.hasLiked 
                            ? 'bg-[#EC4899] text-white shadow-[0_0_10px_rgba(236,72,153,0.4)]' 
                            : 'text-[#EC4899] hover:bg-pink-950/30'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${post.hasLiked ? 'fill-white' : ''}`} />
                        <span>LIKE</span>
                      </button>

                      <button 
                        onClick={() => {
                          const inp = document.getElementById(`reply-matrix-${post.id}`);
                          inp?.scrollIntoView({ behavior: 'smooth' });
                          inp?.focus();
                        }}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[10px] font-bold font-mono text-cyan-400 hover:bg-cyan-950/40 cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>REPLY ({post.comments.length})</span>
                      </button>

                      <button 
                        onClick={() => alert('تم النسخ للتخزين المؤقت السيبراني!')}
                        className="flex-none px-3 py-1.5 rounded-lg text-[10px] font-mono text-slate-500 hover:bg-slate-900 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Replies feed list */}
                    <div className="bg-[#020617]/50 border-t border-slate-900 p-4 space-y-3">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="flex gap-3 text-[11px] font-mono">
                          <img 
                            src={comment.authorAvatar} 
                            alt={comment.authorName}
                            className="w-7 h-7 rounded object-cover border border-slate-800"
                            referrerPolicy="no-referrer"
                          />
                          <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl flex-1 text-slate-300">
                            <div className="flex items-center justify-between mb-1 text-[9px] text-slate-400">
                              <span className="font-bold text-white">{comment.authorName}</span>
                              <span className="text-cyan-400">
                                {comment.authorUniversity.substring(5, 12)}...
                              </span>
                            </div>
                            <p className="text-slate-300 font-sans text-xs">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Comment submission form */}
                      <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="flex gap-2">
                        <input
                          id={`reply-matrix-${post.id}`}
                          type="text"
                          placeholder={currentUser ? "اكتب حزمتك الردية هنا..." : "سجل الدخول للمصفوفة لكتابة تعليقات"}
                          value={commentInput[post.id] || ''}
                          onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                          disabled={!currentUser}
                          className="flex-1 bg-slate-950 text-xs px-3 py-2 rounded-lg border border-slate-800 text-slate-200 focus:outline-none focus:border-[#EC4899] disabled:opacity-40"
                        />
                        <button
                          type="submit"
                          disabled={!currentUser}
                          className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 p-2 rounded-lg border-none shadow transition-all cursor-pointer disabled:opacity-30"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
