import { searchFromMyTopOne, searchKeyword } from '@/api/spotify';
import { useQuery } from '@tanstack/react-query';

export const useSearchKeyword = (keyword: string | null) => {
  // 검색어를 입력하지 않은 경우 내 top1 아티스트 기준으로
  const { data } = useQuery({
    queryKey: useSearchKeyword.queryKey(),
    queryFn: () => searchFromMyTopOne().then(v => v.response),
  });

  const res = useQuery({
    queryKey: useSearchKeyword.queryKey(),
    queryFn: () => searchKeyword(keyword),
    enabled: false,
    initialData: data,
  });
  return res;
};
useSearchKeyword.queryKey = () => ['search', 'list'];
