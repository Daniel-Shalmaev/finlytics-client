import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FinanceData } from '../models/finance.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `${environment.apiBaseUrl}/finance/get-data`;

  private financeDataSubject = new BehaviorSubject<FinanceData[]>([]);
  public financeData$ = this.financeDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Fetches finance data from the API based on the given date range
  loadFinanceData(from: string, to: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?from=${from}&to=${to}`);
  }
}
