import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  createTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, transaction);
  }

  approveTransaction(transactionId: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/approve/${transactionId}`, {});
  }

  rejectTransaction(transactionId: number, remarks: string): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/reject/${transactionId}?remarks=${remarks}`, 
      {}
    );
  }

  getTransactionsForAccount(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/account/${accountId}`);
  }
}