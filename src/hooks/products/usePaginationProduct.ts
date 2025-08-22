
import { useQuery } from "@tanstack/react-query";
import { rootApiService } from "~/services";
import { endpoints } from "~/services/endpoints";

export const usePaginationProduct = (
) => {
    const { data, isLoading, refetch, error } = useQuery({
        queryKey: [endpoints.pagination],
        queryFn: () => rootApiService.get(endpoints.pagination),
    });


    return {
        data: data?.data || [],
        total: data?.total || 0,
        isLoading,
        refetch,
        error,
    };
};
