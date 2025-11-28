import { api } from './api';
import { Contact, ContactCreateDTO, ContactUpdateDTO } from '../types';

export class ContactService {
  static list(): Promise<Contact[]> {
    return api.get("/contact");
  }

  static getById(id: string): Promise<Contact> {
    return api.get(`/contact/${id}`);
  }

  static create(payload: ContactCreateDTO): Promise<Contact> {
    return api.post("/contact", payload);
  }

  static update(id: string, payload: ContactUpdateDTO): Promise<Contact> {
    return api.put(`/contact/${id}`, payload);
  }

  static delete(id: string): Promise<void> {
    return api.delete(`/contact/${id}`);
  }
}

