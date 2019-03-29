import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn = false;
  role:String
  constructor(private api: ApiService, private router: Router){
    this.api.isLogged()
            .subscribe(result=>{
                // console.log(result)
                if(result){
                    this.loggedIn = true;
                }else{
                    this.loggedIn = false;
                }
            }, (err)=>{
              // console.log('error')
                // console.log(err)
                this.loggedIn = false;
            })
            this.api.get(`api/users/${localStorage.getItem('session')}`,false)
              .subscribe((resp:any) => {
                this.role = resp.role
              }, err => {
                console.log(err)
              })
  }
  title = 'TecnoProducts';
  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('session')
    alert('Hasta luego')
    this.router.navigateByUrl('/login')
    this.loggedIn = false
  }
}
