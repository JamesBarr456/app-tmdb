import type { AxiosError } from "axios";

export const handleApiError = (error: AxiosError) => {
  if (error.response) {
    console.error("API Error Response:", error.response.data);
    console.error("Status:", error.response.status);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Error setting up request:", error.message);
  }

  throw error;
};
