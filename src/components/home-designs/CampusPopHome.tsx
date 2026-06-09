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
  Flame, 
  Compass, 
  Check,
  Briefcase,
  GraduationCap,
  Users,
  Bell,
  SlidersHorizontal,
  Bookmark,
  ChevronDown,
  Image as ImageIcon,
  Camera,
  Upload,
  X,
  Link as LinkIcon
} from 'lucide-react';
import { GOVERNORATES, UNIVERSITIES } from '../../data';

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

export default function CampusPopHome({
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
  const [newPostTag, setNewPostTag] = useState('#أفكار_طلابية');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedGradient, setSelectedGradient] = useState('bg-gradient-to-tr from-sky-450 to-purple-550');
  const [postImage, setPostImage] = useState<string>('');
  const [imageTab, setImageTab] = useState<'none' | 'file' | 'url' | 'stock'>('none');
  const [customUrlInput, setCustomUrlInput] = useState('');

  const STOCK_IMAGES = [
    { id: 'campus_life', label: 'حياة جامعية 🎒', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=600' },
    { id: 'students', label: 'جلسة دراسة ☕', url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600' },
    { id: 'library', label: 'المكتبة 📚', url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=600' },
    { id: 'achievement', label: 'التخرج 🎓', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600' },
    { id: 'workspace', label: 'ابتكار 💡', url: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&q=80&w=600' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert('الملف كبير جداً! يرجى اختيار ملف صورة أصغر من 3 ميغابايت.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Track active tab: "students" (Play / Campus Life) vs "opportunities" (Work / Serious Opportunities)
  const [activeTab, setActiveTab] = useState<'students' | 'opportunities'>('students');

  const gradients = [
    'bg-gradient-to-tr from-[#38BDF8] to-[#8B5CF6]',
    'bg-gradient-to-tr from-[#EC4899] via-[#8B5CF6] to-[#38BDF8]',
    'bg-gradient-to-tr from-[#F59E0B] to-[#EC4899]',
    'bg-gradient-to-tr from-[#10B981] to-[#14B8A6]'
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
    onAddPost(newPostText, newPostTag, selectedGradient, postImage || undefined);
    setNewPostText('');
    setPostImage('');
    setCustomUrlInput('');
    setImageTab('none');
    setShowCreatePost(false);
  };

  // Filter opportunities to align with state
  const filteredOpportunities = opportunities.filter(op => {
    const matchesGov = !govFilter || op.location.toLowerCase().includes(govFilter.toLowerCase());
    const matchesUniv = !univFilter || op.institution.toLowerCase().includes(univFilter.toLowerCase());
    const matchesQuery = !searchQuery || 
      op.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      op.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGov && matchesUniv && matchesQuery;
  });

  return (
    <div className="bg-gradient-to-tr from-[#07111F] via-[#101B3A] to-[#07111F] text-slate-100 min-h-screen pb-32 font-sans relative overflow-hidden" dir="rtl">
      
      {/* ─── ENERGETIC PREMIUM TURQUOISE & INDIGO GLOWS ─── */}
      <div className="absolute top-[10%] right-4 w-72 h-72 bg-[#06B6D4]/12 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-4 w-80 h-80 bg-[#4F46E5]/12 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-10 w-96 h-96 bg-[#06B6D4]/8 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* ─── HERO HEADER BANNER ─── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1E1B4B] via-[#101B3A] to-[#0F172A] py-14 px-4 text-white text-center rounded-b-[2.5rem] shadow-2xl border-b-4 border-[#06B6D4]">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#06B6D4] opacity-15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-60 h-60 bg-[#4F46E5] opacity-20 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#F59E0B] text-[#0F172A] px-4 py-2 rounded-full font-black text-xs uppercase tracking-wider shadow-lg border border-[#1E1B4B] animate-bounce">
            <Sparkles className="w-4 h-4 text-[#0F172A]" />
            شعارنا: ادرس بذكاء.. والعب بجد!  Work Hard / Play Hard 📚⚡
          </div>
          
          <h1 className="text-3xl md:text-6xl font-black tracking-tight leading-tight drop-shadow-[0_4px_0_rgba(6,182,212,0.3)]">
            ملتقى <span className="text-[#06B6D4] underline decoration-wavy decoration-[#F59E0B] mx-1">طلبة العراق</span> الجامعي
          </h1>
          
          <p className="text-xs md:text-lg font-bold text-slate-100 max-w-2xl mx-auto leading-relaxed">
            المنصة الشبابية الكبرى للفرص و المنح و تواصل الطلبة من زاخو إلى البصرة 🎈
          </p>

          <div className="flex justify-center items-center gap-6 pt-2">
            <div className="bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-white/10 shadow-inner">
              <span className="block text-lg font-black text-[#06B6D4]">١٢,٠٠٠+</span>
              <span className="text-[9px] text-slate-300 font-bold">طالب عراقي</span>
            </div>
            <div className="bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-white/10 shadow-inner">
              <span className="block text-lg font-black text-[#F59E0B]">٤٥+</span>
              <span className="text-[9px] text-slate-300 font-bold">جامعة ومؤسسة</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 1. STORY CIRCLES AT THE TOP ─── */}
      <div className="max-w-4xl mx-auto px-4 mt-8 animate-fadeIn">
        <div className="bg-[#101B3A] p-4 rounded-3xl border border-[#06B6D4]/30 shadow-xl">
          <h3 className="text-xs font-black text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1.5 px-1 font-sans">
            <Flame className="w-5 h-5 text-[#06B6D4] animate-bounce" />
            يوميات الحرم الطلابي • ستوريات حيّة  Play 🔥
          </h3>
          
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x scrollbar-none">
            {/* Add story action button */}
            <div className="flex-none w-20 text-center snap-start">
              <button 
                onClick={onTriggerAuth}
                className="group focus:outline-none"
              >
                <div className="w-16 h-16 rounded-full bg-[#07111F] border-2 border-dashed border-[#06B6D4]/50 flex items-center justify-center group-hover:border-[#06B6D4] group-hover:bg-[#101B3A] transition-all duration-300 shadow-inner">
                  <Plus className="w-6 h-6 text-slate-400 group-hover:text-[#06B6D4] transition-colors" />
                </div>
                <span className="block mt-1 text-[10px] font-black text-slate-300 group-hover:text-[#06B6D4]">جديد +</span>
              </button>
            </div>

            {stories.map(story => (
              <div 
                key={story.id} 
                className="flex-none w-20 text-center snap-start cursor-pointer"
                onClick={() => onViewStory(story)}
              >
                <div className="relative inline-block group">
                  {/* Outer colorful glowing ring */}
                  <div className={`w-16 h-16 rounded-full p-[2.5px] transition-all duration-300 group-hover:scale-105 ${
                    story.viewed 
                      ? 'bg-slate-700' 
                      : 'bg-gradient-to-tr from-[#4F46E5] via-[#06B6D4] to-[#EC4899] animate-gradient'
                  }`}>
                    <img 
                      src={story.userAvatar} 
                      alt={story.userName}
                      className="w-full h-full rounded-full border border-[#07111F] object-cover bg-slate-900"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Micro label indicator */}
                  {!story.viewed && (
                    <span className="absolute bottom-1 right-1 bg-[#F59E0B] text-[#0F172A] font-black text-[7px] px-1 rounded-full border border-[#07111F]">
                      رائج
                    </span>
                  )}
                  <span className="block mt-1 text-[10px] font-black text-slate-300 truncate max-w-[70px]">
                    {story.userName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── 2. CENTERED FILTERS ROW (Governorate dropdown + University dropdown + Search button) ─── */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-[#101B3A] p-6 rounded-3xl border border-[#06B6D4]/30 shadow-2xl space-y-4 text-right">
          <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2">
            <SlidersHorizontal className="w-4 h-4 text-[#06B6D4]" />
            <span className="font-black text-slate-100 text-xs">صندوق البحث والفلترة الذكي</span>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            {/* Dropdown 1: Governorate */}
            <div className="relative flex-1">
              <select
                value={govFilter}
                onChange={(e) => setGovFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-3 rounded-2xl bg-[#07111F] border border-[#06B6D4]/40 font-black text-xs text-slate-100 hover:bg-[#07111F]/80 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-right"
              >
                <option value="">🗺️ المحافظة (الكل)</option>
                {GOVERNORATES.map((gov) => (
                  <option key={gov} value={gov} className="bg-[#101B3A] text-slate-150">{gov}</option>
                ))}
              </select>
              <ChevronDown className="absolute left-3 top-3.5 w-4 h-4 text-[#06B6D4] pointer-events-none" />
            </div>

            {/* Dropdown 2: University / Institution */}
            <div className="relative flex-1.5">
              <select
                value={univFilter}
                onChange={(e) => setUnivFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-3 rounded-2xl bg-[#07111F] border border-[#06B6D4]/40 font-black text-xs text-slate-100 hover:bg-[#07111F]/80 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-[#4F46E5] text-right"
              >
                <option value="">🏛️ الجامعة أو المؤسسة (الكل)</option>
                {UNIVERSITIES.map((uni) => (
                  <option key={uni} value={uni} className="bg-[#101B3A] text-[#FAF5FF]">{uni}</option>
                ))}
              </select>
              <ChevronDown className="absolute left-3 top-3.5 w-4 h-4 text-[#06B6D4] pointer-events-none" />
            </div>

            {/* Search/Filter Action Button */}
            <button 
              onClick={() => {
                const toast = document.createElement('div');
                toast.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-[#101B3A] text-white text-xs font-bold px-5 py-3 rounded-full z-50 shadow-2xl border-2 border-[#06B6D4]';
                toast.innerText = '🔍 تم تحديث نتائج العرض بناءً على خيارات التصفية';
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2500);
              }}
              className="bg-[#F59E0B] text-[#0F172A] font-black text-xs px-6 py-3 rounded-2xl border border-[#F59E0B] shadow-[0_4px_14px_rgba(245,158,11,0.4)] hover:bg-[#F59E0B]/90 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Search className="w-4 h-4 text-[#0F172A]" />
              <span>ابحث الآن</span>
            </button>
          </div>

          {/* Keyword text search input grouped beneath */}
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 ابحث بكلمة مفتاحية (مثل: هندسة، تسويق، أو اسم الفرصة)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-4 pl-10 py-2.5 rounded-xl bg-[#07111F] border border-[#06B6D4]/35 focus:outline-none focus:ring-1 focus:ring-[#06B6D4] text-xs font-medium text-slate-100 placeholder-slate-400"
            />
          </div>
        </div>
      </div>

      {/* ─── 3. THE TWO TABS: "WORK HARD / PLAY HARD" CONCEPT ─── */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-2 gap-4 p-2 bg-[#101B3A]/80 rounded-[2rem] border border-[#06B6D4]/20 shadow-lg">
          
          {/* Tab 1: "Play / Campus Life" */}
          <button
            onClick={() => setActiveTab('students')}
            className={`relative py-4 px-4 rounded-[1.8rem] transition-all duration-300 flex flex-col items-center justify-center gap-1 group cursor-pointer ${
              activeTab === 'students'
                ? 'bg-gradient-to-r from-[#4F46E5] to-[#3B82F6] text-white border border-[#06B6D4] shadow-[0_4px_14px_rgba(79,70,229,0.35)] scale-[1.01]'
                : 'bg-[#07111F] hover:bg-[#07111F]/80 text-slate-300 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🎈</span>
              <span className="font-black text-sm md:text-lg tracking-tight">الطلاب (Play / Student Life)</span>
            </div>
            <span className={`text-[10px] font-bold ${activeTab === 'students' ? 'text-slate-100' : 'text-slate-400'}`}>
              يوميات وسوالف وتواصل الطلاب الحية 🔥
            </span>
          </button>

          {/* Tab 2: "Work / Opportunities" */}
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`relative py-4 px-4 rounded-[1.8rem] transition-all duration-300 flex flex-col items-center justify-center gap-1 group cursor-pointer ${
              activeTab === 'opportunities'
                ? 'bg-gradient-to-r from-[#BE185D] to-[#EC4899] text-white border border-[#EC4899]/70 shadow-[0_4px_14px_rgba(236,72,153,0.35)] scale-[1.01]'
                : 'bg-[#07111F] hover:bg-[#07111F]/80 text-slate-300 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">💼</span>
              <span className="font-black text-sm md:text-lg tracking-tight">الفرص (Work / Opportunities)</span>
            </div>
            <span className={`text-[10px] font-bold ${activeTab === 'opportunities' ? 'text-slate-100' : 'text-slate-400'}`}>
              وظائف، منح دراسية، وتدريبات بناء المستقبل 🚀
            </span>
          </button>

        </div>
      </div>

      {/* ─── 4. SELECTED TAB CONTENT ─── */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        
        {/* ==================================== */}
        {/* TAB A: STUDENTS — PLAY / CAMPUS LIFE */}
        {/* ==================================== */}
        {activeTab === 'students' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Quick stats on student side */}
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#EC4899]" />
                يحدث الآن بالساحة الجامعية 🏫
              </h2>
              <button 
                onClick={() => {
                  if (!currentUser) {
                    onTriggerAuth();
                  } else {
                    setShowCreatePost(!showCreatePost);
                  }
                }}
                className="bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0F172A] font-black text-xs px-4 py-2.5 rounded-2xl border border-[#F59E0B] shadow-[0_4px_12px_rgba(245,158,11,0.3)] active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> انشر سالفة جديدة
              </button>
            </div>

            {/* Interactive Post Creator Box */}
            {(showCreatePost || !currentUser) && (
              <div className="bg-[#101B3A] p-6 rounded-3xl border border-[#06B6D4]/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-[#06B6D4] text-sm">شارك شيئاً مع زملائك بالجامعات الأخرى ✨</h4>
                  {!currentUser && (
                    <span className="bg-[#EC4899]/20 text-[#EC4899] text-[9px] font-black px-2 py-0.5 rounded-md border border-[#EC4899]/30">
                      محاكاة حساب زائر لتجربة النشر والتعليق
                    </span>
                  )}
                </div>

                <form onSubmit={handlePostSubmit} className="space-y-3">
                  <textarea
                    placeholder="شنو ببالك اليوم؟ اكتب عن الكلية، الامتحانات، أنشطة الأندية، الملازم، أو مجرد ترحيب بصحبك المقربين..."
                    rows={3}
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className="w-full p-4 rounded-2xl border border-[#06B6D4]/30 bg-[#07111F] focus:outline-none focus:ring-1 focus:ring-[#06B6D4] text-xs font-bold leading-relaxed text-slate-100"
                    required
                  />

                  {/* 🖼️ --- Interactive Image Selection Area --- */}
                  <div className="bg-[#07111F]/60 p-3.5 rounded-2xl border border-[#06B6D4]/15 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-slate-300 flex items-center gap-1">
                        <ImageIcon className="w-4 h-4 text-[#F59E0B]" />
                        إرفاق صورة للمنشور (اختياري)
                      </span>
                      {postImage && (
                        <button 
                          type="button" 
                          onClick={() => {
                            setPostImage('');
                            setCustomUrlInput('');
                          }}
                          className="text-red-400 hover:text-red-300 font-extrabold flex items-center gap-0.5 text-[10px]"
                        >
                          <X className="w-3.5 h-3.5" /> مسح الصورة
                        </button>
                      )}
                    </div>

                    {/* Previews if selected */}
                    {postImage ? (
                      <div className="relative w-full h-32 md:h-40 rounded-xl overflow-hidden border border-[#06B6D4]/30">
                        <img 
                          src={postImage} 
                          alt="Preview to be posted" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <button
                            type="button; cursor: pointer"
                            onClick={() => {
                              setPostImage('');
                              setCustomUrlInput('');
                            }}
                            className="bg-red-650 text-white rounded-full p-2 text-xs font-bold hover:bg-red-700 flex items-center gap-1 cursor-pointer"
                          >
                            <X className="w-4 h-4" /> إزالة واستبدال
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2 text-[10px] font-black flex-wrap">
                        <button
                          type="button"
                          onClick={() => setImageTab(imageTab === 'file' ? 'none' : 'file')}
                          className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1 cursor-pointer ${
                            imageTab === 'file' 
                              ? 'bg-[#06B6D4]/20 text-[#06B6D4] border-[#06B6D4]/40' 
                              : 'bg-[#101B3A] text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <Upload className="w-3.5 h-3.5" /> تحميل ملف
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageTab(imageTab === 'url' ? 'none' : 'url')}
                          className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1 cursor-pointer ${
                            imageTab === 'url' 
                              ? 'bg-[#06B6D4]/20 text-[#06B6D4] border-[#06B6D4]/40' 
                              : 'bg-[#101B3A] text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <LinkIcon className="w-3.5 h-3.5" /> رابط ويب مباشر
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageTab(imageTab === 'stock' ? 'none' : 'stock')}
                          className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1 cursor-pointer ${
                            imageTab === 'stock' 
                              ? 'bg-[#06B6D4]/20 text-[#06B6D4] border-[#06B6D4]/40' 
                              : 'bg-[#101B3A] text-slate-300 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <Camera className="w-3.5 h-3.5" /> صور جاهزة جميلة 🎓
                        </button>
                      </div>
                    )}

                    {/* Expandable Image File Zone */}
                    {!postImage && imageTab === 'file' && (
                      <div className="bg-[#101B3A] p-4 rounded-xl border border-dashed border-[#06B6D4]/30 text-center relative cursor-pointer hover:border-[#06B6D4]/60 transition-all">
                        <input 
                          type="file" 
                          id="post-file-upload"
                          accept="image/*" 
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                        />
                        <div className="flex flex-col items-center gap-1.5 pointer-events-none">
                          <Upload className="w-7 h-7 text-[#06B6D4]" />
                          <span className="text-[11px] font-black text-slate-200">اضغط هنا لاختيار ملف صورة من جهازك</span>
                          <span className="text-[9px] text-slate-400">يدعم PNG, JPG لغاية 3MB</span>
                        </div>
                      </div>
                    )}

                    {/* Expandable Image URL Input */}
                    {!postImage && imageTab === 'url' && (
                      <div className="flex gap-2">
                        <input 
                          type="url" 
                          placeholder="ألصق رابط الصورة المباشر هنا (مثل https://.../image.jpg)"
                          value={customUrlInput}
                          onChange={(e) => setCustomUrlInput(e.target.value)}
                          className="flex-1 bg-[#101B3A] text-[10px] font-bold px-3 py-2.5 rounded-xl border border-[#06B6D4]/30 focus:outline-[#06B6D4] text-slate-100 placeholder-slate-400 text-right"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (customUrlInput.trim().startsWith('http')) {
                              setPostImage(customUrlInput);
                            } else {
                              alert('يرجى إدخال رابط يبدأ بـ http:// أو https://');
                            }
                          }}
                          className="bg-[#06B6D4] text-[#0F172A] px-4 py-2 rounded-xl text-[10px] font-black hover:bg-[#06B6D4]/90 active:translate-y-px cursor-pointer"
                        >
                          إدراج
                        </button>
                      </div>
                    )}

                    {/* Expandable Stock photo cards */}
                    {!postImage && imageTab === 'stock' && (
                      <div className="space-y-2">
                        <span className="text-[9px] text-[#06B6D4] font-black block">اختر صورة جاهزة تمثل الحرم الطلابي:</span>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                          {STOCK_IMAGES.map((img) => (
                            <button
                              key={img.id}
                              type="button"
                              onClick={() => {
                                setPostImage(img.url);
                              }}
                              className="group bg-[#07111F] rounded-xl overflow-hidden border border-slate-800 hover:border-[#06B6D4]/50 transition-all text-right h-24 flex flex-col justify-between cursor-pointer"
                            >
                              <img 
                                src={img.url} 
                                alt={img.label} 
                                className="w-full h-14 object-cover group-hover:scale-105 transition-all"
                                referrerPolicy="no-referrer"
                              />
                              <span className="text-[9px] font-black text-slate-300 p-1 block truncate w-full text-center">
                                {img.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {/* Tags selector */}
                    <div className="flex items-center gap-1.5 bg-[#07111F] px-3 py-1.5 rounded-xl border border-[#06B6D4]/30">
                      <span className="text-[10px] font-black text-slate-400">هاشتاغ:</span>
                      <select
                        value={newPostTag}
                        onChange={(e) => setNewPostTag(e.target.value)}
                        className="text-[10px] font-black text-slate-100 focus:outline-none bg-transparent cursor-pointer"
                      >
                        <option value="#أفكار_طلابية" className="bg-[#101B3A]">#أفكار_طلابية 🎈</option>
                        <option value="#سرديات_الحرم" className="bg-[#101B3A]">#سرديات_الحرم 🏫</option>
                        <option value="#نوادي_طلابية" className="bg-[#101B3A]">#نوادي_طلابية 🏆</option>
                        <option value="#فعاليات_رياضية" className="bg-[#101B3A]">#فعاليات_رياضية ⚽</option>
                        <option value="#طلب_مساعدة" className="bg-[#101B3A]">#طلب_مساعدة 🤝</option>
                      </select>
                    </div>

                    {/* Gradient color selector */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400">البوستر:</span>
                      <div className="flex gap-1">
                        {gradients.map((g, idx) => (
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setSelectedGradient(g)}
                            className={`w-5 h-5 rounded-full ${g} border border-slate-900 transition-transform ${
                              selectedGradient === g ? 'scale-125 ring-2 ring-[#F59E0B]' : 'opacity-85'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#4F46E5] text-white hover:bg-[#4F46E5]/90 font-extrabold text-xs px-5 py-2.5 rounded-xl border border-[#4F46E5] shadow shadow-[#4F46E5]/40 flex items-center gap-1 active:translate-y-0.5"
                    >
                      <Send className="w-3 px-0.5" />
                      انشر الحين
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List of social posts parsed as play/campus posts */}
            <div className="space-y-6">
              {posts.length === 0 ? (
                <div className="bg-[#101B3A] p-12 text-center rounded-3xl border border-[#06B6D4]/25">
                  <p className="text-slate-300 font-black text-sm">ماكو أي منشورات تناسب الفلاتر حالياً 🧐</p>
                  <p className="text-xs text-slate-400 mt-2">جرب الضغط على "تصفير الكل" بالأعلى لرؤية بقية منشورات الزملاء.</p>
                </div>
              ) : (
                posts.map(post => {
                  return (
                    <div 
                      key={post.id}
                      className="bg-white rounded-3xl border border-[#06B6D4]/20 shadow-xl overflow-hidden active:translate-y-px transition-all"
                    >
                      {/* Post Header with User Details */}
                      <div className="p-4 md:p-5 flex items-center justify-between border-b border-[#06B6D4]/15 bg-slate-50">
                        <div className="flex items-center gap-3">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#4F46E5]/40"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-xs md:text-sm text-[#0F172A]">{post.author.name}</span>
                              {post.author.verified && (
                                <span className="bg-[#10B981]/15 text-[#10B981] text-[8px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5 border border-[#10B981]/20">
                                  <CheckCircle2 className="w-2.5 h-2.5 text-[#10B981] fill-current" />
                                  موثق
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[9px] text-slate-500 mt-1">
                              <span className="font-bold bg-slate-200/80 px-2 py-0.5 rounded-md">
                                🏫 {post.author.university}
                              </span>
                              <span>•</span>
                              <span className="font-bold text-slate-600">📍 {post.author.governorate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-left">
                          <span className="text-[9px] text-slate-400 font-bold block">{post.createdAt}</span>
                          <span className="inline-block mt-1 bg-indigo-50 text-[#4F46E5] text-[9px] font-black px-2 py-0.5 rounded-full border border-indigo-105">
                            {post.tag}
                          </span>
                        </div>
                      </div>

                      {/* Post Core Content */}
                      <div className="p-5 text-right font-sans">
                        <p className="text-xs md:text-sm text-[#0F172A] font-bold leading-relaxed whitespace-pre-wrap">
                          {post.content}
                        </p>

                        {/* Rendering Image if present or aesthetic fallback graphic poster */}
                        {post.imageUrl ? (
                          <div className="mt-4 rounded-2xl overflow-hidden border border-[#06B6D4]/15 shadow-md max-h-80">
                            <img 
                              src={post.imageUrl} 
                              alt="Post illustration"
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ) : (
                          post.gradientStyle && (
                            <div className={`mt-4 h-36 rounded-2xl ${post.gradientStyle} p-6 flex flex-col justify-between border border-white/10 shadow-lg`}>
                              <span className="text-[10px] font-black text-white/90 tracking-widest uppercase bg-black/20 self-start px-2 py-0.5 rounded">
                                #أجواء_الحرم ✨
                              </span>
                              <h5 className="font-black text-white text-base md:text-lg line-clamp-2 drop-shadow">
                                "{post.content}"
                              </h5>
                              <span className="text-[9px] font-extrabold text-white/70 block text-left">منقول عن الطلبة</span>
                            </div>
                          )
                        )}
                      </div>

                      {/* Social Reaction Bar Stats */}
                      <div className="px-5 py-3 bg-slate-50 border-t border-[#06B6D4]/13 flex items-center justify-between text-[11px] font-black text-slate-500">
                        <span className="flex items-center gap-1 text-[#EC4899]">
                          <Heart className="w-3.5 h-3.5 fill-[#EC4899]" /> {post.likes} إعجاب بالنقاش
                        </span>
                        <span>{post.comments.length} ردود ومشاركات</span>
                      </div>

                      {/* Practical Interactions Buttons */}
                      <div className="px-3 py-2 bg-slate-50 border-t border-[#06B6D4]/10 flex items-center justify-around gap-1">
                        <button 
                          onClick={() => onLike(post.id)}
                          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black cursor-pointer transition-all ${
                            post.hasLiked 
                              ? 'bg-[#EC4899] text-white border border-[#EC4899] shadow-sm' 
                              : 'hover:bg-[#EC4899]/10 text-[#EC4899]'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${post.hasLiked ? 'fill-white' : ''}`} />
                          <span>أعجبتني</span>
                        </button>

                        <button 
                          onClick={() => {
                            const el = document.getElementById(`reply-input-${post.id}`);
                            el?.scrollIntoView({ behavior: 'smooth' });
                            el?.focus();
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black text-[#4F46E5] hover:bg-[#4F46E5]/10 transition-all cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>رد ({post.comments.length})</span>
                        </button>

                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert('تم نسخ الرابط المباشر لمشاركته مع قروبات التيليجرام والواتساب للطلبة 🔗✨');
                          }}
                          className="flex-none px-3 py-2 rounded-xl text-xs font-black text-slate-500 hover:bg-slate-200 transition-all cursor-pointer"
                          title="مشاركة الرابط"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Comments stream box */}
                      <div className="bg-slate-50 border-t border-[#06B6D4]/10 p-4 md:p-5 space-y-3">
                        {post.comments.map(comm => (
                          <div key={comm.id} className="flex gap-2.5 text-xs text-right">
                            <img 
                              src={comm.authorAvatar} 
                              alt={comm.authorName}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 flex-none"
                              referrerPolicy="no-referrer"
                            />
                            <div className="bg-white p-3 rounded-2xl border border-slate-100 flex-1 shadow-sm">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-extrabold text-[#4F46E5] text-[11px]">{comm.authorName}</span>
                                <span className="text-[8px] text-slate-400 font-bold">
                                  {comm.authorUniversity}
                                </span>
                              </div>
                              <p className="text-[#0F172A] font-bold leading-normal text-[11.5px]">
                                {comm.content}
                              </p>
                              <span className="block text-[8px] text-slate-400 text-left mt-1">{comm.createdAt}</span>
                            </div>
                          </div>
                        ))}

                        {/* Inline write comment form */}
                        <form 
                          onSubmit={(e) => handleCommentSubmit(post.id, e)} 
                          className="flex gap-2 mt-2"
                        >
                          <input
                            id={`reply-input-${post.id}`}
                            type="text"
                            placeholder={currentUser ? "اكتب ردك ومساعدتك الرهيبة للزميل..." : "سجل الدخول لتتمكن من الرد والمشاركة"}
                            value={commentInput[post.id] || ''}
                            onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                            disabled={!currentUser}
                            className="flex-1 bg-white text-[11px] px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#06B6D4] disabled:bg-slate-100 disabled:cursor-not-allowed font-bold text-[#0F172A]"
                          />
                          <button
                            type="submit"
                            disabled={!currentUser}
                            className="bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white p-2.5 rounded-xl border border-[#4F46E5] shadow transition-all cursor-pointer disabled:bg-slate-200 disabled:border-slate-300 disabled:cursor-not-allowed"
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
        )}

        {/* ==================================== */}
        {/* TAB B: OPPORTUNITIES — WORK / CAREER */}
        {/* ==================================== */}
        {activeTab === 'opportunities' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
              <div>
                <h2 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F59E0B]" />
                  أحدث الفرص والمنح والتدريبات الموثقة 💼
                </h2>
                <p className="text-xs text-slate-300">
                  فرص جادة ممولة ومصدقة لمساعدتك في بناء مستقبلك المهني والتعليمي بنجاح
                </p>
              </div>
              <span className="bg-[#4F46E5]/25 text-[#06B6D4] border border-[#06B6D4]/30 text-[10px] font-black px-3.5 py-1.5 rounded-full self-start md:self-auto">
                {filteredOpportunities.length} فرصة متاحة حالياً
              </span>
            </div>

            {/* Opportunities Grid showing the required POSTCARD design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOpportunities.length === 0 ? (
                <div className="bg-[#101B3A] p-12 text-center rounded-3xl border border-[#06B6D4]/25 col-span-2">
                  <p className="text-slate-305 font-black text-sm text-white">ماكو أي فرص تناسب الفلاتر حالياً 🧐</p>
                  <p className="text-xs text-slate-400 mt-2">جرب البحث بكلمة أخرى أو تصفير تصفية المحافظات والجامعات.</p>
                </div>
              ) : (
                filteredOpportunities.map(op => {
                  return (
                    <div 
                      key={op.id}
                      className="bg-white p-6 rounded-[2rem] border border-[#06B6D4]/30 shadow-xl hover:shadow-[#06B6D4]/5 hover:translate-y-px active:translate-y-0.5 transition-all flex flex-col justify-between relative overflow-hidden"
                    >
                      {/* Decorative Postcard Stamp Graphic on top left */}
                      <div className="absolute top-4 left-4 w-12 h-14 border-2 border-dashed border-slate-300 bg-slate-50 rounded flex flex-col items-center justify-center p-1 select-none pointer-events-none rotate-6 scale-95 md:scale-100">
                        <div className="w-full h-full bg-[#EC4899]/10 rounded flex flex-col items-center justify-center border border-slate-200">
                          <span className="text-[7px] text-[#EC4899] font-black">العراق</span>
                          <span className="text-[5px] text-slate-400 font-mono">CAMPUS</span>
                        </div>
                      </div>

                      <div className="text-right">
                        {/* Postcard Stamp Wavy Lines */}
                        <div className="absolute top-16 left-12 w-16 h-3 border-b border-dashed border-slate-200 pointer-events-none -rotate-12"></div>
                        
                        {/* Industry/Institution/Company Logo */}
                        <div className="flex items-center gap-2 mb-3">
                          <img 
                            src={op.logo || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=100'} 
                            alt={op.institution}
                            className="w-7 h-7 rounded-full object-cover border border-[#4F46E5]/20"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[10px] font-black text-[#4F46E5] truncate max-w-[170px]">
                            {op.institution}
                          </span>
                        </div>

                        {/* Opportunity Type Stamp Indicator */}
                        <span className="bg-[#06B6D4]/13 text-[#06B6D4] text-[10px] font-black px-2.5 py-1 rounded-lg border border-[#06B6D4]/30 inline-block font-sans">
                          {op.type}
                        </span>

                        {/* Title of Postcard */}
                        <h3 className="font-black text-sm md:text-base text-[#0F172A] mt-3 leading-relaxed">
                          {op.title}
                        </h3>

                        {/* Short Description */}
                        <p className="text-[11px] md:text-xs text-[#64748B] font-bold mt-2 leading-relaxed line-clamp-3">
                          {op.description || 'لا تفوت هذه الفرصة الاستثنائية التي تهدف لبناء قدرات الطلاب ودمجهم بسوق العمل بكفاءة عالية.'}
                        </p>

                        {/* Sub Tags display */}
                        <div className="flex flex-wrap gap-1 mt-4">
                          {op.tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="text-[9px] font-black bg-indigo-50 text-[#4F46E5] px-2 py-0.5 rounded-md border border-indigo-100"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Footer with Meta details and Apply button */}
                      <div className="mt-6 pt-3 border-t border-dashed border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right">
                        <div className="space-y-1">
                          <div className="text-[10px] text-[#64748B] font-black flex items-center gap-1 justify-start">
                            <MapPin className="w-3.5 h-3.5 text-red-500" />
                            <span>الموقع: {op.location}</span>
                          </div>
                          {op.deadline && (
                            <div className="text-[9px] text-[#EC4899] font-black flex items-center gap-1 justify-start">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>التقديم لغاية: {op.deadline}</span>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            if (!currentUser) {
                              onTriggerAuth();
                            } else {
                              onApplyOpportunity(op.id);
                            }
                          }}
                          className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border flex items-center justify-center gap-1 ${
                            op.applied
                              ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30 shadow-none'
                              : 'bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#0F172A] border-[#F59E0B] shadow shadow-[#F59E0B]/10 active:translate-y-px'
                          }`}
                        >
                          {op.applied ? (
                            <span className="flex items-center justify-center gap-1">
                              <Check className="w-3.5 h-3.5 text-[#10B981]" />
                              تقديم مكتمل 📬
                            </span>
                          ) : 'قدم كطالب الآن 🚀'}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* University announcements block (also serious Work/Opportunities) */}
            <div className="bg-[#101B3A] p-6 rounded-3xl border border-[#06B6D4]/30 shadow-2xl mt-8">
              <h3 className="font-black text-xs md:text-sm text-white mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#06B6D4] animate-swing" />
                إعلانات هامة وتعاميم رسمية من الملحقيات والجامعات
              </h3>

              <div className="space-y-3">
                <div className="bg-[#07111F] p-4 rounded-2xl border border-[#06B6D4]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-[#4F46E5]/20 text-[#06B6D4] text-[9px] font-black px-2.5 py-0.5 rounded-full border border-[#06B6D4]/30">
                      إعلان رسمي
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">اليوم</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-200 leading-relaxed mb-1 text-right">
                    تمديد فترة القبول لطلبة الدراسات المسائية والتبادل المعرفي مع جامعات إقليم كردستان لغاية نهاية الشهر.
                  </h4>
                  <p className="text-[10px] text-slate-405 text-right font-bold text-[#06B6D4]">جامعة بغداد - عمادة القبول والتسجيل بـ الجادرية.</p>
                </div>

                <div className="bg-[#07111F] p-4 rounded-2xl border border-[#06B6D4]/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-[#10B981]/20 text-[#10B981] text-[9px] font-black px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                      برنامج توجيهي رسمي
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">أمس</span>
                  </div>
                  <h4 className="text-xs font-black text-slate-200 leading-relaxed mb-1 text-right">
                    إطلاق ورشة تمكين المرأة القيادة في قطاع التكنولوجيا بشراكة مع وزارة العمل والشؤون الاجتماعية بـ العراق.
                  </h4>
                  <p className="text-[10px] text-slate-405 text-right font-bold text-[#10B981]">منظمة فايف وان لابس - قاعة ريادة الأعمال.</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
