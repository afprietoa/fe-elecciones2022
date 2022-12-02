import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Table } from '../models/table.model';

@Injectable({
  providedIn: 'root'
})
export class VoterTablesService {

  constructor(private http: HttpClient) { }

  list(): Observable<Table[]>{
    return this.http.get<Table[]>(`${environment.url_api_gateway}/tables`)
  }

  getOne(id: string): Observable<Table>{
      return this.http.get<Table>(`${environment.url_api_gateway}/table/${id}`)
  }

  create(table: Table){
    return this.http.post<Table>(`${environment.url_api_gateway}/table/insert`, table)
  }

  edit(id: string, table: Table){
    return this.http.put<Table>(`${environment.url_api_gateway}/table/update/${id}`, table)
  }

  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/table/delete/${id}`)
  }

}
