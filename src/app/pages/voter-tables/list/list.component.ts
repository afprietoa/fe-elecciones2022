import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { VoterTablesService } from '../../../sevices/voter-tables.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['numero de mesa', 'cantidad inscritos', 'Opciones']
  voterTables: Table[];

  constructor(private voterTablesService: VoterTablesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list():void{

    this.voterTablesService.list().subscribe(
      data => {
        this.voterTables = data;
      },
      error => {
        console.log(error);
      }
    )

  }

  create(): void{
    this.router.navigate(["pages/mesas/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/mesas/actualizar/"+id])
  }

  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar mesa',
      text: '¿Está seguro que desea eliminar la mesa?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#30B5D6'
    }).then((result) =>{
      if(result.isConfirmed){
        this.voterTablesService.delete(id).subscribe(
          data => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'La mesa ha sido eliminada correctamente',
              icon: 'success'
            })
            this.ngOnInit();
          },
          error => {
            console.log(id)
            console.log(error)
          }
        )
      }
    })
  }

}
