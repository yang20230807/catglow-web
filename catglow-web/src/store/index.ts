import { create } from 'zustand';
import type { Video } from '../types';

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
