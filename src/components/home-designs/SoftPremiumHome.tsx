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
  Filter, 
  Layers, 
  Compass, 
  ArrowUpRight, 
  TrendingUp, 
  Check, 
  ShieldCheck 
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

export default function SoftPremiumHome({
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
  const [newPostTag, setNewPostTag] = useState('#أكاديمي');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState('bg-gradient-to-r from-slate-100 to-slate-200');

  const gradients = [
    'bg-gradient-to-r from-[#1D4ED8]/10 via-[#7C3AED]/5 to-slate-100',
    'bg-gradient-to-br from-emerald-500/10 to-teal-500/10',
    'bg-gradient-to-r from-[#7C3AED]/20 to-[#1D4ED8]/10',
    'bg-slate-50'
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans pb-24" dir="rtl">
      {/* Editorial Corporate Header Banner */}
      <div className="bg-white border-b border-slate-150 py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 text-right space-y-4">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              منصة رسمية معتمدة للجامعات العراقية
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              فضاء المعرفة الأكاديمية <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D4ED8] to-[#7C3AED]">والتوجيه الطلابي المتكامل</span>
            </h1>

            <p className="text-sm md:text-base text-slate-500 max-w-2xl leading-relaxed">
              نوفر لطلاب البكالوريوس والدراسات العليا بيئة تواصل مهنية رصينة لمشاركة التساؤلات العلمية، وعرض الفرص المتاحة ومبادرات القطاع التكنولوجي الحكومي والخاص.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button 
                onClick={onTriggerAuth}
                className="bg-[#1D4ED8] hover:bg-[#153eb3] text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-transform hover:scale-101 flex items-center gap-1 shadow-sm cursor-pointer"
              >
                بوابة التقديم الذكي
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  const target = document.getElementById('opp-feed');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-5 py-2.5 rounded-lg transition-all cursor-pointer"
              >
                تصفح منح التدريب
              </button>
            </div>
          </div>

          <div className="md:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-250/60 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#0F172A] border-b border-slate-200 pb-2">نشرة الأحداث السريعة</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8] mt-1.5 flex-none" />
                <p className="text-slate-600 leading-normal"><strong>٢٣ يونيو:</strong> ورشة الحاضنة الرقمية بوزارة الصناعة.</p>
              </li>
              <li className="flex items-start gap-2.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-none" />
                <p className="text-slate-600 leading-normal"><strong>مفتوح:</strong> منحة التدريب الصيفي مع اسيا سيل.</p>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Elegant minimalist stories */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-4">
          <TrendingUp className="w-4 h-4 text-[#1D4ED8]" />
          مشاركات اليوم الصباحية
        </h2>
        
        <div className="flex gap-5 overflow-x-auto pb-3 pt-1">
          {/* Create story trigger */}
          <div 
            onClick={onTriggerAuth}
            className="flex-none flex items-center gap-3 p-2.5 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-[#1D4ED8] transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#1D4ED8]">
              <Plus className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-right">
              <span className="block text-xs font-bold text-slate-800">إضافة حكاية</span>
              <span className="block text-[10px] text-slate-400">خاصة بك اليوم</span>
            </div>
          </div>

          {stories.map(story => (
            <div 
              key={story.id}
              onClick={() => onViewStory(story)}
              className="flex-none flex items-center gap-3 p-2.5 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:scale-101 hover:shadow-xs transition-transform"
            >
              <img 
                src={story.userAvatar} 
                alt={story.userName}
                className="w-10 h-10 rounded-full object-cover border border-slate-300"
                referrerPolicy="no-referrer"
              />
              <div className="text-right">
                <span className="block text-xs font-bold text-slate-800">{story.userName}</span>
                <span className="block text-[10px] text-slate-400 font-medium">
                  {story.university.split(' ')[1] || story.university}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid wrapper */}
      <div className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RIGHT BAR - Minimalist Filtering and Tags */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-right">
            <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#1D4ED8]" />
              أدوات البحث والفرز الدقيق
            </h3>

            {/* Premium minimal search */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="ابحث بالاسم، الجامعة، الموضوع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs leading-none focus:outline-none focus:bg-white focus:border-[#1D4ED8]"
              />
              <Search className="absolute right-3.5 top-2.5 w-4 h-4 text-slate-400" />
            </div>

            {/* University filters */}
            <div className="mb-5">
              <label className="block text-[10px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">الترشيح حسب الجامعة</label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                <button
                  onClick={() => setUnivFilter('')}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all border cursor-pointer ${
                    univFilter === ''
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  جميع الجامعات
                </button>
                {['جامعة بغداد', 'جامعة النهرين', 'الجامعة التكنولوجية', 'جامعة تيشك الدولية', 'جامعة السليمانية', 'جامعة بابل'].map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnivFilter(univFilter === u ? '' : u)}
                    className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all border cursor-pointer ${
                      univFilter === u
                        ? 'bg-[#1D4ED8] border-[#1D4ED8] text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Gov selection */}
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">الترشيح حسب المحافظة</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setGovFilter('')}
                  className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all border cursor-pointer ${
                    govFilter === ''
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  كل العراق
                </button>
                {['بغداد', 'أربيل', 'البصرة', 'السليمانية'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGovFilter(govFilter === g ? '' : g)}
                    className={`px-3 py-1 rounded-md text-[11px] font-medium transition-all border cursor-pointer ${
                      govFilter === g
                        ? 'bg-[#7C3AED] border-[#7C3AED] text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Minimal compose box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-xs text-slate-400 mb-2 uppercase tracking-wide">صناعة المحتوى</h4>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              شارك تدوينات، استفسارات، أو عروض صيفية في الساحات العامة بكل ثقة ومصداقية.
            </p>
            <button
              onClick={() => {
                if (!currentUser) onTriggerAuth();
                else setShowCreatePost(!showCreatePost);
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-lg cursor-pointer text-center block"
            >
              {showCreatePost ? 'إغلاق المحرر' : 'كتابة تدوينة رسمية'}
            </button>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-right">
            <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-wide">الشركاء الأكاديميين</h4>
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
                    <p className="text-[10px] text-slate-400">{inst.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEED & OPPORTUNITIES */}
        <div id="opp-feed" className="lg:col-span-8 space-y-8">
          
          {/* Reactive Post Composer */}
          {showCreatePost && (
            <div className="bg-white p-6 rounded-2xl border border-slate-250 shadow-xs animate-fadeIn">
              <h4 className="font-bold text-sm text-[#0F172A] mb-3">محرر التدوين الأكاديمي</h4>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <textarea
                  placeholder="ادخل نص التدوينة هنا..."
                  rows={3}
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#1D4ED8]"
                  required
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {gradients.map((g, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setSelectedGradient(g)}
                        className={`w-5 h-5 rounded-md border border-slate-200 ${g} ${selectedGradient === g ? 'ring-2 ring-[#1D4ED8]' : ''}`}
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="bg-[#1D4ED8] hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg cursor-pointer"
                  >
                    بث التدوينة
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Minimal Opportunities Row */}
          <div>
            <h2 className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wide">
              <Award className="w-4 h-4 text-emerald-500" />
              الفرص المهنية والأكاديمية المعروضة
            </h2>
            <div className="space-y-3">
              {opportunities.map(op => (
                <div 
                  key={op.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <img 
                      src={op.logo} 
                      alt={op.institution}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-none"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-[#1D4ED8]/10 text-[#1D4ED8] px-2.5 py-0.5 rounded">
                          {op.type}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">{op.deadline}</span>
                      </div>
                      
                      <h3 className="font-bold text-sm text-slate-900 mt-1 hover:text-[#1D4ED8] cursor-pointer">
                        {op.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">{op.institution} • {op.location}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onApplyOpportunity(op.id)}
                    className={`py-2 px-4 rounded-lg text-xs font-semibold cursor-pointer border transition-all md:self-center ${
                      op.applied
                        ? 'bg-slate-100 text-slate-500 border-transparent'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 hover:border-slate-400 shadow-xs'
                    }`}
                  >
                    {op.applied ? '✓ تم التقديم' : 'تقديم مباشر'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Elegant Posts Feed */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wide">
                <Compass className="w-4 h-4 text-[#1D4ED8]" />
                مستندات النقاش الطلابي في العراق
              </h2>
            </div>

            {posts.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-400">
                <p className="text-xs">لم يُعثر على تدوينات تطابق اختياراتك حالياً.</p>
              </div>
            ) : (
              posts.map(post => {
                return (
                  <div 
                    key={post.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs text-right overflow-hidden"
                  >
                    {/* Authorship Row */}
                    <div className="p-5 flex items-center justify-between border-b border-slate-100 bg-slate-50/40">
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-semibold text-xs text-slate-900">{post.author.name}</span>
                            {post.author.verified && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                          </div>
                          <span className="block text-[10px] text-slate-400 mt-0.5">
                            {post.author.university} • {post.author.governorate}
                          </span>
                        </div>
                      </div>

                      <div className="text-left">
                        <span className="text-[10px] text-slate-405 block font-medium">{post.createdAt}</span>
                        <span className="text-[9px] font-bold text-[#1D4ED8] bg-[#1D4ED8]/10 px-2.5 py-0.5 rounded-full mt-1.5 inline-block">
                          {post.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content text */}
                    <div className="p-5 space-y-4">
                      <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-wrap">
                        {post.content}
                      </p>

                      {post.imageUrl ? (
                        <div className="rounded-xl overflow-hidden border border-slate-150">
                          <img 
                            src={post.imageUrl} 
                            alt="Media attachment"
                            className="w-full max-h-60 object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        post.gradientStyle && (
                          <div className={`p-5 rounded-xl ${post.gradientStyle} border border-slate-150 text-slate-800 flex flex-col justify-between h-24`}>
                            <p className="font-semibold text-xs text-slate-900 line-clamp-1">{post.content}</p>
                            <span className="text-[8px] font-bold text-slate-500 block">OFFICIAL PAPER DOC STATION ⚜️</span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Action buttons (quiet luxury style) */}
                    <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium bg-slate-50/10">
                      
                      <button 
                        onClick={() => onLike(post.id)}
                        className={`flex items-center gap-1.5 transition-all cursor-pointer ${post.hasLiked ? 'text-red-600 font-bold' : 'hover:text-slate-900'}`}
                      >
                        <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-red-600 text-red-600' : ''}`} />
                        <span>أعجبني ({post.likes})</span>
                      </button>

                      <button 
                        onClick={() => {
                          const inp = document.getElementById(`premium-comment-box-${post.id}`);
                          inp?.focus();
                        }}
                        className="flex items-center gap-1.5 hover:text-[#1D4ED8] transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>التعليقات ({post.comments.length})</span>
                      </button>

                      <button 
                        onClick={() => alert('تم نسخ المستند للمشاركة 📬')}
                        className="hover:text-slate-900 cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Inline comment details */}
                    <div className="bg-slate-50/50 border-t border-slate-100 p-4 space-y-3">
                      {post.comments.map(c => (
                        <div key={c.id} className="flex gap-3 text-xs text-slate-600">
                          <img 
                            src={c.authorAvatar} 
                            alt={c.authorName}
                            className="w-7 h-7 rounded-full object-cover flex-none"
                            referrerPolicy="no-referrer"
                          />
                          <div className="bg-white border border-slate-200/80 p-3 rounded-lg flex-1">
                            <div className="flex items-center justify-between mb-1 text-[10px] font-bold text-slate-700">
                              <span>{c.authorName}</span>
                              <span className="text-slate-400 font-normal">{c.authorUniversity}</span>
                            </div>
                            <p className="text-slate-600 leading-normal text-[11px] md:text-xs">
                              {c.content}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Add comment inside feed */}
                      <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="flex gap-2">
                        <input
                          id={`premium-comment-box-${post.id}`}
                          type="text"
                          placeholder={currentUser ? "أضف كلمتك الصادقة..." : "سجل الدخول للمناقشة"}
                          value={commentInput[post.id] || ''}
                          onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                          disabled={!currentUser}
                          className="flex-1 bg-white text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1D4ED8] disabled:bg-slate-50"
                        />
                        <button
                          type="submit"
                          disabled={!currentUser}
                          className="bg-[#1D4ED8] hover:bg-blue-700 text-white p-2 rounded-lg cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 border border-slate-200"
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
