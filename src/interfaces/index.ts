export interface PostsState {
  posts: Post[];
  error: boolean;
  loading: boolean;
  currentPage: number;
}

export interface Post {
  id: number;
  title: string;
  body: string;
}
