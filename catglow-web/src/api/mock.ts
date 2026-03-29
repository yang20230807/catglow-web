import type { Video, FeedResponse } from '../types';

const mockVideos: Video[] = [
  {
    id: '1',
    title: '🎉 CatGlow 第一条视频！来看看这个超酷的内容平台',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    coverUrl: 'https://picsum.photos/seed/1/400/800',
    author: {
      id: 'u1',
      nickname: 'CatGlow官方',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=catglow',
    },
    likeCount: 1234,
    commentCount: 88,
    shareCount: 45,
    description: '欢迎来到 CatGlow！这里是内容创作者的乐园～',
    createdAt: '2026-03-29 10:00:00',
  },
  {
    id: '2',
    title: '🏖️ 夏日海滩风情，阳光沙滩比基尼',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    coverUrl: 'https://picsum.photos/seed/2/400/800',
    author: {
      id: 'u2',
      nickname: '旅行博主小王',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travel',
    },
    likeCount: 5678,
    commentCount: 234,
    shareCount: 89,
    description: '阳光明媚的一天～',
    createdAt: '2026-03-28 15:30:00',
  },
  {
    id: '3',
    title: '🎮 游戏实况：这个Boss也太难了吧！',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    coverUrl: 'https://picsum.photos/seed/3/400/800',
    author: {
      id: 'u3',
      nickname: '游戏达人',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=gaming',
    },
    likeCount: 9999,
    commentCount: 666,
    shareCount: 123,
    description: '打了三天终于过了！',
    createdAt: '2026-03-27 20:00:00',
  },
  {
    id: '4',
    title: '🍜 深夜食堂：教你做一碗正宗的牛肉面',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    coverUrl: 'https://picsum.photos/seed/4/400/800',
    author: {
      id: 'u4',
      nickname: '美食家小李',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=food',
    },
    likeCount: 4321,
    commentCount: 156,
    shareCount: 78,
    description: '汤底是关键～',
    createdAt: '2026-03-26 22:00:00',
  },
  {
    id: '5',
    title: '🎵 钢琴弹唱《晴天》，听完想谈恋爱',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    coverUrl: 'https://picsum.photos/seed/5/400/800',
    author: {
      id: 'u5',
      nickname: '音乐精灵',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=music',
    },
    likeCount: 8888,
    commentCount: 432,
    shareCount: 200,
    description: '周杰伦这首真的太经典了～',
    createdAt: '2026-03-25 18:00:00',
  },
  {
    id: '6',
    title: '🐱 猫咪合集：100只猫猫卖萌的瞬间',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    coverUrl: 'https://picsum.photos/seed/6/400/800',
    author: {
      id: 'u6',
      nickname: '吸猫俱乐部',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=cat',
    },
    likeCount: 20000,
    commentCount: 1000,
    shareCount: 500,
    description: '可爱死啦～～～',
    createdAt: '2026-03-24 12:00:00',
  },
];

export const mockApi = {
  getRecommend: async (page = 1, pageSize = 10): Promise<FeedResponse> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const list = mockVideos.slice(start, end);

    return {
      list,
      hasMore: end < mockVideos.length,
    };
  },

  search: async (keyword: string, page = 1, pageSize = 10): Promise<FeedResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const filtered = mockVideos.filter((v) =>
      v.title.toLowerCase().includes(keyword.toLowerCase()) ||
      v.author.nickname.toLowerCase().includes(keyword.toLowerCase())
    );

    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const list = filtered.slice(start, end);

    return {
      list,
      hasMore: end < filtered.length,
    };
  },

  getVideo: async (id: string): Promise<Video> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const video = mockVideos.find((v) => v.id === id);
    if (!video) throw new Error('Video not found');
    return video;
  },
};
