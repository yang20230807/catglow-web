export interface Author {
  id: string;
  nickname: string;
  avatar: string;
}

export interface Video {
  id: string;
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
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}
