import { api } from "./api";

export async function signUp(name: string, cpf: string, email: string, password: string) {
  console.log('aqui');

  const response = await api.post('/auth/signup', {
    name,
    cpf,
    email,
    password,    
  });

  return response.data
};
