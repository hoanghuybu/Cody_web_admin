import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeStatusDTO } from "~/dto/orders/changeStatus.dto";
import { rootApiService, toastService } from "~/services";
import { endpoints } from "~/services/endpoints";

export interface ChangeStatusOrdersResponse {
  status: boolean;
  message: string;
}

const useChangeStatusOrder = (id: string) => {
  const queryClient = useQueryClient();
  const url = endpoints.orders_change_status(id);
  const { isPending, isError, data, error, mutateAsync } = useMutation({
    mutationFn: (variables: ChangeStatusDTO) => {
      return rootApiService.post<ChangeStatusOrdersResponse>(url, variables);
    },
    onSuccess: (res: ChangeStatusOrdersResponse) => {
      queryClient.invalidateQueries({
        queryKey: [endpoints.orders_pagination],
      });
      toastService.success(res.message ?? "Đổi trạng thái thành công");
    },
    onError: (err) => {
      toastService.error(err.message ?? "Đã có lỗi xảy ra");
    },
  });
  return {
    isLoading: isPending,
    isError,
    data,
    error,
    onChangeOrderStatus: mutateAsync,
  };
};

export default useChangeStatusOrder;
