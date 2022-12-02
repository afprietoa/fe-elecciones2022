import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../sevices/reports.service';

@Component({
  selector: 'ngx-voter-tables',
  templateUrl: './voter-tables.component.html',
  styleUrls: ['./voter-tables.component.scss']
})
export class VoterTablesComponent implements OnInit {

  constructor(private reportsService: ReportsService) { }
  columnNames: string[] = ['Mesa', 'Votos', 'Barra']
  results: any;

  ngOnInit(): void {
    this.getTablesResult();
  }
  
  getTablesResult(): void{
    this.reportsService.tablesReport().subscribe(
      data => {
        this.results = data;
      },
      error => {
        console.log(error);
      }
    )
  }

}