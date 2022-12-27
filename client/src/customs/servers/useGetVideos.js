import { useQuery } from '@tanstack/react-query';

export default function useGetVideos(options = {}) {
  return useQuery({
    queryKey: [`/videos?sort[createdAt]=desc`],
    cacheTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
    ...options,
  });
}
