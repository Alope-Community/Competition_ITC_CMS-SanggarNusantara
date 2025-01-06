import { FormDataNews, News } from "@/models/News";
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

// POST
const storeNews = async (data: FormDataNews) => {
  try {
    const response = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/sellingAccounts`
      `http://127.0.0.1:8000/api/news`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(`Network response was not ok: ${(error as Error).message}`);
  }
};

// DELETE
const deleteNews = async (slug: string) => {
  try {
    const response = await axios.delete(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/sellingAccounts`
      `http://127.0.0.1:8000/api/news/${slug}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Network response was not ok: ${(error as Error).message}`);
  }
};

export { getNews, storeNews, deleteNews };
