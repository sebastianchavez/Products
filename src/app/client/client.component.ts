import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  client:any = {
    // name:'N/A',
    // direction:'N/A',
    // commune:'N/A',
    // region:'N/A',
    // contact:'N/A'
  }
  constructor(private api: ApiService, private utilService: UtilityService) { }


  ngOnInit() {
  }

  ValidateRut(){
    if(this.client.roluni){
     let resultValRut = this.utilService.ValidateRut(this.client.roluni)
     if(resultValRut == false){
       alert('Rut inválido')
       this.client.roluni = ''
     }
    }
  }

  register(){
    if(this.client.roluni){
      this.client.rut = this.utilService.SeparaRut(this.client.roluni)
      this.client.dv = this.utilService.SeparaDv(this.client.roluni)
      this.api.post(`api/client`,this.client,true)
        .subscribe(resp => {
          alert('Cliente guardado con éxito')
          this.client = {}
        },err => {
          alert('Error al guardar')
        })
    } else{
      alert('Debe ingresar rut')
    }
  }
}
