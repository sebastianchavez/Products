import { Component } from '@angular/core';
import { RutValidator } from 'ng2-rut';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})

export class RegisterComponent {
    emp:any = {}
    user:any = {}
    val:Boolean = false
 constructor(private api: ApiService,private rutValidator: RutValidator, private utilService: UtilityService, private router:Router){
 }
 ValidaEmpRut(){
   if(this.emp.roluni){
    let resultValRut = this.utilService.ValidateRut(this.emp.roluni)
    if(resultValRut == false){
      alert('Rut inválido')
      this.emp.roluni = ''
    }
   }
 }
 ValidaEmail(){
  let resultEmail = this.utilService.ValidaEmail(this.emp.email)
  if(resultEmail == false) {
    alert('Email inválido')
    this.emp.email = ''
  }
  if(this.emp.email2 || this.emp.email2.length > 0){
    if(this.emp.email != this.emp.email2){
      alert('Emails no coinciden')
      this.emp.email = ''
      this.emp.email2 = ''
    }
  }
 }
 ConfirmarPassword(){
   if(this.emp.password != this.emp.password2){
     alert('Contraseña no coincida')
     this.emp.password2 = ''
   }
 }
 ConfirmaEmail(){
   if(this.emp.email != this.emp.email2){
    alert('Email no coincide')
    this.emp.email2 = ''
   }
 }

 register(){
 if(this.emp.roluni && this.emp.name && this.emp.email && this.emp.email2 && this.emp.password && this.emp.password2 && this.emp.contact && this.emp.direction && this.emp.business){
    this.emp.rut = this.utilService.SeparaRut(this.emp.roluni)
    this.emp.dv = this.utilService.SeparaDv(this.emp.roluni)
    this.emp.active = true
    
    this.api.post('api/company/register',this.emp,false)
    .subscribe((result:any)=>{
      console.log(result)
      if(result.cod == 1){
        this.user.rutEmp = this.emp.rut
        this.user.dvEmp = this.emp.dv
        this.user.rut = this.emp.rut
        this.user.dv = this.emp.dv
        this.user.email = this.emp.email
        this.user.name = this.emp.name
        this.user.avatar = ''
        this.user.password = this.emp.password
        this.user.signupDate = Date.now()
        this.user.lastLogin = Date.now()
        this.user.role = 'Administrador'
        this.user.active = true
        this.api.post('api/signup',this.user,false)
          .subscribe((resp:any)=>{
            debugger
            console.log(resp)
            alert('Empresa guardada con éxito')
            this.router.navigate(['/'])
            this.user = {}
            this.emp = {}
          },err =>{
            console.log(err)
            let logError = {component:'register', function:'register', description: 'line 70, post api/signup, error: ' + err.error.message ,user: 'N/A', date: Date.now()}
            this.api.post('api/log/error',logError, false)
            alert('Problemas al guardar empresa')
          })
      } 
     },err => {
      let logError = {component:'register', function:'register', description: 'line 54, post api/company/register, error: ' + err.error.message ,user: 'N/A', date: Date.now()}
      this.api.post('api/log/error',logError, false).subscribe(resp => {
        console.log(resp)
      },err =>{
        console.log(err)
      })
       alert(err.error.message)
     })
 } else {
  alert('Debe llenar todos los campos')
 }   
}

}