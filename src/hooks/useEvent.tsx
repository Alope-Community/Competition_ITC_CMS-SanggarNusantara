// import {
//   deleteSellingAccounts,
//   storeSellingAccounts,
//   updateSellingAccounts,
// } from "@/apis/SellingAccounts";
import { deleteEvent } from "@/api/EventAction";
import { storeNews, updateNews } from "@/api/NewsAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useStoreNews = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: storeNews,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });

      alert("Create Success");

      router.push("/news");
    },
    onError: (error) => {
      alert("Create Error");

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

      alert("Update Success");

      router.push("/news");
    },
    onError: (error) => {
      alert("Update Error");
      console.error("Error updating account:", error);
    },
  });
};

const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => deleteEvent(slug),
    onSuccess: () => {
      alert("Delete Success");

      queryClient.invalidateQueries({ queryKey: ["event"] });
    },
    onError: (error) => {
      alert("Delete Failed");

      console.error("Error deleting item:", error);
    },
  });
};

export { useStoreNews, useUpdateNews, useDeleteEvent };
