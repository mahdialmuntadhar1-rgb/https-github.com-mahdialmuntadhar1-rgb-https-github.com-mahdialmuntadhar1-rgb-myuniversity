import React, { useState, useEffect } from 'react';
import { 
  DesignVariant, 
  Post, 
  Opportunity, 
  Story, 
  User, 
  Comment 
} from './types';
import { 
  INITIAL_POSTS, 
  SEEDED_USER, 
  INITIAL_STORIES, 
  SEEDED_OPPORTUNITIES, 
  SEEDED_INSTITUTIONS,
  UNIVERSITIES,
  GOVERNORATES
} from './data';
import CampusPopHome from './components/home-designs/CampusPopHome';
import NeonSocialHome from './components/home-designs/NeonSocialHome';
import SoftPremiumHome from './components/home-designs/SoftPremiumHome';
import IraqiYouthHome from './components/home-designs/IraqiYouthHome';
import FutureCampusHome from './components/home-designs/FutureCampusHome';

import { 
  Sparkles, 
  User as UserIcon, 
  LogOut, 
  Smartphone, 
  Monitor, 
  CheckCircle, 
  Globe, 
  Lock, 
  Tv, 
  Check 
} from 'lucide-react';

export default function App() {
  // 1. Core Visual Layout / Skin Variant
  const [selectedDesign, setSelectedDesign] = useState<DesignVariant>(() => {
    const saved = localStorage.getItem('studenthub_selected_design');
    return (saved as DesignVariant) || 'campus_pop';
  });

  // Persist selected branding layout option
  useEffect(() => {
    localStorage.setItem('studenthub_selected_design', selectedDesign);
  }, [selectedDesign]);

  // 2. Local reactive states to prevent broken backend and enable true interactivity
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(SEEDED_OPPORTUNITIES);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [currentUser, setCurrentUser] = useState<User | null>(SEEDED_USER);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authFormType, setAuthFormType] = useState<'login' | 'register'>('login');
  const [authFormData, setAuthFormData] = useState({ name: '', email: '', password: '', university: 'جامعة بغداد', phoneNumber: '', governorate: 'بغداد' });
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  // Synchronized search query and filter controls across all layouts
  const [univFilter, setUnivFilter] = useState('');
  const [govFilter, setGovFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Likes and Interaction bindings
  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const hasLiked = !post.hasLiked;
          return {
            ...post,
            likes: hasLiked ? post.likes + 1 : post.likes - 1,
            hasLiked
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, content: string) => {
    const defaultAuthor = currentUser || {
      id: 'guest',
      name: 'مستخدم زائر',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      university: 'زائر ستودنت هاب',
      governorate: 'بغداد',
      role: 'guest'
    };

    const newComment: Comment = {
      id: `comm_${Date.now()}`,
      authorName: defaultAuthor.name,
      authorAvatar: defaultAuthor.avatar,
      authorUniversity: defaultAuthor.university,
      content,
      createdAt: 'بضع ثوانٍ'
    };

    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };

  const handleAddPost = (content: string, tag: string, gradientStyle: string, imageUrl?: string) => {
    const authorVal = currentUser || {
      id: 'guest_uid',
      name: 'طالب زائر',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      university: 'زائر في الساحة',
      governorate: 'العراق',
      role: 'guest'
    };

    const newPost: Post = {
      id: `new_${Date.now()}`,
      author: {
        name: authorVal.name,
        avatar: authorVal.avatar,
        university: authorVal.university,
        governorate: authorVal.governorate,
        verified: authorVal.role !== 'guest'
      },
      content,
      tag,
      gradientStyle,
      imageUrl,
      likes: 0,
      comments: [],
      createdAt: 'الأن',
      category: 'social'
    };

    setPosts(prev => [newPost, ...prev]);
  };

  const handleApplyOpportunity = (opId: string) => {
    setOpportunities(prev => 
      prev.map(op => {
        if (op.id === opId) {
          return { ...op, applied: !op.applied };
        }
        return op;
      })
    );
  };

  const handleViewStory = (story: Story) => {
    setActiveStory(story);
    // Mark story as viewed
    setStories(prev => 
      prev.map(s => {
        if (s.id === story.id) {
          return { ...s, viewed: true };
        }
        return s;
      })
    );
  };

  // Switch auth states between Guest / Logged in
  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: authFormData.name || 'مبتكر عراقي',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
      university: authFormType === 'register' ? 'ستودنت هاب العراق' : authFormData.university,
      governorate: authFormType === 'register' ? authFormData.governorate : 'بغداد',
      phoneNumber: authFormType === 'register' ? authFormData.phoneNumber : undefined,
      role: 'student'
    };
    setCurrentUser(newUser);
    setShowAuthModal(false);
  };

  // Filter computation to feed into all home layouts
  const filteredPosts = posts.filter(post => {
    const matchesUniv = !univFilter || post.author.university === univFilter;
    const matchesGov = !govFilter || post.author.governorate === govFilter;
    const matchesQuery = !searchQuery || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUniv && matchesGov && matchesQuery;
  });

  return (
    <div className="relative font-sans antialiased min-h-screen bg-[#F8FAFC] selection:bg-purple-200" dir="rtl">
      
      {/* ─── PREMIUM BRANDED HEADER & EXPERIMENT CONTROLLER ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-purple-950/10 shadow-sm px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Platform Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#BE185D] via-[#8B5CF6] to-[#38BDF8] p-[2px] flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <span className="text-purple-950 font-black text-xs">HUB 🎓</span>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 flex items-center gap-1.5 leading-tight">
                منصة ستودنت هاب • studentHUB
                <span className="text-[9px] bg-yellow-400 text-slate-950 font-black px-2 py-0.5 rounded-full border border-slate-905">
                  اصدار ۲.٠ ✨
                </span>
              </h2>
              <p className="text-[10px] text-slate-400 font-medium">
                ملتقى جامعي عراقي مخصص للفرص والتواصل الأكاديمي واليوميّات
              </p>
            </div>
          </div>

          {/* Interactive Core Selectors & Auth state */}
          <div className="flex flex-wrap items-center gap-3 lg:gap-4 md:mr-auto">
            
            {/* Visual Concept Selector Dropdown */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-2xl">
              <label htmlFor="design-select" className="text-[11px] font-black text-slate-550 whitespace-nowrap">
                اختر شكل الواجهة:
              </label>
              <select
                id="design-select"
                value={selectedDesign}
                onChange={(e) => setSelectedDesign(e.target.value as DesignVariant)}
                className="bg-white border-2 border-slate-900 text-xs font-black py-1 px-2.5 rounded-xl text-slate-900 cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-600 transition-all text-ellipsis max-w-[200px]"
              >
                <option value="campus_pop">1. Campus Pop (ألوان مبهجة وتبديل مالي) 🌟</option>
                <option value="neon_social">2. Neon Social (داكن فخم وجذاب)</option>
                <option value="soft_premium">3. Soft Premium (أنيق ومبسط رصين)</option>
                <option value="iraqi_youth">4. Iraqi Youth (دافئ محلي وطني)</option>
                <option value="future_campus">5. Future Campus (مستقبلي تقني)</option>
              </select>
            </div>

            {/* Profile pill & Authentication button */}
            <div className="flex items-center gap-2 border-r border-slate-100 pr-3 mr-0.5">
              {currentUser ? (
                <div className="flex items-center gap-2.5 bg-slate-50 px-2.5 py-1.5 rounded-2xl border border-slate-200">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-purple-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-right leading-tight">
                    <span className="block text-[10px] font-black text-slate-800">{currentUser.name}</span>
                    <span className="block text-[8px] text-slate-400 font-bold">{currentUser.university}</span>
                  </div>
                  <button 
                    onClick={() => setCurrentUser(null)}
                    className="text-[9px] text-red-500 hover:text-red-600 font-extrabold underline cursor-pointer ml-1"
                    title="تسجيل خروج (محاكاة)"
                  >
                    خروج
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthFormType('login');
                    setShowAuthModal(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-black text-xs px-4 py-2 rounded-2xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all cursor-pointer"
                >
                  👤 دخول كطالب / ضيف
                </button>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* ─── LIVE HOMEPAGE VIEWPORT ─── */}
      <main className="relative">
        {selectedDesign === 'campus_pop' && (
          <CampusPopHome
            posts={filteredPosts}
            onLike={handleLike}
            onAddComment={handleAddComment}
            onAddPost={handleAddPost}
            opportunities={opportunities}
            onApplyOpportunity={handleApplyOpportunity}
            stories={stories}
            onViewStory={handleViewStory}
            institutions={SEEDED_INSTITUTIONS}
            currentUser={currentUser}
            onLogout={() => setCurrentUser(null)}
            onTriggerAuth={() => {
              setAuthFormType('login');
              setShowAuthModal(true);
            }}
            univFilter={univFilter}
            setUnivFilter={setUnivFilter}
            govFilter={govFilter}
            setGovFilter={setGovFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {selectedDesign === 'neon_social' && (
          <NeonSocialHome
            posts={filteredPosts}
            onLike={handleLike}
            onAddComment={handleAddComment}
            onAddPost={handleAddPost}
            opportunities={opportunities}
            onApplyOpportunity={handleApplyOpportunity}
            stories={stories}
            onViewStory={handleViewStory}
            institutions={SEEDED_INSTITUTIONS}
            currentUser={currentUser}
            onLogout={() => setCurrentUser(null)}
            onTriggerAuth={() => {
              setAuthFormType('login');
              setShowAuthModal(true);
            }}
            univFilter={univFilter}
            setUnivFilter={setUnivFilter}
            govFilter={govFilter}
            setGovFilter={setGovFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {selectedDesign === 'soft_premium' && (
          <SoftPremiumHome
            posts={filteredPosts}
            onLike={handleLike}
            onAddComment={handleAddComment}
            onAddPost={handleAddPost}
            opportunities={opportunities}
            onApplyOpportunity={handleApplyOpportunity}
            stories={stories}
            onViewStory={handleViewStory}
            institutions={SEEDED_INSTITUTIONS}
            currentUser={currentUser}
            onLogout={() => setCurrentUser(null)}
            onTriggerAuth={() => {
              setAuthFormType('login');
              setShowAuthModal(true);
            }}
            univFilter={univFilter}
            setUnivFilter={setUnivFilter}
            govFilter={govFilter}
            setGovFilter={setGovFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {selectedDesign === 'iraqi_youth' && (
          <IraqiYouthHome
            posts={filteredPosts}
            onLike={handleLike}
            onAddComment={handleAddComment}
            onAddPost={handleAddPost}
            opportunities={opportunities}
            onApplyOpportunity={handleApplyOpportunity}
            stories={stories}
            onViewStory={handleViewStory}
            institutions={SEEDED_INSTITUTIONS}
            currentUser={currentUser}
            onLogout={() => setCurrentUser(null)}
            onTriggerAuth={() => {
              setAuthFormType('login');
              setShowAuthModal(true);
            }}
            univFilter={univFilter}
            setUnivFilter={setUnivFilter}
            govFilter={govFilter}
            setGovFilter={setGovFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}

        {selectedDesign === 'future_campus' && (
          <FutureCampusHome
            posts={filteredPosts}
            onLike={handleLike}
            onAddComment={handleAddComment}
            onAddPost={handleAddPost}
            opportunities={opportunities}
            onApplyOpportunity={handleApplyOpportunity}
            stories={stories}
            onViewStory={handleViewStory}
            institutions={SEEDED_INSTITUTIONS}
            currentUser={currentUser}
            onLogout={() => setCurrentUser(null)}
            onTriggerAuth={() => {
              setAuthFormType('login');
              setShowAuthModal(true);
            }}
            univFilter={univFilter}
            setUnivFilter={setUnivFilter}
            govFilter={govFilter}
            setGovFilter={setGovFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
      </main>

      {/* ─── MODAL: STORY SLIDESHOW VIEWER ─── */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-[#020617]/95 backdrop-blur-md flex items-center justify-center p-4" dir="rtl">
          <div className="relative w-full max-w-sm bg-gradient-to-br from-slate-900 to-slate-950 p-[1.5px] rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
            {/* Countdown bars at the top */}
            <div className="absolute top-3 inset-x-4 flex gap-1 z-20">
              <div className="h-1 bg-gradient-to-r from-teal-400 to-[#84CC16] rounded-full flex-1 transition-all duration-3000 w-full animate-pulse"></div>
            </div>

            <div className="relative p-6 pt-10 flex flex-col justify-between h-[450px]">
              
              {/* User Identity info inside stories box */}
              <div className="flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <img 
                    src={activeStory.userAvatar} 
                    alt={activeStory.userName} 
                    className="w-10 h-10 rounded-full border-2 border-white object-cover shadow"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-right">
                    <h4 className="text-white font-black text-xs">{activeStory.userName}</h4>
                    <p className="text-[10px] text-cyan-300">{activeStory.university}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveStory(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Story Visual Backdrop or Gradient box */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${activeStory.gradient} opacity-20 pointer-events-none`}></div>

              {/* Middle Large Story Content */}
              <div className="my-auto z-10 text-center px-4 space-y-4">
                <blockquote className="text-white text-lg md:text-xl font-bold leading-normal tracking-wide drop-shadow select-none">
                  “{activeStory.caption}”
                </blockquote>
                <span className="inline-block bg-[#020617]/60 text-[#84CC16] text-[9px] font-mono tracking-widest px-2.5 py-1 rounded border border-white/5">
                  #STUDENT_VOICE_STATION
                </span>
              </div>

              {/* Action reply inside modal */}
              <div className="z-10 bg-white/5 p-3 rounded-2xl border border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-slate-300">أرسل رداً خاصاً بالدردشة...</span>
                <button 
                  onClick={() => {
                    alert(`أرسلت رداً للتواصل مع ${activeStory.userName}! 📬`);
                    setActiveStory(null);
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  رد سريع
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL: INTEGRATION AUTHENTICATION FLOW (LOGIN & REGISTER) ─── */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-[#020617]/70 backdrop-blur-xs flex items-center justify-center p-4" dir="rtl">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-sm border border-slate-200 shadow-2xl relative animate-fadeIn scale-100">
            {/* Branding dynamic style bar depending on active variant */}
            <div className={`h-2.5 ${
              selectedDesign === 'campus_pop' ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-sky-400' :
              selectedDesign === 'neon_social' ? 'bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-blue-600' :
              selectedDesign === 'soft_premium' ? 'bg-indigo-600' :
              selectedDesign === 'iraqi_youth' ? 'bg-orange-500' :
              'bg-[#84CC16]'
            }`} />

            <div className="p-6 md:p-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {authFormType === 'login' ? 'مرحباً بك مجدداً!' : 'أنشئ حساباً كطالب'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    أكمل الخطوات البسيطة للانضمام لشبكة كليتك
                  </p>
                </div>
                <button 
                  onClick={() => setShowAuthModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Real form */}
              <form onSubmit={handleMockLogin} className="space-y-4">
                {authFormType === 'register' && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">الاسم الكامل</label>
                    <input
                      type="text"
                      placeholder="مهدي المنتظر"
                      value={authFormData.name}
                      onChange={(e) => setAuthFormData({ ...authFormData, name: e.target.value })}
                      required
                      className="w-full text-xs px-3 py-2.5 border border-slate-250 rounded-xl bg-slate-50 focus:outline-none focus:bg-white"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">البريد الإلكتروني الجامعي</label>
                  <input
                    type="email"
                    placeholder="student@uobaghdad.edu.iq"
                    value={authFormData.email}
                    onChange={(e) => setAuthFormData({ ...authFormData, email: e.target.value })}
                    required
                    className="w-full text-xs px-3 py-2.5 border border-slate-250 rounded-xl bg-slate-50 focus:outline-none focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">كلمة المرور الكليّة</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={authFormData.password}
                    onChange={(e) => setAuthFormData({ ...authFormData, password: e.target.value })}
                    required
                    className="w-full text-xs px-3 py-2.5 border border-slate-250 rounded-xl bg-slate-50 focus:outline-none focus:bg-white"
                  />
                </div>

                {authFormType === 'register' ? (
                  <>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">رقم الهاتف العراقي (مطلوب)</label>
                      <input
                        type="tel"
                        placeholder="07xxxxxxxxx"
                        value={authFormData.phoneNumber}
                        onChange={(e) => setAuthFormData({ ...authFormData, phoneNumber: e.target.value })}
                        required
                        className="w-full text-xs px-3 py-2.5 border border-slate-250 rounded-xl bg-slate-50 focus:outline-none focus:bg-white font-mono text-left"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">المحافظة (مطلوب)</label>
                      <select
                        value={authFormData.governorate}
                        onChange={(e) => setAuthFormData({ ...authFormData, governorate: e.target.value })}
                        required
                        className="w-full text-xs px-3 py-2.5 border border-slate-250 rounded-xl bg-slate-50 focus:outline-none focus:bg-white cursor-pointer font-bold text-right hover:border-[#8B5CF6]/50 transition-colors"
                      >
                        {GOVERNORATES.map((gov, i) => (
                          <option key={i} value={gov}>{gov}</option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">حدد كليتك / جامعتك العراقية</label>
                    <select
                      value={authFormData.university}
                      onChange={(e) => setAuthFormData({ ...authFormData, university: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 border border-slate-250 rounded-xl bg-slate-50 focus:outline-none focus:bg-white cursor-pointer font-bold"
                    >
                      {UNIVERSITIES.map((uni, i) => (
                        <option key={i} value={uni}>{uni}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Submissions button (styled dynamically under the format rules) */}
                <button
                  type="submit"
                  className={`w-full py-2.5 text-xs font-black text-center text-white rounded-xl cursor-pointer ${
                    selectedDesign === 'campus_pop' ? 'bg-[#8B5CF6] hover:bg-fuchsia-600 shadow-md' :
                    selectedDesign === 'neon_social' ? 'bg-gradient-to-r from-cyan-400 to-[#2563EB] shadow-lg' :
                    selectedDesign === 'soft_premium' ? 'bg-[#1D4ED8] hover:bg-slate-800' :
                    selectedDesign === 'iraqi_youth' ? 'bg-[#EA580C] hover:bg-amber-600' :
                    'bg-indigo-600 hover:bg-cyan-500'
                  }`}
                >
                  {authFormType === 'login' ? 'سجل الدخول الحين 🔓' : 'سجل اهتمامك بالمنتدى 🚀'}
                </button>
              </form>

              {/* Sub-toggle link */}
              <div className="pt-2 text-center">
                {authFormType === 'login' ? (
                  <p className="text-[11px] text-slate-400">
                    أول مرة تشارك ويانا؟{' '}
                    <button 
                      onClick={() => setAuthFormType('register')}
                      className="text-[#1D4ED8] hover:underline font-bold cursor-pointer"
                    >
                      افتح حساب طالب جديد
                    </button>
                  </p>
                ) : (
                  <p className="text-[11px] text-slate-400">
                    تمتلك مسبقاً حساب دراسي؟{' '}
                    <button 
                      onClick={() => setAuthFormType('login')}
                      className="text-[#1D4ED8] hover:underline font-bold cursor-pointer"
                    >
                      اضغط للتسجيل السريع
                    </button>
                  </p>
                )}
              </div>

              {/* Forgot password option to fit prompt's "forgot password" flow */}
              <div className="border-t border-slate-100 pt-4 text-center">
                <button 
                  onClick={() => alert('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني الجامعي 📧🔑')}
                  className="text-[10px] text-slate-401 hover:text-slate-600 font-bold underline cursor-pointer"
                >
                  نسيت كلمة المرور؟ استعدها الحين
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ─── BOTTOM APP NAV BAR FOR RESPONSIVE MOBILE SIZES ─── */}
      <footer className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-200 py-3.5 px-4 shadow-lg lg:hidden block" dir="rtl">
        <div className="flex items-center justify-around text-center">
          <button 
            onClick={() => { setUnivFilter(''); setGovFilter(''); setSearchQuery(''); }}
            className={`flex flex-col items-center gap-1 cursor-pointer hover:text-indigo-600 ${!univFilter && !govFilter && !searchQuery ? 'text-indigo-600 font-black' : 'text-slate-400'}`}
          >
            <span className="text-lg">🏕️</span>
            <span className="text-[9px]">الرئيسية</span>
          </button>
          
          <button 
            onClick={() => {
              const el = document.getElementById('opp-feed');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex flex-col items-center gap-1 text-slate-400 cursor-pointer hover:text-indigo-600"
          >
            <span className="text-lg">🎁</span>
            <span className="text-[9px]">الفرص</span>
          </button>
          
          <button 
            onClick={() => {
              if (currentUser) {
                // mock post triggers
                const modal = document.querySelector('button[onClick*="showCreatePost"]');
                (modal as HTMLButtonElement | null)?.click();
              } else {
                onTriggerAuth();
              }
            }}
            className="flex flex-col items-center gap-1 text-slate-404 cursor-pointer hover:text-indigo-600"
          >
            <span className="text-lg">✍️</span>
            <span className="text-[9px]">انشر</span>
          </button>
          
          <button 
            onClick={() => {
              if (currentUser) setCurrentUser(null);
              else {
                setAuthFormType('login');
                setShowAuthModal(true);
              }
            }}
            className="flex flex-col items-center gap-1 text-slate-400 cursor-pointer hover:text-indigo-600"
          >
            <span className="text-lg">👤</span>
            <span className="text-[9px]">{currentUser ? 'الحساب' : 'دخول'}</span>
          </button>
        </div>
      </footer>

    </div>
  );

  // Helper trigger function for auth integration inside mobile view
  function onTriggerAuth() {
    setAuthFormType('login');
    setShowAuthModal(true);
  }
}
