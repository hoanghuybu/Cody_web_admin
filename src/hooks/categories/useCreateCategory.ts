import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rootApiService, toastService } from "~/services";
import { endpoints } from "~/services/endpoints";

export interface CreateCategoryBody {
  name: string;
  description: string;
  slug: string;
  metaDescription: string;
}

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createCategory,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (body: CreateCategoryBody) =>
      rootApiService.post(endpoints.categories_create, body),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [endpoints.categories_pagination],
      });
      toastService.success(res?.message ?? "Thành công");
    },
    onError: (error: any) => {
      toastService.error(error?.message);
    },
  });

  return {
    onCreateCategory: createCategory,
    isLoading: isPending,
    isSuccess,
    isError,
  };
};

export default useCreateCategory;
