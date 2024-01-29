import { useQuery, UseQueryOptions } from 'react-query';

import { HttpError } from '@/types/HttpResponse';

import { CategoryResponse } from '../modules/category';
import { CategoryServices } from '../services';

export const useCategory = (
  options?: UseQueryOptions<CategoryResponse, HttpError>
) =>
  useQuery({
    queryKey: ['category'],
    queryFn: () => CategoryServices.getCategory(),
    ...options
  });
