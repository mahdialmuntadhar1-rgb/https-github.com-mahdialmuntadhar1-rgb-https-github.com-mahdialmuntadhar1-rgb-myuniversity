import { Post, Opportunity, Story, Institution, User } from './types';

export const UNIVERSITIES = [
  'جامعة بغداد',
  'جامعة النهرين',
  'الجامعة التكنولوجية',
  'جامعة تيشك الدولية',
  'جامعة السليمانية',
  'جامعة بابل',
  'جامعة البصرة',
  'كلية الرافدين الجامعة'
];

export const GOVERNORATES = [
  'بغداد',
  'البصرة',
  'نينوى',
  'أربيل',
  'النجف',
  'السليمانية',
  'بابل',
  'الأنبار',
  'كربلاء',
  'كركوك',
  'دهوك',
  'ذي قار',
  'ميسان',
  'المثنى',
  'القادسية',
  'واسط',
  'صلاح الدين',
  'ديالى',
  'حلبجة'
];

export const SEEDED_USER: User = {
  id: 'user_1',
  name: 'علي الرافد',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150',
  university: 'جامعة بغداد',
  governorate: 'بغداد',
  role: 'student'
};

export const INITIAL_STORIES: Story[] = [
  {
    id: 's1',
    userName: 'نور الهدى',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    university: 'جامعة النهرين',
    gradient: 'from-pink-500 via-purple-500 to-indigo-500',
    caption: 'أخيراً اكملنا مشروع التخرج! 🎓✨ #حاسبات',
    viewed: false
  },
  {
    id: 's2',
    userName: 'أحمد البصراوي',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    university: 'جامعة البصرة',
    gradient: 'from-orange-500 to-red-600',
    caption: 'غروب ساحر من كورنيش شط العرب بعد الدراسة 🌅📖',
    viewed: false
  },
  {
    id: 's3',
    userName: 'سارة الكردية',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    university: 'جامعة تيشك الدولية',
    gradient: 'from-teal-400 to-emerald-600',
    caption: 'أجواء رائعة في حرم الجامعة بأربيل 🏛️❄️',
    viewed: false
  },
  {
    id: 's4',
    userName: 'مصطفى النجفي',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    university: 'جامعة الكوفة',
    gradient: 'from-amber-400 to-pink-600',
    caption: 'مستعد لمسابقة البرمجة الوطنية غداً! دعواتكم 💻🔥',
    viewed: true
  },
  {
    id: 's5',
    userName: 'مريم البابلية',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    university: 'جامعة بابل',
    gradient: 'from-violet-600 to-blue-500',
    caption: 'انضموا إلينا في المبادرة البيئية في الحلة اليوم 🌱🧺',
    viewed: true
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: {
      name: 'زينب الموسوي',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150',
      university: 'الجامعة التكنولوجية',
      governorate: 'بغداد',
      verified: true
    },
    content: 'شباب، هل أحد جرب التدريب الصيفي في المحطات الأهلية لو شركات الاتصالات؟ شنو أفضل خيار لطالب هندسة برمجيات في بغداد من ناحية الخبرة العملية؟ تفيدني ارائكم! الكل تمدح بشركة آسيا سيل وزين 💻🧐',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
    likes: 42,
    tag: '#طلب_تدريب',
    category: 'academic',
    createdAt: 'قبل ساعتين',
    comments: [
      {
        id: 'c1',
        authorName: 'حسن الجبوري',
        authorAvatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=150',
        authorUniversity: 'جامعة بغداد',
        content: 'تدريب شركة زين العراق ممتاز جداً العام الماضي سويت هناك ونطونا شهادة قوية وخبرة رهيبة.',
        createdAt: 'قبل ساعة'
      },
      {
        id: 'c2',
        authorName: 'ملاك التميمي',
        authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        authorUniversity: 'الجامعة التكنولوجية',
        content: 'صحيح وأكو بعد حاضنة "المحطة" ريادة الأعمال، يسوون ورش تفيد وتفتح أبواب توظيف.',
        createdAt: 'قبل ٣٠ دقيقة'
      }
    ]
  },
  {
    id: 'p2',
    author: {
      name: 'رودي سليمان',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
      university: 'جامعة السليمانية',
      governorate: 'السليمانية',
      verified: false
    },
    content: 'افتتاح التسجيل على النادي البرمجي الطلابي بجامعة السليمانية! 🚀 راح نتعلم خوارزميات وتصميم تطبيقات من الصفر. الجلسات راح تكون كل سبت الساعة ١٠ صباحاً. الحضور مفتوح للكل، حتى زملائنا من كركوك وأربيل أهلاً بيكم.',
    gradientStyle: 'bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500',
    likes: 67,
    tag: '#أندية_طلابية',
    category: 'social',
    createdAt: 'قبل ٤ ساعات',
    comments: [
      {
        id: 'c3',
        authorName: 'سنا كمال',
        authorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=150',
        authorUniversity: 'جامعة تيشك الدولية',
        content: 'كلش حابة احضر وياكم! هل الجلسات متوفرة اونلاين؟ 😍',
        createdAt: 'قبل ساعتين'
      }
    ]
  },
  {
    id: 'p3',
    author: {
      name: 'جامعة بغداد - الإعلانات الرسمية',
      avatar: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=150',
      university: 'جامعة بغداد',
      governorate: 'بغداد',
      verified: true
    },
    content: '🚨 إعلان هام: تقرر تمديد موعد التقديم على المنح الدراسية المخصصة للمحافظات الجنوبية في الأقسام الداخلية بجامعة بغداد لغاية نهاية الأسبوع الجاري. يرجى تقديم المستمسكات والملأ في عمادة القبول والتسجيل بـ الجادرية.',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    likes: 124,
    tag: '#إعلان_رسمي',
    category: 'announcement',
    createdAt: 'قبل ٦ ساعات',
    comments: []
  },
  {
    id: 'p4',
    author: {
      name: 'كرار الدراجي',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
      university: 'جامعة النهرين',
      governorate: 'بغداد',
      verified: false
    },
    content: 'مكتبة الكلية كنز مدفون! اليوم لكيت كتب أصلية بالتصميم المعماري من السبعينات هاردكور. منو يحب نسوي مجموعة قراءة ونلخصها أسبوعياً؟ 📚📐',
    likes: 29,
    tag: '#ثقافة_وكتب',
    category: 'social',
    createdAt: 'قبل يوم',
    comments: [
      {
        id: 'c4',
        authorName: 'فاطمة العبيدي',
        authorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=150',
        authorUniversity: 'جامعة النهرين',
        content: 'سجلني وياك كرار! كنت أدور على كتب التخطيط العمراني مال المهندسة زها حديد.',
        createdAt: 'قبل ١٨ ساعة'
      }
    ]
  },
  {
    id: 'p5',
    author: {
      name: 'مقتدى الهلالي',
      avatar: 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&q=80&w=150',
      university: 'جامعة البصرة',
      governorate: 'البصرة',
      verified: false
    },
    content: 'منو طالع بكرة في الرحلة العلمية مال قسم الجيولوجيا إلى قضاء الفاو والبحيرات الملحية؟ نجمع هنا علمود نتشارك المواصلات والأكل 🏜️🚗',
    gradientStyle: 'bg-gradient-to-tr from-amber-500 to-orange-600',
    likes: 18,
    tag: '#رحلات_علمية',
    category: 'social',
    createdAt: 'قبل يومين',
    comments: []
  }
];

export const SEEDED_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'op1',
    title: 'مخيم بابل الصيفي لتدريب مطوري الويب',
    institution: 'مؤسسة المحطة لريادة الأعمال',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=100',
    type: 'تدريب صيفي',
    location: 'بغداد، كرادة وشبكة الفروع',
    duration: '٦ أسابيع',
    deadline: 'تقديم مفتوح لغاية ٢٠ حزيران',
    tags: ['React', 'NodeJS', 'العمل الجماعي', 'مجاني'],
    applied: false,
    description: 'تدريب عملي مكثف يركز على تزويد الطلبة بالمهارات الأساسية لتطوير تطبيقات الويب الحديثة وحل المشكلات مع مشروعات تخرج حقيقية.'
  },
  {
    id: 'op2',
    title: 'برنامج المنح التركية لطلاب البكالوريوس العراقيين',
    institution: 'وزارة التعليم العالي والبحث العلمي',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=100',
    type: 'منحة دراسية',
    location: 'تركيا (جامعات متعددة)',
    duration: '٤ سنوات كاملة',
    deadline: 'متبقي ٣ أيام للتقديم',
    tags: ['بكالوريوس', 'تغطية كاملة', 'هندسة/طب'],
    applied: false,
    description: 'منحة ممولة بالكامل تشمل رسوم الدراسة الجامعية، الأقساط الداخلية، السكن والمشرفين الأكاديميين لجميع الطلبة المتفوقين.'
  },
  {
    id: 'op3',
    title: 'مسابقة الابتكار وحلول البيئة الرقمية للاستدامة',
    institution: 'فايف وان لابس (51 Labs)',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=100',
    type: 'منافسة تمويل',
    location: 'أربيل - السليمانية - بغداد',
    duration: 'مخيم مكثف ٣ أيام',
    deadline: 'تنتهي في ٥ تموز',
    tags: ['جوائز مالية', 'حاضنة أعمال', 'البيئة'],
    applied: false,
    description: 'شارك بفكرتك التقنية لحماية البيئة واستحصل على تمويل أولي وتوجيه احترافي من خبراء ريادة الأعمال لمشروعك الريادي الناشئ.'
  },
  {
    id: 'op4',
    title: 'تدريب مدفوع الأجر في قسم التسويق والمبيعات الرقمية',
    institution: 'شركة آسيا سيل للاتصالات',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100',
    type: 'وظيفة طلابية',
    location: 'بغداد، شارع الصناعة',
    duration: '٣ أشهر (دوام جزئي)',
    deadline: 'قبل نهاية تموز',
    tags: ['تسويق رقمي', 'مدفوع الأجر', 'دوام مرن'],
    applied: false,
    description: 'فرصة عمل وتدريب مدفوعة الأجر لطلبة كليات الإدارة والاقتصاد والأقسام ذات العلاقة لاكتساب معارف استثنائية في إدارة الحملات.'
  }
];

export const SEEDED_INSTITUTIONS: Institution[] = [
  {
    id: 'inst1',
    name: 'مؤسسة المحطة ريادة وأعمال',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100',
    type: 'NGO & Co-working',
    location: 'بغداد والموصل',
    studentsCount: 1420,
    featured: true
  },
  {
    id: 'inst2',
    name: 'فايف وان لابس (51 Labs)',
    logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=100',
    type: 'حاضنة أعمال تكنولوجية',
    location: 'العراق كله',
    studentsCount: 890,
    featured: true
  },
  {
    id: 'inst3',
    name: 'أكاديمية كود العراقي',
    logo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=100',
    type: 'منصة تدريب تكنولوجي',
    location: 'أونلاين + بغداد',
    studentsCount: 3250,
    featured: false
  }
];
