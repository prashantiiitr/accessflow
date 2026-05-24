import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  createUser(data: any) {
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  updateUser(id: string, data: any) {
    return this.http.put(
      `${this.apiUrl}/users/${id}`,
      data
    );
  }

  deleteUser(id: string) {
    return this.http.delete(
      `${this.apiUrl}/users/${id}`
    );
  }
}