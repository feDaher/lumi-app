export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: number;
};


export type User = {
  id?: string;
  name?: string;
  cpf?: string;
  email?: string;
};