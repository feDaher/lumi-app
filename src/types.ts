export type User = {
  id?: string;
  name?: string;
  cpf?: string;
  email?: string;
};

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
  };
}

export interface Contact {
  id: string;
  name: string;
  ddd: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactCreateDTO {
  name: string;
  ddd: string;
  phone: string;
}

export interface ContactUpdateDTO {
  name?: string;
  ddd?: string;
  phone?: string;
}
