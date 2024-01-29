import { HttpResponse } from 'src/types/HttpResponse';

export type CategoryResponse = HttpResponse<Category[]> | undefined;

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  item_count: number;
  created_at: null;
  updated_at: null;
  deleted_at: null;
}
