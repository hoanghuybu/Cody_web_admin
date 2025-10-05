import { useMutation } from "@tanstack/react-query";
import { rootApiUploadFileService, toastService } from "~/services";
import { endpoints } from "~/services/endpoints";

export const useUploadImage = () => {
  const {
    data,
    mutateAsync: uploadImage,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (file: File): Promise<any> => {
      const formData = new FormData();
      formData.append("file", file);
      return rootApiUploadFileService.post(endpoints.upload, formData);
    },
    onSuccess: () => {
      toastService.success("Upload hình thành công");
    },
    onError: (error: any) => {
      toastService.error(error?.message ?? "Upload thất bại");
    },
  });

  return {
    data,
    onUploadImage: uploadImage,
    isLoading: isPending,
    isSuccess,
    isError,
  };
};
