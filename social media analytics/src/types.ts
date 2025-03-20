export interface User {
  id: string;
  name: string;
  postCount: number;
}

export interface Post {
  id: string;
  userId: string;
  title: string;
  content: string;
  commentCount: number;
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  userId: string;
}