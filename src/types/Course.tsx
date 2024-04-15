export interface Course {
  id: number;
  name: string;
  description: string;
  lessons: number;
  price: number;
  is_free: boolean;
  banner: string;
  status: number;
  duration: number;
  discount_percent: number;
  type_user_using?: number;
  lessons_present?: number;
}
