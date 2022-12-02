import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Table } from '../../../models/table.model';
import { VoterTablesService } from '../../../sevices/voter-tables.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true; // true = create, false = update 
  sendingAttemp: boolean = false;
  tableId: string

  // related with form
  voterTable:Table ={
    registered_documents: null,
    number: null
  }

  constructor(private voterTableService: VoterTablesService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params.tableId){
      // update
      this.creationMode = false;
      this.tableId = this.activatedRoute.snapshot.params.tableId;
      this.getVoterTable(this.tableId)
      // create

    }
    else
      this.creationMode = true;
  }

  getVoterTable(id: string):void{
    this.voterTableService.getOne(id).subscribe(
      data => {
        this.voterTable = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  validateMandatoryData(): boolean{
    this.sendingAttemp = true;
    if(this.voterTable.registered_documents == null || this.voterTable.number == null)
      return false;
    else
      return true;
  }

  create(){
    if(this.validateMandatoryData()){
      this.voterTableService.create(this.voterTable).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'La mesa de votación ha sido creada correctamete.',
            icon: 'success',
          })
          this.router.navigate(["pages/mesas/listar"]);
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Error en el proceso',
            text: 'En este momento estamos presentando inconvenientes. Por favor, intentelo de nuevo más tarde.',
            icon: 'warning',
            timer: 5000
          })
        }
      );
    }
    else{
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor, debe diligenciar todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      })
    }
  }

  edit(){
    if(this.validateMandatoryData()){
      delete this.voterTable._id;
      this.voterTableService.edit(this.tableId, this.voterTable).subscribe(
        data => {
          Swal.fire({
            title: 'Actualizado',
            text: 'La mesa de votación ha sido actualizada correctamete.',
            icon: 'success',
          })
          this.router.navigate(["pages/mesas/listar"]);
        },
        error => {
          console.log(error)
        }
      )
    }
    else{
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Por favor, debe diligenciar todos los campos obligatorios.',
        icon: 'warning',
        timer: 5000
      })
    }
  }

}
