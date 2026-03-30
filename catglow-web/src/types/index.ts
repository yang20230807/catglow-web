export interface Author {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  bio?: string;
}

export interface Video {
  id: number;
  title: string;
  content?: string;
  videoUrl?: string;
  coverUrl?: string;
  images?: string[];  // 多张图片
  author: Author;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  description?: string;
  createdAt?: string;
}

export interface FeedResponse {
  list: Video[];
  hasMore: boolean;
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface User {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  bio?: string;
  createdAt?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  nickname?: string;
}

export interface Comment {
  id: number;
  user: Author;
  postId: number;
  parentId: number | null;
  rootId: number | null;
  content: string;
  likeCount: number;
  replyCount: number;
  replies?: Comment[];
  createdAt?: string;
}

export interface Friend {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  isFollowing: boolean;
}
