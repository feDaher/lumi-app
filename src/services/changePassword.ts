// src/services/auth.ts
import { api } from "./api";

export class AuthService {
  static async changePassword(oldPassword: string, newPassword: string) {
    return api.patch("/auth/changePassword", {
      oldPassword,
      newPassword
    });
  }
}
