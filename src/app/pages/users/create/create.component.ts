import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from '../../../models/rol.model';
import { User } from '../../../models/user.model';
import { RolesService } from '../../../sevices/roles.service';
import { UsersService } from '../../../sevices/users.service';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  creationMode: boolean = true;
  sendingAttemp: boolean = false;
  userId: number;
  //rolId: number;
  roles: Rol[];
  user: User ={
    nickname: "",
    email: "",
    password: "",
    rol:{
      idRol: null,
     // name: ""
    }
  }

  constructor(private usersService: UsersService,
              private rolesService: RolesService,
              private router: Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getRoles();
    if(this.activatedRoute.snapshot.params.userId){
      // update
      this.creationMode = false;
      this.userId = this.activatedRoute.snapshot.params.userId
      this.getUser(this.userId)
    }
    else // create
      this.creationMode = true;
    console.log(this.user)
  }

  getRoles(): void{
    this.rolesService.list().subscribe(
      data=>{        
        this.roles = data;
        console.log(this.roles)
      },
      error => {
        console.log(error)
      }
    );
  }

  getUser(id: number): void{
    this.usersService.getOne(id).subscribe(
      data => {
        this.user = data;
       // this.rolId = this.user.rol.idRol;
       console.log(this.user)
      },
      error => {
        console.log(error);
      }
    )
  }

  validateMandatoryData(): boolean{
    this.sendingAttemp = true;
    if(this.user.email == "" || this.user.nickname == "" || this.user.password == "" || this.user.rol.idRol == null)
      return false;
    else
      return true;
  }

  create(){
    if(this.validateMandatoryData()){
      this.usersService.create(this.user).subscribe(
        data => {
          Swal.fire({
            title: 'Creado',
            text: 'El usuario ha sido creada correctamete.',
            icon: 'success',
          })
          this.router.navigate(["pages/usuarios/listar"]);
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
      console.log(this.user)
      delete this.user.id;
      delete this.user.password;
      
      let rol_: Rol ={
        idRol: this.user.rol.idRol
      }
      this.user.rol = rol_;
      console.log(this.user)
      this.usersService.edit(this.userId, this.user).subscribe(
        data => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El ususario ha sido actualizada correctamete.',
            icon: 'success',
          })
          this.router.navigate(["pages/usuarios/listar"]);
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
