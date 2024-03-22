export interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  author_id: number;
  author_name?: string;
  author_avatar?: string;
  category_blog_id: number;
  category_blog_name?: string;
  banner: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}
