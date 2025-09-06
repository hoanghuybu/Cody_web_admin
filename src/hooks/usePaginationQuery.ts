import { useQuery } from "@tanstack/react-query";
import { PaginationParams, PaginationResponse } from "~/dto/pagination.dto";
import { rootApiService } from "~/services";

export const usePaginationQuery = <T>(
  endpoint: string,
  params: PaginationParams
) => {
  const { page, size, ...rest } = params;

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: [endpoint, params],
    queryFn: async () => {
      const cleanParams = Object.fromEntries(
        Object.entries({ page, size, ...rest }).filter(
          ([, v]) => v !== undefined && v !== null && String(v) !== ""
        )
      );

      const res = await rootApiService.get(endpoint, cleanParams);
      return res.data as PaginationResponse<T>;
    },
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
