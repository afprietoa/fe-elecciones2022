import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../sevices/reports.service';

@Component({
  selector: 'ngx-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  constructor(private reportsService: ReportsService) { }
  columnNames: string[] = ['Cedula' ,'Nombre', 'Votos','Barra']
  results: any;

  ngOnInit(): void {
    this.getCandidatesResult();
  }
  
  getCandidatesResult(): void{
    this.reportsService.candidatesReport().subscribe(
      data => {
        this.results = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}

