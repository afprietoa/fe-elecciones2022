import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  list(): Observable<Rol[]>{
    return this.http.get<Rol[]>(`${environment.url_api_gateway}/rols`)
  }

  getOne(id: string): Observable<Rol>{
      return this.http.get<Rol>(`${environment.url_api_gateway}/rol/${id}`)
  }

  create(rol: Rol){
    return this.http.post<Rol>(`${environment.url_api_gateway}/rol/insert`, rol)
  }

  edit(id: string, rol: Rol){
    return this.http.put<Rol>(`${environment.url_api_gateway}/rol/update/${id}`, rol)
  }

  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/rol/delete/${id}`)
  }

}
