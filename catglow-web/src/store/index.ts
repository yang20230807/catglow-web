import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Video, User } from '../types';

interface FeedState {
  feedList: Video[];
  currentIndex: number;
  setFeedList: (list: Video[]) => void;
  appendFeed: (list: Video[]) => void;
  setCurrentIndex: (index: number) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  feedList: [],
  currentIndex: 0,
  setFeedList: (list) => set({ feedList: list }),
  appendFeed: (list) => set((state) => ({ feedList: [...state.feedList, ...list] })),
  setCurrentIndex: (index) => set({ currentIndex: index }),
}));

// 用户认证状态
interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) => set({ user, isLoggedIn: !!user }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'catglow-user',
    }
  )
);
