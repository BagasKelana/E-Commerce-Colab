import { url } from '@/constants/url';

export function showImageAPI(path?: string | null) {
  if (path) {
    return `${url.image}/${path}`;
  }
  // default images
  return '/images/profile_3135715.png';
}
