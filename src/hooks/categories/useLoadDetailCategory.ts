import { useQuery } from "@tanstack/react-query";
import { rootApiService } from "~/services";
import { endpoints } from "~/services/endpoints";

export const useLoadDetailCategory = (id: string) => {
  const url = endpoints.categories_detail(id);

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [url],
    queryFn: () => rootApiService.get(url),
    enabled: !!id,
  });

  const formatData = data?.data;

  return {
    data: formatData,
    isLoading,
    refetch,
    error,
  };
};
