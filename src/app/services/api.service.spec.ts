import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinanceData } from '../models/finance.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7168/api/finance/get-data';

  constructor(private http: HttpClient) {}

  getFinanceData(from: string, to: string): Observable<FinanceData[]> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<FinanceData[]>(this.apiUrl, { params });
  }
}
