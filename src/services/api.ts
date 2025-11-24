import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { BASE_URL } from "../env";
import * as SecureStore from "expo-secure-store";

async function getToken() {
  try {
    return await SecureStore.getItemAsync("token");
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


// api.interceptors.request.use(
//   async (config) => {
//     const token = await getToken();
//     if (token) {
//       config.headers = config.headers ?? {};
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     (config as any).meta = { startedAt: Date.now() };

//     return config;
//   },
//   (error: AxiosError) => {
//     // TODO: enviar log do request que falhou
//     return Promise.reject(error);
//   }
// );

// /**
//  * RESPONSE INTERCEPTOR
//  * - Desembrulha `response.data`
//  * - Normaliza erros
//  * - (gancho) retry, refresh token, métricas, toasts, etc.
//  */
// api.interceptors.response.use(
//   (response: AxiosResponse) => {
//     // (opcional) medir duração
//     const started = (response.config as any)?.meta?.startedAt;
//     if (started) {
//       const ms = Date.now() - started;
//       // TODO: registrar métricas (ex.: console.log(`[API] ${response.config.url} ${ms}ms`))
//     }

//     return response.data; // <- retorna só o corpo no app inteiro
//   },
//   async (error: AxiosError<any>) => {
//     const status = error.response?.status;

//     // 401: (gancho) tentar refresh token ou redirecionar para login
//     if (status === 401) {
//       // TODO: refresh token (ex.: chamar /auth/refresh)
//       // TODO: se falhar, limpar credenciais e navegar pro /login
//     }

//     // (gancho) retry de idempotentes (GET) em erro de rede
//     // if (error.code === "ECONNABORTED" || !error.response) { ... }

//     // Normalização mínima de erro para o app
//     const normalized = {
//       status,
//       message: error.response?.data?.message || "Falha na solicitação.",
//       data: error.response?.data,
//       url: error.config?.url,
//       method: error.config?.method,
//     };

//     return Promise.reject(normalized);
//   }
// );
