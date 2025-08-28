import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rootApiService, toastService } from "~/services";
import { endpoints } from "~/services/endpoints";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    data,
    mutate: onDeleteProduct,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (id: string) => {
      return rootApiService.delete(endpoints.product_delete(id));
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [endpoints.pagination],
      });
      toastService.success(res.message);
    },
    onError: (error: any) => {
      toastService.error(error?.message);
    },
  });

  return { data, onDeleteProduct, isLoading: isPending, isError, isSuccess };
};
