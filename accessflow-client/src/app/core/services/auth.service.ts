import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';

import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(data: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/login`, data)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('token', response.token);

          localStorage.setItem(
            'user',
            JSON.stringify(response.user)
          );
        })
      );
  }

  logout() {
    localStorage.clear();

    this.router.navigate(['/auth/login']);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  getRole() {
    return this.getUser()?.role;
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}