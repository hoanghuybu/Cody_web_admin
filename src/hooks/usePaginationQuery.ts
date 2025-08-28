import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { PaginationParams, PaginationResponse } from "~/dto/pagination.dto";
import { rootApiService } from "~/services";

export const usePaginationQuery = <T>(
  endpoint: string,
  params: PaginationParams
) => {
  const { page, size, ...rest } = params;

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [endpoint, params], // tự động refetch khi params đổi
    queryFn: async () => {
      const query = new URLSearchParams({
        page: String(page),
        size: String(size),
        ...Object.fromEntries(
          Object.entries(rest).map(([k, v]) => [k, String(v)])
        ),
      });

      const res = await rootApiService.get(`${endpoint}?${query.toString()}`);
      return res.data.data as PaginationResponse<T>;
    },
    placeholderData: keepPreviousData,
  });

  return {
    data: data?.content ?? [],
    total: data?.totalElements ?? 0,
    page: data?.number ?? 0,
    size: data?.size ?? size,
    isLoading,
    refetch,
    error,
  };
};
