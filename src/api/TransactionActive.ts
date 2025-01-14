import axios from "axios";

export const getTransaction = async () => {
  try {
    const result = await axios.get(
      `http://127.0.0.1:8000/api/transaction-events`
    );

    if (result) {
      return result.data;
    }
  } catch (error) {
    return error;
  }
};

export const updateTransaction = async (formData: {
  invoice: string;
  status: string;
}) => {
  try {
    const result = await axios.patch(
      `http://127.0.0.1:8000/api/transaction-events/${formData.invoice}`,
      {
        invoice: formData.invoice,
        status: formData.status,
      }
    );

    if (result) {
      return result;
    }
  } catch (error) {
    return error;
  }
};
