import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PoliticalParty } from '../../../models/political-party.model';
import { PoliticalPartiesService } from '../../../sevices/political-parties.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;
  partyId: string = "";
  party: PoliticalParty= {
    name: "",
    slogan: "",
  }

  /**
   * 
   * @param departmentsService 
   * @param activatedRoute 
   * @param router 
   */
  constructor(private politicalPartiesService: PoliticalPartiesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  /**
   * 
   */
  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.partyId){
      this.creationMode = false;
      this.partyId = this.activatedRoute.snapshot.params.partyId;
      this.getDepartment(this.partyId);
    }
    else
      this.creationMode = true;
  }

  /**
   * 
   * @param id 
   */
  getDepartment(id: string): void {
    this.politicalPartiesService.getOne(id).subscribe(
      data => {
        this.party = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * 
   * @returns 
   */
  validateMandatoryData(): boolean {
    this.sendingAttemp = true;
    if(this.party.name=="")
      return false;
    else
      return true;
  }

  /**
   * 
   */
  create(): void{
    if(this.validateMandatoryData){
      this.politicalPartiesService.create(this.party).subscribe(
        data => {
          Swal.fire(
            'Creado',
            'El partido politico ha sido creado correctamente.',
            'success'
          );
          this.router.navigate(['pages/partidos/listar']);
        },
        error => {
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El partido no ha podido ser creado. Intente de nuevo.',
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
      delete this.party._id;
      this.politicalPartiesService.edit(this.partyId, this.party).subscribe(
        data => {
          Swal.fire(
            'Actualizado',
            'El partido politico ha sido actualizado correctamente.',
            'success'
          );
          this.router.navigate(['pages/partidos/listar']);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Falla en el Servidor',
            text: 'El partido no ha podido ser actualizado. Intente de nuevo.',
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
