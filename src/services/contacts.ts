import { api } from './api';
import { Contact, ContactCreateDTO, ContactUpdateDTO, PaginatedResponse } from '../types';

export class ContactService {
  static list(page = 1, limit = 20): Promise<PaginatedResponse<Contact>> {
    return api.get(`/contact?page=${page}&limit=${limit}`);
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

  static search(term: string): Promise<Contact[]> {
    return api.get(`/contact/search?search=${term}`);
  }
}

