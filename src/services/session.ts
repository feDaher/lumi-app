import { api } from "./api";

export async function validationSession(token: string){
    const response = await api.post('/auth/validate', { token })
    return response.data
}

export async function logout() {
  const response = await api.post('/auth/logout');
  return response.data;
}