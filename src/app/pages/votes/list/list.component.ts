import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Vote } from '../../../models/vote.model';
import { VotesService } from '../../../sevices/votes.service';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  columnNames: string[] = ['Mesa', 'Candidato', 'Elección', 'Cargo', 'Año', 'Opciones']
  votes: Vote[];

  constructor(private votesService: VotesService,
              private router: Router) { }

  ngOnInit(): void {
    this.list();
  }

  list(): void{
    this.votesService.list().subscribe(
      data => {
        this.votes = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  create(): void{
    this.router.navigate(["pages/votos/crear"]);
  }

  edit(id: string): void{
    this.router.navigate(["pages/votos/actualizar/"+id]);
  }

  delete(id: string): void{
    Swal.fire({
      title: 'Eliminar Inscripcion',
      text: '¿Está seguro que quiere eliminar el voto?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#D33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, eliminar',
      confirmButtonColor: '#3085D6',
    }).then((result) => {
      if(result.isConfirmed){
        this.votesService.delete(id).subscribe(
          data => {
            Swal.fire(
              '¡Eliminada!',
              'El voto ha sido eliminada correctamente.',
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