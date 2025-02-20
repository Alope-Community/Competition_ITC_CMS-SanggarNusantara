import { FormDataNews } from "@/models/News";
import axios from "axios";

// GET
const getNews = async () => {
  try {
    const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/sellingAccounts`
      `https://alope.site/api/news`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Network response was not ok: ${(error as Error).message}`);
  }
};

// GET
const getNewsBySlug = async (slug: string) => {
  try {
    const response = await axios.get(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/sellingAccounts`
      `https://alope.site/api/news/${slug}`
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
      `https://alope.site/api/news`,
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(`Network response was not ok: ${(error as Error).message}`);
  }
};

// PUT
const updateNews = async ({
  slug,
  data,
}: {
  slug: string;
  data: FormDataNews;
}) => {
  try {
    const response = await axios.put(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/sellingAccounts`
      `https://alope.site/api/news/${slug}`,
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
      `https://alope.site/api/news/${slug}`
    );
    return response.data;
  } catch (error) {
    throw new Error(`Network response was not ok: ${(error as Error).message}`);
  }
};

export { getNews, getNewsBySlug, storeNews, updateNews, deleteNews };
