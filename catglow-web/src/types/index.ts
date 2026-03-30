export interface Author {
  id: number;
  nickname: string;
  avatar: string;
}

export interface Video {
  id: number;
  title: string;
  videoUrl: string;
  coverUrl: string;
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
