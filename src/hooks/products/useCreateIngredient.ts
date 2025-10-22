import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rootApiService, toastService } from "~/services";
import { endpoints } from "~/services/endpoints";

export interface CreateIngredientBody {
  name: string;
}

const useCreateIngredient = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createIngredient,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (body: CreateIngredientBody) =>
      rootApiService.post(endpoints.ingredients_create, body),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [
          endpoints.ingredients_pagination,
          {
            page: 0,
            size: 100000000,
            sortBy: "name",
            sortDirection: "ASC",
          },
        ],
      });
      toastService.success(res?.message ?? "Thành công");
    },
    onError: (error: any) => {
      toastService.error(error?.message);
    },
  });

  return {
    onCreateIngredient: createIngredient,
    isLoading: isPending,
    isSuccess,
    isError,
  };
};

export default useCreateIngredient;
