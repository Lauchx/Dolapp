import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url = "http://localhost:3000"
  constructor(private http: HttpClient) { }
  get(params: string): Observable<any> {
    return this.http.get<any>(this.url + params)
  }
  getById(params: string, id: string): Observable<any>{
    return this.http.get<any>(this.url + params + "/" + id)
  }
}
