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
  ChevronRight, 
  Terminal, 
  Activity, 
  BookOpen, 
  Users, 
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

export default function FutureCampusHome({
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
  const [newPostTag, setNewPostTag] = useState('#ذكاء_اصطناعي');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState('bg-gradient-to-tr from-indigo-500 to-cyan-500');

  const gradients = [
    'bg-gradient-to-tr from-indigo-500 to-cyan-500',
    'bg-gradient-to-br from-[#84CC16]/60 to-indigo-600',
    'bg-gradient-to-tr from-cyan-400 via-blue-500 to-[#84CC16]',
    'bg-slate-900/10'
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24" dir="rtl">
      {/* Futurist Poly Hero Canvas */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-cyan-900 py-12 md:py-20 px-6 text-white rounded-b-[2rem] border-b-4 border-[#84CC16] shadow-md">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          <div className="text-right space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#84CC16] text-[#0F172A] px-3.5 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider shadow">
              <Sparkles className="w-3.5 h-3.5 text-[#0F172A] animate-spin" />
              منظومة التعلم الذكي التفاعلي 2.0
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              نحو حقبة جديدة من <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-lime-300 to-indigo-300">التمكين الأكاديمي والمهاري</span>
            </h1>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans max-w-xl">
              تطبيق الساحة الطلابية يدمج الذكاء الرقمي لتبسيط الوصول إلى فرص التدريب الصيفي، المنافسات التقنية، وورش العمل في شتى المجالات العلمية داخل العراق.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <button 
                onClick={onTriggerAuth}
                className="bg-[#06B6D4] hover:bg-cyan-600 text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all hover:translate-y-[-1px]"
              >
                دخول نظام التعلم
                <ChevronRight className="w-4 h-4 turn-180" />
              </button>
            </div>
          </div>

          {/* Futurist Stats Panel */}
          <div className="w-full md:w-80 bg-slate-950/40 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <span className="text-xs font-mono text-cyan-400">⚡ LIVE_DATA STREAM</span>
              <Activity className="w-4 h-4 text-[#84CC16] animate-pulse" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                <span className="block text-lg font-black text-[#84CC16]">٥٢٠</span>
                <span className="text-[9px] text-slate-400 font-bold block">مخطط تدريبي</span>
              </div>
              <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                <span className="block text-lg font-black text-white">١٨+ ألف</span>
                <span className="text-[9px] text-slate-400 font-bold block">طالب مسجل</span>
              </div>
            </div>

            <div className="p-2.5 bg-cyan-950/20 text-[10px] rounded-lg border border-cyan-800/20 text-cyan-300 font-bold flex items-center justify-center gap-1.5 leading-normal">
              <Terminal className="w-3.5 h-3.5 text-[#84CC16]" />
              تم التحديث التلقائي للمنصة بنجاح
            </div>
          </div>

        </div>
      </div>

      {/* Modern Round stories */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-4">
          <BookOpen className="w-4 h-4 text-indigo-500" />
          قنوات البث الطلابي النشطة اليوم
        </h2>
        
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x">
          {/* Add story node */}
          <div className="flex-none w-20 text-center snap-start">
            <div className="relative group cursor-pointer inline-block" onClick={onTriggerAuth}>
              <div className="w-14 h-14 rounded-xl bg-white border border-dashed border-indigo-400 flex items-center justify-center p-0.5 group-hover:scale-105 transition-all">
                <div className="w-full h-full rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
              <span className="block mt-1.5 text-[10px] font-bold text-slate-500">مشاركة</span>
            </div>
          </div>

          {stories.map(story => (
            <div 
              key={story.id} 
              onClick={() => onViewStory(story)}
              className="flex-none w-20 text-center snap-start group cursor-pointer"
            >
              <div className="relative inline-block">
                <div className="w-14 h-14 rounded-xl p-[2px] bg-gradient-to-tr from-indigo-500 to-cyan-400 group-hover:scale-105 transition-all shadow-xs">
                  <img 
                    src={story.userAvatar} 
                    alt={story.userName}
                    className="w-full h-full rounded-lg object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="block mt-1.5 text-[10px] font-bold text-slate-800 truncate">{story.userName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid container */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RIGHT BAR */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <h3 className="font-extrabold text-sm text-[#0F172A] mb-4 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-indigo-500" />
              نظام فرز مستودع البيانات
            </h3>

            {/* Smart search */}
            <div className="relative mb-5">
              <input
                type="text"
                placeholder="ادخل المهارة، الجامعة أو المحافظة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-sans focus:outline-none focus:border-indigo-500"
              />
              <Search className="absolute right-3.5 top-2.5 w-4 h-4 text-slate-400" />
            </div>

            {/* University */}
            <div className="mb-4">
              <label className="block text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wide">ترشيح المنشأة الأكاديمية</label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                <button
                  onClick={() => setUnivFilter('')}
                  className={`px-3 py-1 rounded-md text-[10px] font-black border transition-all cursor-pointer ${
                    univFilter === ''
                      ? 'bg-indigo-600 border-transparent text-white'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  جميعها
                </button>
                {['جامعة بغداد', 'جامعة النهرين', 'الجامعة التكنولوجية', 'جامعة تيشك الدولية', 'جامعة السليمانية', 'جامعة بابل'].map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnivFilter(univFilter === u ? '' : u)}
                    className={`px-3 py-1 rounded-md text-[10px] font-black border transition-all cursor-pointer ${
                      univFilter === u
                        ? 'bg-cyan-500 border-transparent text-slate-950'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-500'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Gov selection */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">المنطقة الجغرافية</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setGovFilter('')}
                  className={`px-3 py-1 rounded-md text-[10px] font-black border transition-all cursor-pointer ${
                    govFilter === ''
                      ? 'bg-slate-900 border-transparent text-white'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  العراق عامة
                </button>
                {['بغداد', 'أربيل', 'البصرة', 'السليمانية'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGovFilter(govFilter === g ? '' : g)}
                    className={`px-3 py-1 rounded-md text-[10px] font-black border transition-all cursor-pointer ${
                      govFilter === g
                        ? 'bg-[#84CC16] border-transparent text-slate-950'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action composer */}
          <div className="bg-indigo-950 text-white p-6 rounded-2xl border border-indigo-900 shadow-sm">
            <h4 className="font-extrabold text-sm text-lime-400 mb-1 flex items-center gap-1">
              <Terminal className="w-4 h-4" />
              لوحة التحكم والمشاركة
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed font-sans">
              اطلب المساعدة، تبنى نقاشات الكود، أو أسس مشاريع الهوايات مع زملائك في باقي الكليات العراقية بسلام.
            </p>
            <button
              onClick={() => {
                if (!currentUser) onTriggerAuth();
                else setShowCreatePost(!showCreatePost);
              }}
              className="w-full bg-[#84CC16] hover:bg-lime-500 text-slate-950 font-extrabold text-xs py-2.5 rounded-lg cursor-pointer text-center block transition-all"
            >
              {showCreatePost ? 'إلغلاق النشر' : '✍️ إنشاء مستند نقاش طلابي'}
            </button>
          </div>

          {/* Channels */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <h4 className="text-[10px] font-bold text-slate-400 mb-3 tracking-wide uppercase">قائمة المنظمات الشريكة</h4>
            <div className="space-y-3">
              {institutions.map(inst => (
                <div key={inst.id} className="flex items-center gap-3">
                  <img 
                    src={inst.logo} 
                    alt={inst.name}
                    className="w-8 h-8 rounded-lg object-cover border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-slate-800 truncate">{inst.name}</h5>
                    <p className="text-[9px] text-slate-400">{inst.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEED & OPPORTUNITIES */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Post composer */}
          {showCreatePost && (
            <div className="bg-white p-6 rounded-2xl border border-indigo-400 shadow-sm animate-fadeIn">
              <h4 className="font-extrabold text-sm text-indigo-950 mb-3 block">بث موضوع دراسي لطلاب العراق:</h4>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <textarea
                  placeholder="مساهمة جديدة في ملقى هاب..."
                  rows={3}
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {gradients.map((g, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setSelectedGradient(g)}
                        className={`w-5 h-5 rounded-md border border-slate-200 ${g} ${selectedGradient === g ? 'ring-2 ring-indigo-500' : ''}`}
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold px-4 py-2 rounded-lg cursor-pointer"
                  >
                    نشر البيانات
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Futuristic Opportunities */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-4">
              <Award className="w-4 h-4 text-[#06B6D4]" />
              الفرص الأكثر تنافسية وقيمة
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opportunities.map(op => (
                <div 
                  key={op.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <span className="bg-indigo-50 text-indigo-700 text-[9px] font-black px-2.5 py-0.5 rounded-full border border-indigo-100">
                        {op.type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">{op.deadline}</span>
                    </div>

                    <h3 className="font-extrabold text-sm text-slate-900 mt-3.5 leading-snug hover:text-indigo-600 transition-colors">
                      {op.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                      <span>⚡ {op.institution}</span>
                    </p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {op.tags.map((tag, i) => (
                        <span key={i} className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {op.location.split('،')[0]}
                    </span>

                    <button
                      onClick={() => onApplyOpportunity(op.id)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-black cursor-pointer transition-all ${
                        op.applied
                          ? 'bg-emerald-50 text-[#10B981] border border-emerald-200'
                          : 'bg-[#84CC16] hover:bg-lime-500 text-slate-950 border border-transparent shadow-xs'
                      }`}
                    >
                      {op.applied ? '✓ تم إرسال الطلب' : 'تقديم مباشر 🚀'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-500" />
                سجل النقاشات والأبحاث الطلابية المشتركة
              </h2>
            </div>

            {posts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400">
                <p className="text-xs">عفواً، لا توجد منشورات دراسية بهذا التبويب حالياً.</p>
              </div>
            ) : (
              posts.map(post => {
                return (
                  <div 
                    key={post.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-350 transition-colors text-right overflow-hidden"
                  >
                    {/* Authorship */}
                    <div className="p-4 md:p-5 flex items-center justify-between bg-slate-50/50 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-extrabold text-[#111827] text-xs">{post.author.name}</span>
                            {post.author.verified && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                          </div>
                          <span className="block text-[10px] text-slate-400 mt-0.5">
                            {post.author.university} • {post.author.governorate}
                          </span>
                        </div>
                      </div>

                      <div className="text-left">
                        <span className="text-[10px] text-slate-402 block font-mono">{post.createdAt}</span>
                        <span className="text-[9px] font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mt-1.5 inline-block border border-indigo-100">
                          {post.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content text */}
                    <div className="p-5 space-y-4">
                      <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-wrap font-sans">
                        {post.content}
                      </p>

                      {post.imageUrl ? (
                        <div className="rounded-xl overflow-hidden border border-slate-200">
                          <img 
                            src={post.imageUrl} 
                            alt="Visual Attachment"
                            className="w-full max-h-60 object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        post.gradientStyle && (
                          <div className={`p-5 rounded-xl ${post.gradientStyle} text-white flex flex-col justify-between h-24 shadow-sm`}>
                            <p className="font-extrabold text-xs text-white/95 line-clamp-1">{post.content}</p>
                            <span className="text-[8px] font-mono text-lime-300 block tracking-wider">// FUTURE_EDUCATION_DOME 🛸</span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Action counts bar */}
                    <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-bold bg-slate-50/30">
                      
                      <button 
                        onClick={() => onLike(post.id)}
                        className={`flex items-center gap-1.5 cursor-pointer ${post.hasLiked ? 'text-indigo-600 font-extrabold' : 'hover:text-indigo-600'}`}
                      >
                        <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                        <span>أعجبني ({post.likes})</span>
                      </button>

                      <button 
                        onClick={() => {
                          const inp = document.getElementById(`future-comment-${post.id}`);
                          inp?.focus();
                        }}
                        className="flex items-center gap-1.5 hover:text-indigo-600 cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>التعليقات ({post.comments.length})</span>
                      </button>

                      <button 
                        onClick={() => alert('تم النسخ من لوحة التحكم 🛸')}
                        className="hover:text-slate-900 cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Comments block */}
                    <div className="bg-slate-50/50 border-t border-slate-100 p-4 space-y-3">
                      {post.comments.map(c => (
                        <div key={c.id} className="flex gap-3 text-xs text-slate-700">
                          <img 
                            src={c.authorAvatar} 
                            alt={c.authorName}
                            className="w-7 h-7 rounded-lg object-cover flex-none"
                            referrerPolicy="no-referrer"
                          />
                          <div className="bg-white border border-slate-200 p-3 rounded-lg flex-1">
                            <div className="flex items-center justify-between mb-1 text-[10px] font-bold text-slate-800">
                              <span>{c.authorName}</span>
                              <span className="text-indigo-500 font-normal">{c.authorUniversity}</span>
                            </div>
                            <p className="text-slate-700 leading-normal text-[11px] md:text-xs">
                              {c.content}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Comment typing */}
                      <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="flex gap-2">
                        <input
                          id={`future-comment-${post.id}`}
                          type="text"
                          placeholder={currentUser ? "اكتب مساهمتك البنّاءة..." : "سجل الدخول للمناقشة"}
                          value={commentInput[post.id] || ''}
                          onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                          disabled={!currentUser}
                          className="flex-1 bg-white text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 disabled:bg-slate-50"
                        />
                        <button
                          type="submit"
                          disabled={!currentUser}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg border-none shadow transition-all cursor-pointer disabled:opacity-30"
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
