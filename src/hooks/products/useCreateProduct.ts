import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rootApiService, toastService } from "~/services";
import { endpoints } from "~/services/endpoints";

export interface CreateProductBody {
  name: string;
  description: string;
  slug: string;
  metaDescription: string;
  price: number;
  originalPrice: number;
  stockQuantity: number;
  categoryIds: string[];
  images: Image[];
}

export interface Image {
  imageUrl: string;
  isMain: boolean;
}

const useCreateProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: createProduct,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (body: CreateProductBody) =>
      rootApiService.post(endpoints.product_create, body),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({
        queryKey: [endpoints.pagination],
      });
      toastService.success(res?.message ?? "Thành công");
    },
    onError: (error: any) => {
      toastService.error(error?.message);
    },
  });

  return {
    onCreateProduct: createProduct,
    isLoading: isPending,
    isSuccess,
    isError,
  };
};

export default useCreateProduct;
