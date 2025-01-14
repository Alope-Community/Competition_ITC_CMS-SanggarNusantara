import axios from "axios";

// GET
const UploadImage = async (formData: FormData) => {
  try {
    const response = await axios.post(
      // `${process.env.NEXT_PUBLIC_API_BASE_URL}/uploadImage`,
      // `http://127.0.0.1:8000/api/upload-image`,
      `https://alope.site/api/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Network response was not ok: ${(error as Error).message}`);
  }
};

export default UploadImage;
