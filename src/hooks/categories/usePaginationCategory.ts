import { useQuery } from "@tanstack/react-query";
import { rootApiService } from "~/services";
import { endpoints } from "~/services/endpoints";

export const usePaginationCategory = () => {
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [endpoints.categories_pagination],
    queryFn: () => rootApiService.get(endpoints.categories_pagination),
  });

  const formatData = data?.data?.content ?? [];

  return {
    data: formatData,
    total: data?.total || 0,
    isLoading,
    refetch,
    error,
  };
};
