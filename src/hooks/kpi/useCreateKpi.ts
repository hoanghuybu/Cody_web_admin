import { useMutation } from "@tanstack/react-query";
import { rootApiService, toastService } from "~/services";
import { endpoints } from "~/services/endpoints";

export interface CreateKPIBody {
  title: string;
  description: string;
  dueDate: Date;
  assignToId: string;
  inputTargetValue: number;
  inputCurrentProgress: number;
  selledTargetValue: number;
  selledCurrentProgress: number;
}

const useCreateKpi = () => {
  // const queryClient = useQueryClient();

  const {
    mutateAsync: createKpi,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: (body: CreateKPIBody) =>
      rootApiService.post(endpoints.kpi_create, body),
    onSuccess: (res: any) => {
      // queryClient.invalidateQueries({
      //   queryKey: [endpoints.pagination],
      // });
      toastService.success(res?.message ?? "Thành công");
    },
    onError: (error: any) => {
      toastService.error(error?.message);
    },
  });

  return {
    onCreateKpi: createKpi,
    isLoading: isPending,
    isSuccess,
    isError,
  };
};

export default useCreateKpi;
