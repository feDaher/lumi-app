import { post } from "./api";
import { AuthResponse } from "../types";

export function signIn(email: string, password: string) {
  return post<AuthResponse>("/auth/signin", { email, password });
}
