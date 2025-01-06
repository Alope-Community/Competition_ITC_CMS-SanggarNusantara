import axios from "axios";

// GET
const getNews = async () => {
  try {
    const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/sellingAccounts`
      `http://127.0.0.1:8000/api/news`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Network response was not ok: ${(error as Error).message}`);
  }
};

export { getNews };
