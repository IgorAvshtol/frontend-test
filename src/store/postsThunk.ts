import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '@/api';

export const getPosts = createAsyncThunk('postsData/getPosts', async (page: number) => {
  const response = await instance.get(`?_start=${page}&_limit=10`);
  return response.data;
});
