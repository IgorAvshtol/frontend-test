import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getPosts } from '@store/postsThunk.ts';
import { Post, PostsState } from '@/interfaces';

export const initialState: PostsState = {
  posts: [],
  error: false,
  loading: false,
  currentPage: 0,
};

export const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setNewPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(
        getPosts.fulfilled.type,
        (state, action: PayloadAction<Post[]>) => {
          state.posts = action.payload;
          state.loading = false;
          state.error = false;
        },
      )
      .addCase(getPosts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setNewPage } = postsReducer.actions;
