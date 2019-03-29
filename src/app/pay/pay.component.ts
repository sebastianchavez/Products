import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../services/utility.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  query: string = ''
  user:any
  pays:any
  expenses:any
  mes = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  anos = [2019]
  year
  month
  constructor(private api: ApiService) {
    this.api.get(`api/users/${localStorage.getItem('session')}`,true)
      .subscribe(resp => {
        this.user = resp
        // this.loadTable()
      },err =>{
        console.log(`Error: ${err.error.message}`)
      })
  }

  ngOnInit() {
  }

  selectMonth(mes){
    let m
    switch(mes){
      case'Enero':
      m = 1
      break;
      case'Febrero':
      m = 2
      break;
      case'Marzo':
      m = 3
      break;
      case'Abril':
      m = 4
      break;
      case'Mayo':
      m = 5
      break;
      case'Junio':
      m = 6
      break;
      case'Julio':
      m = 7
      break;
      case'Agosto':
      m = 8
      break;
      case'Septiembre':
      m = 9
      break;
      case'Octubre':
      m = 10
      break;
      case'Noviembre':
      m = 11
      break;
      case'Diciembre':
      m = 12
      break;      
    }
    return m
  }

  loadTable(){
    if(this.month && this.year){
      this.api.get(`api/expenses/${this.user.rutEmp}`,true)
      .subscribe((resp:any) => {
        this.expenses = resp
        this.api.get(`api/pays/${this.user.rutEmp}`,true)
          .subscribe((resp:any) => {
            this.pays = resp
            let arr = []
            let mes = this.selectMonth(this.month)
            if (mes.toString().length == 1){mes = 0 + '' + mes}
            let per = this.year + '' + mes
            this.expenses.map(val=>{
              let flag = false
              this.pays.map(val2 => {
                if(val2.date == per && val2.codPay == val.cod){
                  let obj = {
                    rutEmp: val2.rutEmp,
                    codPay: val2.codPay,
                    idPay: val._id,
                    name: val2.name,
                    price: val2.price,
                    datePay: val2.datePay,
                    date: val2.date,
                    state: 'Pagado',
                    type:val.type,
                    category: val.category
                  }
                  flag = true
                  arr.push(obj)
                } 
              })
              if(!flag){
                let obj = {
                  rutEmp: this.user.rutEmp,
                  codPay: val.cod,
                  idPay: val._id,
                  name: val.name,
                  price: val.price,
                  datePay: '',
                  date: '',
                  state: 'Sin pagar',
                  type:val.type,
                  category: val.category
                }
                arr.push(obj)
              }
            })
            this.expenses = arr
          })
      },err => {
        console.log(`Error: ${err.error.message}`)
      })
    }
  }

  pagar(exp){
    exp.datePay = Date.now()
    let mes = this.selectMonth(this.month)
    if (mes.toString().length == 1){mes = 0 + '' + mes}
    exp.date = this.year + '' + mes
    this.api.post(`api/pay`,exp,true)
      .subscribe(resp => {
        let conf = confirm('Desea actualizar el valor del gasto?')
        if(conf){
          let price = {
            price: exp.price
          }
          // console.log(exp)
          this.api.put(`api/expense/${exp.idPay}`,price, true)
            .subscribe(resp => {
              // console.log(resp)
              alert('Valor actualizado')
            },err => {
              console.log(`Error: ${err}`)
            })
        }
        alert('Gasto pagado con éxito')
        this.loadTable()
      },err => {
        alert('Error al pagar')
        console.log(`Error: ${err.error.message}`)
      })
  }

  

}
