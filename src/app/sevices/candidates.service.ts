import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Candidate } from '../models/candidate.model';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  constructor(private http: HttpClient) { }

  list(): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(`${environment.url_api_gateway}/candidates`)
  }

  getOne(id: string): Observable<Candidate>{
      return this.http.get<Candidate>(`${environment.url_api_gateway}/candidate/${id}`)
  }

  create(candidate: Candidate){
    return this.http.post<Candidate>(`${environment.url_api_gateway}/candidate/insert`, candidate)
  }

  edit(id: string, candidate: Candidate){
    return this.http.put<Candidate>(`${environment.url_api_gateway}/candidate/update/${id}`, candidate)
  }

  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/candidate/delete/${id}`)
  }
  
}
