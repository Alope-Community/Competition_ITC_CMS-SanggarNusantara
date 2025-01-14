// import {
//   deleteSellingAccounts,
//   storeSellingAccounts,
//   updateSellingAccounts,
// } from "@/apis/SellingAccounts";
import { deleteNews, storeNews, updateNews } from "@/api/NewsAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useStoreNews = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: storeNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });

      toast.success("Berhasil Tambah Berita!");

      setTimeout(() => {
        router.push("/news");
      }, 1000);
    },
    onError: (error) => {
      toast.error("Gagal Tambah Berita!");

      console.error("Error create item:", error);
    },
  });
};

const useUpdateNews = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });

      toast.success("Berhasil Update Berita!");

      setTimeout(() => {
        router.push("/news");
      }, 1000);
    },
    onError: (error) => {
      toast.error("Gagal Update Berita!");

      console.error("Error updating account:", error);
    },
  });
};

const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => deleteNews(slug),
    onSuccess: () => {
      toast.success("Berhasil Hapus Berita!");

      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (error) => {
      toast.error("Gagal Hapus Berita!");

      console.error("Error deleting item:", error);
    },
  });
};

export { useStoreNews, useUpdateNews, useDeleteNews };
