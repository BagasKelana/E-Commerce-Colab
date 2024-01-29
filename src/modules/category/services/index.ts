import { httpService } from '@/helpers/httpService';

import { CategoryResponse } from '../modules/category';

export const CategoryServices = {
  getCategory: () =>
    httpService.get<CategoryResponse>('/category').then((res) => res.data)
};
