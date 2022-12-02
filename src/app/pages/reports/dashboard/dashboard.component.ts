import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../sevices/reports.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private reportsService: ReportsService) { }
  columnNames: string[] = ['Nombre', 'Percentage', 'Barra']
  results: any;

  ngOnInit(): void {
    this.getGeneralResult();
  }
  
  getGeneralResult(): void{
    this.reportsService.generalReport().subscribe(
      data => {
        this.results = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}