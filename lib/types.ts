export interface SendPost {
  title: string;
  content: string;
  published: boolean;
  authorId: string;
}

export interface Post extends SendPost {
  author: string;
  createdAt: string;
  updatedAt: string;
}
