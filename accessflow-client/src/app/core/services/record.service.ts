import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRecords(delay: number = 3000) {
    return this.http.get(
      `${this.apiUrl}/records?delay=${delay}`
    );
  }
}