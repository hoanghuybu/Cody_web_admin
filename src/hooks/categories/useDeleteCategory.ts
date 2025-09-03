import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { rootApiService } from "~/services";
import { endpoints } from "~/services/endpoints";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  const {
    data,
    mutate: onDeleteCategory,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (id: string) => {
      return rootApiService.delete(endpoints.category_delete(id));
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

  return { data, onDeleteCategory, isLoading: isPending, isError, isSuccess };
};
