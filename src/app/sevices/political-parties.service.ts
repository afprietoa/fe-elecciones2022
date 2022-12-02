import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PoliticalParty } from '../models/political-party.model';

@Injectable({
  providedIn: 'root'
})
export class PoliticalPartiesService {

  constructor(private http: HttpClient) { }

  list(): Observable<PoliticalParty[]>{
    return this.http.get<PoliticalParty[]>(`${environment.url_api_gateway}/political_partys`)
  }

  getOne(id: string): Observable<PoliticalParty>{
      return this.http.get<PoliticalParty>(`${environment.url_api_gateway}/political_party/${id}`)
  }

  create(political_party: PoliticalParty){
    return this.http.post<PoliticalParty>(`${environment.url_api_gateway}/political_party/insert`, political_party)
  }

  edit(id: string, political_party: PoliticalParty){
    return this.http.put<PoliticalParty>(`${environment.url_api_gateway}/political_party/update/${id}`, political_party)
  }

  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/political_party/delete/${id}`)
  }

}
