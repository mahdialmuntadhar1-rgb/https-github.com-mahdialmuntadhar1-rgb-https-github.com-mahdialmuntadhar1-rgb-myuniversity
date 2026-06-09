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
  Home, 
  Flag, 
  Milestone, 
  BookOpen, 
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

export default function IraqiYouthHome({
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
  const [newPostTag, setNewPostTag] = useState('#شبابنا_الطيبين');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState('bg-gradient-to-tr from-orange-400 via-amber-400 to-teal-400');

  const gradients = [
    'bg-gradient-to-tr from-orange-400 via-amber-400 to-teal-400',
    'bg-gradient-to-br from-amber-200 to-orange-400',
    'bg-gradient-to-r from-teal-500/80 to-emerald-500/80',
    'bg-amber-100/50'
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
    <div className="min-h-screen bg-[#FFFDFC] text-[#111827] font-sans pb-24" dir="rtl">
      {/* Warm Arabic Patterned Banner */}
      <div className="relative bg-gradient-to-br from-[#EA580C] via-[#D97706] to-[#14B8A6] py-12 md:py-20 px-4 text-white text-right shadow-md">
        {/* Soft Traditional Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#FFF7ED] text-[#EA580C] px-3.5 py-1.5 rounded-full font-bold text-xs shadow-xs border border-orange-200">
            🔔 هلا بيكم في منصتكم الموثوقة!
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight drop-shadow-xs">
            منتدى <span className="text-[#FACC15]">شباب العراق الجامعي</span> للتعاون والطموح
          </h1>

          <p className="mt-2 text-base md:text-lg text-orange-50 font-medium max-w-3xl leading-relaxed">
            مساحة عراقية تشجع روح الأخوة والزمالة الحقة بين طلبة جميع المحافظات، من زاخو الحبيبة للبصرة الفيحاء. هدفنا تيسير دراستكم ومستقبلكم المهني بأيادٍ وطنية 🇮🇶🤝
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            <div className="bg-[#FFF7ED]/15 backdrop-blur-xs px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
              🦁 ساحة الجادرية والوزيرية تجمعنا
            </div>
            <div className="bg-[#FFF7ED]/15 backdrop-blur-xs px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
              🌴 تدريبات وتطوير مجاني بالكامل
            </div>
          </div>
        </div>
      </div>

      {/* Stories with warm cultural theme */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="text-base font-extrabold text-[#EA580C] flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-[#14B8A6]" />
          يوميات وسوالف الزملاء ☕
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x">
          <div className="flex-none w-24 text-center snap-start">
            <div className="relative group cursor-pointer inline-block" onClick={onTriggerAuth}>
              <div className="w-16 h-16 rounded-full bg-[#FFF7ED] border-2 border-[#EA580C] flex items-center justify-center group-hover:scale-105 transition-all">
                <Plus className="w-6 h-6 text-[#EA580C]" />
              </div>
              <span className="block mt-2 text-xs font-bold text-slate-600">شارك سوالفك</span>
            </div>
          </div>

          {stories.map(story => (
            <div 
              key={story.id} 
              onClick={() => onViewStory(story)}
              className="flex-none w-24 text-center snap-start cursor-pointer group"
            >
              <div className="relative inline-block">
                <div className="w-16 h-16 rounded-full bg-slate-100 p-0.5 border-2 border-[#14B8A6] group-hover:border-[#EA580C] transition-colors shadow-xs">
                  <img 
                    src={story.userAvatar} 
                    alt={story.userName}
                    className="w-full h-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="block mt-1.5 text-xs font-black text-[#111827] line-clamp-1">{story.userName}</span>
                <span className="block text-[9px] text-[#14B8A6] font-bold">
                  {story.university.split(' ')[1] || story.university}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid panels */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* RIGHT BAR */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          
          <div className="bg-[#FFFDF9] p-6 rounded-2xl border-2 border-orange-100 text-right shadow-xs">
            <h3 className="font-extrabold text-base text-[#EA580C] mb-4 flex items-center gap-1.5">
              <Milestone className="w-5 h-5 text-[#14B8A6]" />
              بوابة فرز وتسهيل المحتوى
            </h3>

            {/* Warm search */}
            <div className="relative mb-5">
              <input
                type="text"
                placeholder="ابحث عن إعلانات كليتك، ربعك..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-amber-50/50 border border-amber-200 text-sm focus:outline-none focus:bg-white focus:border-[#EA580C]"
              />
              <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-amber-600" />
            </div>

            {/* University filters */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-[#EA580C] mb-2">اختر جامعة محددة:</label>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                <button
                  onClick={() => setUnivFilter('')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all cursor-pointer ${
                    univFilter === ''
                      ? 'bg-[#14B8A6] text-white border-transparent'
                      : 'bg-white text-slate-600 border-amber-100 hover:border-[#14B8A6]'
                  }`}
                >
                  جميع الكليات 🏫
                </button>
                {['جامعة بغداد', 'جامعة النهرين', 'الجامعة التكنولوجية', 'جامعة تيشك الدولية', 'جامعة السليمانية', 'جامعة بابل'].map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnivFilter(univFilter === u ? '' : u)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all cursor-pointer ${
                      univFilter === u
                        ? 'bg-[#EA580C] text-white border-transparent'
                        : 'bg-white text-slate-600 border-amber-100 hover:border-[#EA580C]'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            {/* Governorate filters */}
            <div>
              <label className="block text-xs font-bold text-[#EA580C] mb-2">اختر المحافظة:</label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setGovFilter('')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all cursor-pointer ${
                    govFilter === ''
                      ? 'bg-amber-600 text-white border-transparent'
                      : 'bg-white text-slate-600 border-amber-100'
                  }`}
                >
                  كل المحافظات 🗺️
                </button>
                {['بغداد', 'أربيل', 'البصرة', 'السليمانية'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGovFilter(govFilter === g ? '' : g)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all cursor-pointer ${
                      govFilter === g
                        ? 'bg-[#14B8A6] text-white border-transparent'
                        : 'bg-white text-slate-600 border-amber-100'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Action */}
          <div className="bg-[#FFF7ED] p-6 rounded-2xl border-2 border-orange-200">
            <h4 className="font-extrabold text-sm text-[#EA580C] mb-2 flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-[#EA580C] animate-spin" />
              تبي تشارك الفايدة؟
            </h4>
            <p className="text-xs text-orange-850 mb-4 leading-relaxed font-medium">
              عندنا إيمان كامل إن الطالب يسند أخوه الطالب. انشر تجربتك في التدريب أو كتاب مفيد لتسهيل خطة الدراسة الحرة.
            </p>
            <button
              onClick={() => {
                if (!currentUser) onTriggerAuth();
                else setShowCreatePost(!showCreatePost);
              }}
              className="w-full bg-[#EA580C] hover:bg-[#c2410c] text-white font-extrabold text-xs py-2.5 rounded-lg cursor-pointer text-center block shadow-xs"
            >
              {showCreatePost ? 'إغلاق نافذة الكتابة' : '✍️ اكتب واستفسر بالمنتدى'}
            </button>
          </div>

          {/* Verified partners */}
          <div className="bg-[#FFFDF9] p-5 rounded-2xl border-2 border-orange-100 text-right">
            <h4 className="text-xs font-extrabold text-[#EA580C] mb-4">// شركاؤنا المحليين 🇮🇶</h4>
            <div className="space-y-3.5">
              {institutions.map(inst => (
                <div key={inst.id} className="flex items-center gap-3">
                  <img 
                    src={inst.logo} 
                    alt={inst.name}
                    className="w-8 h-8 rounded-lg object-cover border border-amber-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-extrabold text-slate-800 truncate">{inst.name}</h5>
                    <p className="text-[10px] text-zinc-500">{inst.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FEED & OPPORTUNITIES */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Reactive Post Composer */}
          {showCreatePost && (
            <div className="bg-amber-50/70 p-6 rounded-2xl border-2 border-orange-200 shadow-xs animate-fadeIn">
              <h4 className="font-extrabold text-sm text-[#EA580C] mb-3">اكتب لأهلك وزملائك بالمحافظات:</h4>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <textarea
                  placeholder="السلام عليكم زملاء، هل من أحد يقدر يعاونا في..."
                  rows={3}
                  value={newPostText}
                  onChange={(e) => setNewPostText(e.target.value)}
                  className="w-full p-4 rounded-xl bg-white border border-orange-100 text-sm focus:outline-none focus:border-[#EA580C]"
                  required
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {gradients.map((g, index) => (
                      <button
                        type="button"
                        key={index}
                        onClick={() => setSelectedGradient(g)}
                        className={`w-5 h-5 rounded-md border border-orange-100 ${g} ${selectedGradient === g ? 'ring-2 ring-[#EA580C]' : ''}`}
                      />
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="bg-[#EA580C] hover:bg-[#c2410c] text-white text-xs font-extrabold px-4 py-2 rounded-lg cursor-pointer shadow-xs"
                  >
                    شارك في الساحة
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Iraqi Opportunities Row */}
          <div>
            <h2 className="text-base font-extrabold text-[#14B8A6] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#EA580C]" />
              فرص ومنح تدريبية لشباب الرافدين 🤝
            </h2>
            <div className="space-y-4">
              {opportunities.map(op => (
                <div 
                  key={op.id}
                  className="bg-[#FFFDF9] p-5 rounded-2xl border-2 border-orange-50 hover:border-amber-100 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-start gap-4">
                    <img 
                      src={op.logo} 
                      alt={op.institution}
                      className="w-11 h-11 rounded-lg object-cover border border-amber-100 flex-none"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black bg-amber-100 text-[#EA580C] px-2 py-0.5 rounded">
                          {op.type}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-bold">🚨 {op.deadline}</span>
                      </div>
                      
                      <h3 className="font-extrabold text-sm text-[#111827] mt-1 hover:text-[#EA580C] cursor-pointer">
                        {op.title}
                      </h3>

                      <p className="text-xs text-slate-500 mt-1">{op.institution} • {op.location}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onApplyOpportunity(op.id)}
                    className={`py-1.5 px-4 rounded-lg text-xs font-bold cursor-pointer border transition-all md:self-center ${
                      op.applied
                        ? 'bg-[#14B8A6]/10 text-[#14B8A6] border-transparent'
                        : 'bg-[#14B8A6] hover:bg-[#0f8a7c] text-white border-transparent shadow'
                    }`}
                  >
                    {op.applied ? '✓ تم إرسال الملف' : 'سجل اهتمامك'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Local Feed */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-amber-50 pb-3">
              <h2 className="text-base font-extrabold text-[#EA580C] flex items-center gap-2">
                <Flag className="w-5 h-5 text-[#14B8A6]" />
                أحدث سوالف ومعلومات الساحة الطلابية
              </h2>
            </div>

            {posts.length === 0 ? (
              <div className="bg-amber-50/20 p-12 text-center rounded-2xl border-2 border-dashed border-amber-100 text-slate-400">
                <p className="text-xs">عفواً، حالياً لا يوجد أي سوالف بهذا الاسم أو الجامعة.</p>
              </div>
            ) : (
              posts.map(post => {
                return (
                  <div 
                    key={post.id}
                    className="bg-[#FFFDF9] rounded-2xl border-2 border-orange-50 shadow-xs text-right overflow-hidden"
                  >
                    {/* Authorship */}
                    <div className="p-4 md:p-5 flex items-center justify-between border-b border-orange-50 bg-[#FFFDF9]">
                      <div className="flex items-center gap-3">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-extrabold text-sm text-[#111827]">{post.author.name}</span>
                            {post.author.verified && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                          </div>
                          <span className="block text-[10px] text-slate-400 mt-0.5">
                            {post.author.university} • {post.author.governorate}
                          </span>
                        </div>
                      </div>

                      <div className="text-left">
                        <span className="text-[10px] text-slate-401 block font-bold">{post.createdAt}</span>
                        <span className="text-[9px] font-black text-[#14B8A6] bg-[#14B8A6]/10 px-2 py-0.5 rounded-full mt-1.5 inline-block">
                          {post.tag}
                        </span>
                      </div>
                    </div>

                    {/* Content text */}
                    <div className="p-5 space-y-4">
                      <p className="text-xs md:text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-wrap">
                        {post.content}
                      </p>

                      {post.imageUrl ? (
                        <div className="rounded-xl overflow-hidden border border-orange-50">
                          <img 
                            src={post.imageUrl} 
                            alt="Student Post Attachment"
                            className="w-full max-h-60 object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        post.gradientStyle && (
                          <div className={`p-5 rounded-xl ${post.gradientStyle} border border-orange-50 text-white flex flex-col justify-between h-24`}>
                            <p className="font-extrabold text-xs text-[#FFF7ED] line-clamp-1">{post.content}</p>
                            <span className="text-[8px] font-black text-amber-250 block">شبكة شبابنا في الجامعات العراقية 🦁🇮🇶</span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Actions feedback */}
                    <div className="px-5 py-3 border-t border-orange-50 flex items-center justify-between text-xs text-slate-500 font-bold bg-[#FFFBF7]">
                      
                      <button 
                        onClick={() => onLike(post.id)}
                        className={`flex items-center gap-1.5 cursor-pointer ${post.hasLiked ? 'text-red-500 font-black' : 'hover:text-[#EA580C]'}`}
                      >
                        <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-red-500 text-red-500' : ''}`} />
                        <span>عجبني ({post.likes})</span>
                      </button>

                      <button 
                        onClick={() => {
                          const inp = document.getElementById(`iraq-comment-box-${post.id}`);
                          inp?.focus();
                        }}
                        className="flex items-center gap-1.5 hover:text-[#14B8A6] cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>ردود الزملاء ({post.comments.length})</span>
                      </button>

                      <button 
                        onClick={() => alert('تم النسخ للمشاركة السريعة 📤')}
                        className="hover:text-slate-800 cursor-pointer"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Replies */}
                    <div className="bg-[#FFFDF9]/60 border-t border-orange-50 p-4 space-y-3">
                      {post.comments.map(c => (
                        <div key={c.id} className="flex gap-3 text-xs text-slate-650">
                          <img 
                            src={c.authorAvatar} 
                            alt={c.authorName}
                            className="w-7 h-7 rounded-full object-cover flex-none"
                            referrerPolicy="no-referrer"
                          />
                          <div className="bg-white border border-orange-100 p-3 rounded-lg flex-1">
                            <div className="flex items-center justify-between mb-1 text-[10px] font-bold text-slate-800">
                              <span>{c.authorName}</span>
                              <span className="text-slate-400 font-normal">{c.authorUniversity}</span>
                            </div>
                            <p className="text-slate-700 leading-normal text-[11px] md:text-xs">
                              {c.content}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Add comment */}
                      <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="flex gap-2">
                        <input
                          id={`iraq-comment-box-${post.id}`}
                          type="text"
                          placeholder={currentUser ? "اكتب كلمة زمالة طيبة..." : "سجل الدخول للمشاركة"}
                          value={commentInput[post.id] || ''}
                          onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                          disabled={!currentUser}
                          className="flex-1 bg-white text-xs px-3 py-2 rounded-lg border border-amber-100 focus:outline-none focus:border-[#EA580C] disabled:bg-slate-50"
                        />
                        <button
                          type="submit"
                          disabled={!currentUser}
                          className="bg-[#14B8A6] hover:bg-[#0f8a7c] text-white p-2 rounded-lg border-none shadow transition-all cursor-pointer disabled:opacity-30"
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
