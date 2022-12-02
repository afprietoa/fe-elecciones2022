import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PoliticalParty } from '../../../models/political-party.model';
import { PoliticalPartiesService } from '../../../sevices/political-parties.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  parties: PoliticalParty[];
  columnNames: string[] = ['Nombre','Lema', 'Opciones']

  constructor(private politicalPartiesService: PoliticalPartiesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.politicalPartiesService.list().subscribe(
      data => {
        this.parties = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  create(): void{
    this.router.navigate(["pages/partidos/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/partidos/actualizar/"+id]);
  }

  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar partido politico',
      text: '¿Está seguro que quiere eliminar a el partido politico?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.politicalPartiesService.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminado!',
              'El partido politico ha sido eliminado correctamente.',
              'success'
            ),
            this.ngOnInit();
          },
          error => {
            console.log(error);
          }
        )
      }
    })
  }
}

