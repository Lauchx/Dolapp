import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trade } from '../modules/Trade';

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
  post(params:string, trade: Trade): Observable<any>{
    return this.http.post(this.url + params, trade)
  }
}
