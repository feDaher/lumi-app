import { AxiosInstance } from "axios";

export function setupInterceptors(api: AxiosInstance) {
  
  api.interceptors.request.use(
    async (config) => {
      console.log("➡️ Request:", config.method?.toUpperCase(), config.url);
       return config;
    },
    (error) => {
      console.log("❌ Request error:", error);
      return Promise.reject(error);
    }
  );

  // RESPONSE INTERCEPTOR
  api.interceptors.response.use(
    (response) => {
      console.log("⬅️ Response:", response.status, response.config.url);
      return response;
    },
    (error) => {
      if (error.response) {
        console.log("⚠️ API error:", {
          status: error.response.status,
          url: error.response.config.url,
          data: error.response.data,
        });
      } else {
        console.log("🚨 Network error:", error.message);
      }

      return Promise.reject(error);
    }
  );
}
