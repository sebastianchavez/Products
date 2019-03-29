import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
report:any
reports = ['Ventas','Gastos','Movimientos']
date1:any
date2:any
detailTable:any = []
dataDetail:Array<Array<any>> =[]
data:Array<Array<any>> =[
  ]
  sale:any
  company:any = {}
  constructor(private api:ApiService) {
    this.api.get(`api/users/${localStorage.getItem('session')}`,true)
      .subscribe((resp:any) => {
        this.company.rutEmp = resp.rutEmp
      },err => {
        console.log(err)
      })
   }

  ngOnInit() {
  }

  generateReport(){
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);
    const ws2: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.dataDetail);
    switch(this.report){
      case'Ventas':
        XLSX.utils.book_append_sheet(wb, ws, 'Ventas ');
        XLSX.utils.book_append_sheet(wb,ws2,'Detalle ');
      break;
      case'Gastos':
        XLSX.utils.book_append_sheet(wb, ws, 'Gastos ');
      break;
      case'Movimientos':
        XLSX.utils.book_append_sheet(wb, ws, 'Movimientos ');
        XLSX.utils.book_append_sheet(wb,ws2,'Detalle productos ');
      break;
    }
  
    

    XLSX.writeFile(wb, `${this.report}_${Date.now()}.xlsx`);
  }

  loadTable(){
    if(this.date1 && this.date2){
      switch(this.report){
        case'Ventas':
        this.data =[
          ['Codigo','Fecha','Rut Empresa','Cliente','Estado','Precio','Medio de pago','Total']
          ]
        this.detailTable = []
    
        this.api.get(`api/sale/rut/${this.company.rutEmp}`,true)
              .subscribe((resp:any) => {
                resp.map((val)=>{
                  let dat = new Date(val.date)
                  let d1 = new Date(`${this.date1.year}-${this.date1.month}-${this.date1.day}`)
                  let d2 = new Date(`${this.date2.year}-${this.date2.month}-${this.date2.day}`)
                  if(dat >= d1 && dat <= d2){
                    this.detailTable.push(val)
                    this.data.push([val.cod,val.date,val.rutEmp+'-'+val.dvEmp,val.client,val.state,val.total,val.type,val.total])
                    this.api.get(`api/saleDetail/codRut/${val.cod},${val.rutEmp}`,true)
                      .subscribe((resp:any)=>{
                        this.dataDetail = [
                          ['Codigo Boleta','Codigo Producto','Descripcion','Cantidad','Valor Unidad','Valor Total']
                          ]
                        resp.map(val=>{
                          this.dataDetail.push([val.cod,val.codProd,val.description,val.quantity,val.value/val.quantity,val.value])
                        })
                        // console.log(resp)
                      },err => {
                        console.log(err)
                      })
                  }
                })
              })
              break;//fin ventas
        case'Gastos':
        this.data =[
          ['Codigo','Fecha Pago','Nombre','Valor']
          ]
          this.detailTable = []
          this.api.get(`api/pays/${this.company.rutEmp}`,true)
            .subscribe((resp:any) => {
              resp.map((val)=>{
                let dat = new Date(val.datePay)
                let d1 = new Date(`${this.date1.year}-${this.date1.month}-${this.date1.day}`)
                let d2 = new Date(`${this.date2.year}-${this.date2.month}-${this.date2.day}`)
                if(dat >= d1 && dat <= d2){
                  this.detailTable.push(val)
                  this.data.push([val.codPay,val.datePay,val.name,val.price])
                }
              })
            },err =>{
              console.log(err)
            })
        break;
        case'Movimientos':
        this.data =[
          ['Codigo Producto','Fecha','Operación','Cantidad']
          ]  
          this.api.get(`api/stock/${this.company.rutEmp}`,true)
            .subscribe((resp:any) => {
              resp.map((val)=>{
                let dat = new Date(val.date)
                let d1 = new Date(`${this.date1.year}-${this.date1.month}-${this.date1.day}`)
                let d2 = new Date(`${this.date2.year}-${this.date2.month}-${this.date2.day}`)
                if(dat >= d1 && dat <= d2){
                  this.detailTable.push(val)
                  this.data.push([val.codProd,val.date,val.operation,val.quantity])
                }
              })
              this.api.get(`api/products/${this.company.rutEmp}`,true)
                .subscribe((resp:any) => {
                  this.dataDetail = [
                    ['Codigo producto','Nombre','Costo','Precio','Categoria','Descripcion','Stock','Fecha de agregado']
                  ]
                  resp.map(val => {
                    this.dataDetail.push([val.cod,val.name,val.cost,val.price,val.category,val.description,val.stock,val.addDate])
                  })
                },err => {
                  console.log(err)
                })
            },err => {
              console.log(err)
            })
        break;
      }
    }
  }


}
