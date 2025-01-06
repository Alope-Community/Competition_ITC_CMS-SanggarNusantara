import UploadImage from "@/api/_UploadImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["upload-image"] });
    },
    onError: (error) => {
      console.error("Error upload image:", error);
    },
  });
};

export default useUploadImage;
