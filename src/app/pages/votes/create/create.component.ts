import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { Table } from '../../../models/table.model';
import { Vote } from '../../../models/vote.model';
import { CandidatesService } from '../../../sevices/candidates.service';
import { VoterTablesService } from '../../../sevices/voter-tables.service';
import { VotesService } from '../../../sevices/votes.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  creationMode: boolean = true;
  voteId: string = "";
  sendingAttemp: boolean = false;
  vote: Vote = {
    election_type: "",
    elective_position: "",
    year: "",
    candidate:  {
      _id: ""
    },
    table:  {
      _id: ""
    }
  }
  candidates: Candidate[];
  voterTables: Table[];


  constructor(private votesService: VotesService,
              private voterTablesService: VoterTablesService,
              private candidatesService: CandidatesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  /**
   * 
   */
  ngOnInit(): void {
    this.getCandidates()
    this.getTables();
    if(this.activatedRoute.snapshot.params.voteId){
      this.creationMode = false;
      this.voteId = this.activatedRoute.snapshot.params.voteId;
      this.getVote(this.voteId);
    }
    else
      this.creationMode = true;
  }

  /**
   * 
   * @param id 
   */
  getVote(id: string): void {
    this.votesService.getOne(id).subscribe(
      data => {
        this.vote = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCandidates(): void {
    this.candidatesService.list().subscribe(
      data => {
        this.candidates = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getTables(): void {
    this.voterTablesService.list().subscribe(
      data => {
        this.voterTables = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  /**
   * 
   * @returns 
   */
  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.vote.election_type=="" || this.vote.elective_position=="" ||  this.vote.year=="")
      return false;
    else
      return true;
  }

  /**
   * 
   */
  create(): void{
    if(this.validateMandatoryData){
      console.log(this.vote);
      this.votesService.create(this.vote).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'El voto ha sido creada correctamente.',
            'success'
          );
          this.router.navigate(['pages/votos/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El voto no ha podido ser creada. Intente de nuevo.',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      });
    }
  }

  /**
   * 
   */
  edit(): void{
    if(this.validateMandatoryData){
      delete this.vote._id;
      console.log(this.voteId);
      console.log(this.vote);
      this.votesService.edit(this.voteId, this.vote).subscribe(
        data => {
          Swal.fire(
            'Actualizada',
            'El voto ha sido actualizada correctamente.',
            'success'
          );
          this.router.navigate(['pages/votos/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'La inscripcion no ha podido ser actualizada. Intente de nuevo.',
            icon: 'error',
            timer: 5000
          });
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos Obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      });
    }
  }
}
