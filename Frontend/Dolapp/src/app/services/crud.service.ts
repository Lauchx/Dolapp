import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trade } from '../modules/Trade';
import { Currency } from '../modules/Currency';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url = "http://localhost:3000"
  constructor(private http: HttpClient) { }
  get(params: string): Observable<any> {
    return this.http.get(this.url + params)
  }
  getById(params: string, id: string): Observable<any>{
    return this.http.get(this.url + params + "/" + id)
  }
  postTrade(params:string, trade: Trade): Observable<any>{
    return this.http.post(this.url + params, trade)
  }
  postCurrency(params:string, currency: Currency): Observable<any>{
    return this.http.post(this.url + params, currency)
  }
  patchCurrecy(params:string, currency: Currency, trade: string): Observable<any>{
    const body = {
      ...currency,
      trade
    }
    return this.http.patch(this.url + params, body)
  }
}
