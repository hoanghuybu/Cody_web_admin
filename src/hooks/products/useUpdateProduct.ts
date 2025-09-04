import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rootApiService, toastService } from "~/services/@common";
import { endpoints } from "~/services/endpoints";
import { CreateProductBody } from "./useCreateProduct";

export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient();
  const url = endpoints.product_update(id);

  const {
    data,
    mutate: onUpdateProduct,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (data: CreateProductBody) => {
      return rootApiService.put(url, data);
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [endpoints.pagination],
      });
      queryClient.invalidateQueries({
        queryKey: [endpoints.product_detail(id)],
      });
      toastService.success(res.message);
    },
    onError: (error: any) => {
      toastService.error(error?.message);
    },
  });

  return { data, onUpdateProduct, isLoading: isPending, isError, isSuccess };
};
