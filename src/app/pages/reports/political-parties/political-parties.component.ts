import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../sevices/reports.service';

@Component({
  selector: 'ngx-political-parties',
  templateUrl: './political-parties.component.html',
  styleUrls: ['./political-parties.component.scss']
})
export class PoliticalPartiesComponent implements OnInit {

  constructor(private reportsService: ReportsService) { }
  columnNames: string[] = ['Nombre', 'Votos', 'Barra']
  results: any;

  ngOnInit(): void {
    this.getPartiesResult();
  }
  
  getPartiesResult(): void{
    this.reportsService.partiesReport().subscribe(
      data => {
        this.results = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}
