export type User = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  role: string;
};

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    role: string;
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

export type SignUpRequest = {
  name: string;
  cpf: string;
  email: string;
  password: string;
};

export type SignUpResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    cpf: string;
    email: string;
  };
};

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface Address {
  id: string;

  street: string; 
  houseNumber: string | null;
  neighborhood: string;
  zipCode: string;
  complement?: string | null;

  city: string;
  state: string;

  isPrimary: boolean;

  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddressCreateDTO {
  street: string;
  houseNumber: string | null;
  zipCode: string;
  neighborhood: string;
  complement?: string | null;
  city: string;
  state: string;
  isPrimary?: boolean;
}

export interface AddressUpdateDTO extends Partial<AddressCreateDTO> {}
