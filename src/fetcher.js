export const fetcher = async (url) => {
  const axios = await import("axios");
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
