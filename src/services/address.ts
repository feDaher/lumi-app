import { api } from "./api";
import { AddressCreateDTO, Address } from "@/src/types";

export class AddressService {
  static getUserAddress(): Promise<Address | null> {
    return api.get("/address/me");
  }

  static create(payload: AddressCreateDTO): Promise<Address> {
    return api.post("/address", payload);
  }

  static update(id: string, payload: Partial<AddressCreateDTO>): Promise<Address> {
    return api.put(`/address/${id}`, payload);
  }
}
