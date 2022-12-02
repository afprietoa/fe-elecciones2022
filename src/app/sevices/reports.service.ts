import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  tablesReport(){
    return this.http.get(`${environment.url_api_gateway}/reports/table_votes/all`)
  }

  candidatesReport(){
    return this.http.get(`${environment.url_api_gateway}/reports/candidate_votes/all`)
  }

  partiesReport(){
    return this.http.get(`${environment.url_api_gateway}/reports/party_votes/all`)
  }

  generalReport(){
    return this.http.get(`${environment.url_api_gateway}/reports/general_distribution`)
  }
}
