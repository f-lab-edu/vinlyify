import { getRecommendations } from '@/api/spotify';
import { useQuery } from '@tanstack/react-query';

export const useRecommendations = () => {
  return useQuery({
    queryKey: useRecommendations.queryKey(),
    queryFn: () => getRecommendations(),
  });
};

useRecommendations.queryKey = () => ['recommendations'];
