import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { rootApiService } from "~/services/@common";
import { endpoints } from "~/services/endpoints";
import { CreateCategoryBody } from "./useCreateCategory";

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();
  const url = endpoints.categories_update(id);

  const {
    data,
    mutate: onUpdateCategory,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (data: CreateCategoryBody) => {
      return rootApiService.put(url, data);
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [endpoints.categories_pagination],
      });
      message.success(res.message);
    },
    onError: (error: any) => {
      message.error(error?.message);
    },
  });

  return { data, onUpdateCategory, isLoading: isPending, isError, isSuccess };
};
