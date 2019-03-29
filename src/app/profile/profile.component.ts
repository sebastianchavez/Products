import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any = {}
  constructor(private route: ActivatedRoute,  private router: Router, private api: ApiService) { 
    let session = localStorage.getItem('session')
    this.api.get('api/users/' + session,false)
     .subscribe(resp => {
       this.user = resp
      // console.log(resp)
     },err => {
      // console.log(err)
      alert('Debe estar logeado')
      
     })
  }

  ngOnInit() {
  }

}
