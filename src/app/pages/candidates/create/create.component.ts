import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Candidate } from '../../../models/candidate.model';
import { PoliticalParty } from '../../../models/political-party.model';
import { CandidatesService } from '../../../sevices/candidates.service';
import { PoliticalPartiesService } from '../../../sevices/political-parties.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;
  candidateId: string;
  parties: PoliticalParty[];
  candidate: Candidate = {
    personal_id: null,
    name: "",
    last_name: "",
    political_party: {
      _id: "",
    }
  }

  constructor(private candidatesService: CandidatesService,
              private politicalPartiesService: PoliticalPartiesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParties();
    if(this.activatedRoute.snapshot.params.candidateId){
      this.creationMode = false;
      this.candidateId = this.activatedRoute.snapshot.params.candidateId;
      this.getCandidate(this.candidateId);
    }
    else
      this.creationMode = true;
  }

  getParties(): void{
    this.politicalPartiesService.list().subscribe(
      data => {
        this.parties = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getCandidate(id: string): void{
    this.candidatesService.getOne(id).subscribe(
      data => {
        this.candidate = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.candidate.personal_id==null || this.candidate.name=="" || this.candidate.last_name=="" || this.candidate.political_party._id=="")
      return false;
    else
      return true;
  }

  create(): void {
    if(this.validateMandatoryData()){
      this.candidatesService.create(this.candidate).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'El candidato se ha creado correctamente.',
            icon: 'success',
          });
          this.router.navigate(["pages/candidatos/listar"]);    
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el servidor',
            text: 'El candidato no ha podido ser creado. Intente de nuevo mas tarde.',
            icon: 'error',
            timer: 5000
          })
        }
      )
    }
    else {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      })
    }
  }

  edit(): void{
    if(this.validateMandatoryData()){
      delete this.candidate._id
      let political_party_: PoliticalParty = {
        _id: this.candidate.political_party._id,
      }
      this.candidate.political_party = political_party_;
      this.candidatesService.edit(this.candidateId, this.candidate).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'El usuario ha sido correctamente actualizado.',
            'success'
          );
          this.router.navigate(["pages/candidatos/listar"]);    
        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor diligencie todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      })
    }
  }
}
