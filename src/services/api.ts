import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { AUTH_KEY, BASE_URL } from "../env";
import * as SecureStore from "expo-secure-store";

async function getToken() {
  try {
    return await SecureStore.getItemAsync(AUTH_KEY);
  } catch {
    return null;
  }
}

export type Api = AxiosInstance;

export const api: Api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function post<T>(url: string, body?: any): Promise<T> {
  return api.post(url, body) as unknown as T;
}

export async function get<T>(url: string): Promise<T> {
  return api.get(url) as unknown as T;
}

/**
 * REQUEST INTERCEPTOR
 * - injeta Authorization: Bearer <token>
 * - registra metadata de request
 */
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    (config as any).meta = { startedAt: Date.now() };

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * - retorna somente response.data
 * - normaliza erros
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // métrica simples
    const started = (response.config as any)?.meta?.startedAt;
    if (started) {
      const ms = Date.now() - started;
      // console.log(`[API] ${response.config.url} (${ms}ms)`);
    }

    // 🔥 retorna direto o payload
    return response.data;
  },
  async (error: AxiosError<any>) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Falha na solicitação.";

    // 401 → sessão expirada
    if (status === 401) {
      // TODO: refresh token ou deslogar
      // await SecureStore.deleteItemAsync('token');
      // router.replace("/login");
    }

    const normalized = {
      status,
      message,
      url: error.config?.url,
      method: error.config?.method,
      payload: error.response?.data,
    };

    return Promise.reject(normalized);
  }
);
