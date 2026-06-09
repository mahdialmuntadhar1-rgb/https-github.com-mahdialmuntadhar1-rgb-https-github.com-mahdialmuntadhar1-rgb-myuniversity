export interface User {
  id: string;
  name: string;
  avatar: string;
  university: string;
  governorate: string;
  role: 'student' | 'institution' | 'admin' | 'guest';
  phoneNumber?: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorUniversity: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    university: string;
    governorate: string;
    verified: boolean;
  };
  content: string;
  imageUrl?: string;
  gradientStyle?: string; // fallback illustration style if no URL
  likes: number;
  comments: Comment[];
  hasLiked?: boolean;
  createdAt: string;
  tag: string;
  category: 'social' | 'academic' | 'announcement';
}

export interface Opportunity {
  id: string;
  title: string;
  institution: string;
  logo: string;
  type: string; // 'scholarship' | 'internship' | 'workshop' | 'job'
  location: string;
  duration: string;
  deadline: string;
  tags: string[];
  applied?: boolean;
  description?: string;
}

export interface Story {
  id: string;
  userName: string;
  userAvatar: string;
  university: string;
  mediaUrl?: string;
  gradient: string;
  caption: string;
  viewed: boolean;
}

export interface Institution {
  id: string;
  name: string;
  logo: string;
  type: string; // 'University' | 'Tech Hub' | 'NGO'
  location: string;
  studentsCount: number;
  featured?: boolean;
}

export type DesignVariant = 'campus_pop' | 'neon_social' | 'soft_premium' | 'iraqi_youth' | 'future_campus';
