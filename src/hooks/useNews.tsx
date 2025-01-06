// import {
//   deleteSellingAccounts,
//   storeSellingAccounts,
//   updateSellingAccounts,
// } from "@/apis/SellingAccounts";
import { storeNews } from "@/api/NewsAction";
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

// const useUpdateSellingAccount = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   return useMutation({
//     mutationFn: updateSellingAccounts,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["selling-accounts"] });

//       alert("Update Success");

//       router.push("/account-store");
//     },
//     onError: (error) => {
//       alert("Update Error");
//       console.error("Error updating account:", error);
//     },
//   });
// };

// const useDeleteSellingAccount = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: number) => deleteSellingAccounts(id),
//     onSuccess: () => {
//       alert("Delete Success");

//       queryClient.invalidateQueries({ queryKey: ["selling-accounts"] });
//     },
//     onError: (error) => {
//       alert("Delete Failed");

//       console.error("Error deleting item:", error);
//     },
//   });
// };

export { useStoreNews };
