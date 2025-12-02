import { post } from "./api";
import { SignUpRequest, SignUpResponse } from "../types";

export async function signUp(payload: SignUpRequest) {
  return post<SignUpResponse>("/auth/signup", payload);
}

