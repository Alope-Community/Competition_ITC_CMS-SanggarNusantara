import axios from "axios";

export const getTransaction = async () => {
  try {
    const result = await axios.get(`https://alope.site/api/transaction-events`);

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
      `https://alope.site/api/transaction-events/${formData.invoice}`,
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
