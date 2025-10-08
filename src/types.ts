export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};


export type User = {
  id: string;
  username: string;
  fullName: string;
  cpf: string;
  email: string;
  senha: string;
};