import { Component } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-logi',
  templateUrl: './login.component.html',
  styleUrls:['login.component.css']
})

export class LoginComponent {
    user: any = {}
 constructor(public api:ApiService,public utilService: UtilityService, private router:Router, private appComponent: AppComponent){
    
 }
 ValidaEmpRut(){
   if(this.user.roluni){
    let resultValRut = this.utilService.ValidateRut(this.user.roluni)
    if(resultValRut == false){
      alert('Rut inválido')
      this.user.roluni = ''
    }
   }
}
login(){
  if(this.user.roluni && this.user.password){
    let rut = this.utilService.SeparaRut(this.user.roluni)
    this.user.rut = rut
    this.api.post(this.api+'api/signin',this.user,false)
     .subscribe((resp:any)=>{
      localStorage.setItem('token', resp.token)
       this.api.get(this.api+'api/user/'+rut,false)
       .subscribe((resp:any)=>{
        localStorage.setItem('session',resp._id)
        alert('Usuario logeado con exito')
        this.appComponent.loggedIn =true
        this.router.navigateByUrl('/profile')
       },err =>{
        alert(err.error.message)
       })
     },err => {
       console.log(err)
        this.user.password = ''
        alert(err.error.message)
     })
  } else{
    alert('Debe llenar todos los campos')
  }
}
}