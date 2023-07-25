import { AppRootState } from '@store/store.ts';

export const getAllPosts = (state: AppRootState) => state.posts.posts;
export const getCurrentPostsPage = (state: AppRootState) => state.posts.currentPage;
export const loadingPostsPage = (state: AppRootState) => state.posts.loading;
export const errorPostsPage = (state: AppRootState) => state.posts.error;
