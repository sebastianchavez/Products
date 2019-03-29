import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from '../services/utility.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html'
})

export class RolesComponent {
  roles = ['Vendedor','Consultor','Mantenedor','Administrador']
  company: any
  user: any = {}
  usuario: any
  users: any
 constructor(private api:ApiService,private modalService: NgbModal, private utilService:UtilityService){
  this.loadTable()
 }

 loadTable(){
  let session = localStorage.getItem('session')
  this.api.get(`api/users/${session}`,true)
      .subscribe((respUsr:any) =>{
        this.usuario = respUsr
        this.api.get(`api/users/rutEmp/${respUsr.rutEmp}`,true)
          .subscribe((resp:any) => {
            this.users = resp
            this.api.get(`api/companies/${respUsr.rutEmp}`,true)
              .subscribe(resp => {
                this.company = resp
              },err => {
                console.log(err)
              })
          },err => {
            console.log(err)
          })
      },err => {
        console.log(err)
      })
 }

 open(content) {
   this.user = {}
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
    document.getElementById('txtRut').removeAttribute("disabled")
  }

  ValidaRut(){
      if(this.user.roluni){
      let resultValRut = this.utilService.ValidateRut(this.user.roluni)
      if(resultValRut == false){
        alert('Rut inválido')
        this.user.roluni = ''
      }
    }
  }
  ValidaEmail(){
    if(this.user.email){
      let resultEmail = this.utilService.ValidaEmail(this.user.email)
      if(resultEmail == false) {
        alert('Email inválido')
        this.user.email = ''
        this.user.email2 = ''
      }
    }
   }
   ConfirmarPassword(){
    if(this.user.password != this.user.password2){
      alert('Contraseña no coincida')
      this.user.password = ''
      this.user.password2 = ''
    }
  }
  ConfirmaEmail(){
    if(this.user.email != this.user.email2){
     alert('Email no coincide')
     this.user.email = ''
     this.user.email2 = ''
    }
  }

  modifyUser(content, usr){
    this.api.get(`api/users/${usr._id}`,true)
      .subscribe(resp => {
        this.user = resp
        this.user.roluni = this.utilService.Miles(this.user.rut) + '-' + this.user.dv
        this.user.email2 = this.user.email
        console.log(resp)
        this.modalService.open(content, {ariaLabelledBy:'modal-basic-title'})
          .result.then(resp => {
          }, (reason) =>{
          })
          document.getElementById('txtRut').setAttribute("disabled","true")
      },err => {
        console.log(err)
      })
  }
  saveUser(){
    if(this.user.roluni && this.user.email && this.user.email2 && this.user.password && this.user.password2 && this.user.name && this.user.role){
      this.user.rutEmp = this.company.rut
      this.user.dvEmp = this.company.dv
      this.user.rut = this.utilService.SeparaRut(this.user.roluni)
      this.user.dv = this.utilService.SeparaDv(this.user.roluni)
      this.user.active = true
      this.api.post(`api/signup`,this.user,true)
        .subscribe(resp => {
          this.loadTable()
          document.getElementById('btnClose').click()
          alert('Usuario creado con exito')
        },err => {
          alert('Error al crear usuario')
          console.log(err)
        })
    } else {
      alert('Debe llenar todos los campos del formulario')
    }
  }
}