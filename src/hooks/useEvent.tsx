import { deleteEvent } from "@/api/EventAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => deleteEvent(slug),
    onSuccess: () => {
      toast.success("Berhasil Hapus Event!");

      queryClient.invalidateQueries({ queryKey: ["event"] });
    },
    onError: (error) => {
      toast.error("Gagal Hapus Event!");

      console.error("Error deleting item:", error);
    },
  });
};

export { useDeleteEvent };
