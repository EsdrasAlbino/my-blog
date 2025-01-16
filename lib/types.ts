export interface SendPost {
  title: string;
  content: string;
  image:string
  published: boolean;
  authorId: string;
}

export interface Post extends SendPost {
  id: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  image: string;
  posts: Post[];
  createdAt: string;
  updatedAt: string;
}
