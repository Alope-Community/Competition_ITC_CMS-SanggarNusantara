import { updateTransaction } from "@/api/TransactionActive";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaction"] });

      alert("Update Success");

      router.push("/transaction");
    },
    onError: (error) => {
      alert("Update Error");
      console.error("Error updating account:", error);
    },
  });
};

export { useUpdateTransaction };
