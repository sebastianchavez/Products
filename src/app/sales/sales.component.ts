import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UtilityService } from '../services/utility.service';
import { Router } from '../../../node_modules/@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
products:any = []
listItems = []
clientList = []
newClient = false
company:any
product:any
prod:any
total:any = 0
prods = []
client:any = {}
sale:any  = {}
  constructor(private api: ApiService, private utilService:UtilityService, private router: Router) { 
    this.addClientList()
    this.api.get(`api/users`,true)
      .subscribe((resp:any) => {
        api.get(`api/companies/${resp.rutEmp}`,true)
          .subscribe(resp => {
            this.company = resp
          },err =>{
            console.log(err)
          })
        api.get(`api/products/${resp.rutEmp}`,true)
          .subscribe((resp:any) => {
            if(resp && resp.length > 0){
              resp.map((val)=>{
                let v = `${val.cod} .- ${val.name}`
                this.listItems.push(v)
              })
            } else{
              this.listItems = null
            }
          },err =>{
          })
      },err => {
      })
  }
  

  ngOnInit() {
  }

  

  ValidateRut(){
    if(this.client.roluni){
     let resultValRut = this.utilService.ValidateRut(this.client.roluni)
     if(resultValRut == false){
       alert('Rut inválido')
       this.client.roluni = ''
     }
    } else {
      this.client = {}
    }
  }

  addClientList(){
    this.api.get(`api/clients`,true)
      .subscribe((resp:any)=> {
        this.clientList = []
        if (resp.length > 0) {
          resp.map((val)=>{
            this.clientList.push(`${val.rut}-${val.dv}`)
          })
        }        
      },err => {
        this.clientList = []
      })
  }

  addClient(){
    if(this.client.roluni){
      this.api.get(`api/client/${this.utilService.SeparaRut(this.client.roluni)}`,true)
      .subscribe(resp => {
        this.client = resp
        // console.log(resp)
        this.client.roluni = this.utilService.Miles(this.client.rut)+'-'+this.client.dv
      },err => {
        console.log(err)
        if(err.error.cod == 0) {
          let val = confirm('No existe cliente, desea agregarlo?')
          if(val == true){
            this.newClient = true
          } else {
            this.client.dv = this.utilService.SeparaDv(this.client.roluni)
            this.client.rut = this.utilService.SeparaRut(this.client.roluni)
          }
        }
      })
    }
  }

  addProduct(){
    let codProd = this.prod.split(" .- ")[0]
    this.api.get(`api/product/cod/${codProd},${this.company.rut}`,true)
      .subscribe((resp:any) =>{
        // console.log(resp)
        let stock = 0
        this.products.map(val => {
          if(val.cod == resp.cod){
            stock++
          }
        })
        if(stock >= resp.stock){
          alert(`Solo existen ${resp.stock} unidad(es) disponible(s) de este producto`)
        } else {
          resp.date = Date.now()
          this.products.push(resp)
          this.products.sort((a, b) => {
            return (a.cod - b.cod)
          })
          this.total += resp.price
          this.prod = ''
        }
      },err => {
        console.log(err)
      })
  }

  deleteProd(id){
    this.products.map((val,index)=>{
      if(val.date == id){
        this.products.splice(index,1)
        this.total -= val.price
      }
    })
  }

  cancel(){
    this.client = {}
    this.products = []
    this.total = 0  
  }

  save(){
    this.saveProds()
    this.api.get(`api/lastSale/${this.company.rut}`,true)
      .subscribe((resp:any) => {
        // console.log(resp)
        this.sale.rutEmp = this.company.rut
        this.sale.dvEmp = this.company.dv
        this.sale.cod = resp.cod + 1
        this.sale.type = 'efectivo'
        this.sale.date = Date.now()
        this.sale.client = this.client.rut
        this.sale.total = this.total
        this.sale.state = 'pagado'
        this.api.post(`api/sale`,this.sale,true)
          .subscribe(resp => {
            this.prods.map(val=>{
              let saleDetail:any = {}
              saleDetail.rutEmp = this.company.rut
              saleDetail.dvEmp = this.company.dv
              saleDetail.cod = this.sale.cod
              saleDetail.codProd = val.cod
              saleDetail.description = val.desc
              saleDetail.quantity = val.cant
              saleDetail.value = val.valor
              this.api.post(`api/saleDetail`,saleDetail,true)
                .subscribe(resp => {
                },err => {
                  alert('Ha ocurrido un error, favor contacte al administrador')
                  // console.log('error: ' + err)
                  return
                })
            })
            let codprod = ''
            let flag = false
            this.prods.map(val=>{
              val.stock = val.stock - val.cant
              let stock:any = {}
              stock.rutEmp = this.company.rut
              stock.codProd = val.cod
              stock.operation = `Venta:${this.sale.cod}`
              stock.quantity = val.cant
              stock.date = this.sale.date
              this.api.post(`api/stock`,stock ,true)
                .subscribe(resp => {
                  console.log(`Stock guardado`)
                },err => {
                  console.log(`Error al guardar stock, error: ${err.error.message}`)
                })
              let resp = this.updateProds(val)
              if (resp == false){
                if (flag == true) {
                  codprod += ', '
                }
                flag == true
                codprod += val.cod
              }
            })
            if (flag != false){
              alert(`Problema al guardar producto(s) con código ${codprod}.`)
            }
            if(this.client.roluni){
              if(this.client._id){
                this.api.put(`api/client/${this.client._id}`,this.client, true)
                  .subscribe(resp => {
                    console.log(`Usuario actualizado`)
                  },err =>{
                    console.log(`Error al guardar usuario, error: ${err.error.message}`)
                  })
              } else {
                this.client.rut = this.utilService.SeparaRut(this.client.roluni)
                this.client.dv = this.utilService.SeparaDv(this.client.roluni)
                this.api.post(`api/client`,this.client, true)
                  .subscribe(resp => {
                    console.log(`Usuario guardado con éxito`)
                  },err => {
                    console.log(`Error al guardar usuario, error: ${err.error.message}`)
                  })
              }
            }

            alert('Venta guardada con éxito')
            this.generatePDF()
            this.products = []
            this.prods = []
            this.client = {}
            this.newClient = false
            this.client.roluni = ''
            this.addClientList()
          },err => {
            alert('Ha ocurrido un error, favor contacte al administrador')
            // console.log('error: ' + err)
          })
      },err =>{
        alert('Ha ocurrido un error, favor contacte al administrador')
        // console.log('error: ' + err)
      })
  }

  updateProds(prod):Boolean{
    let flag = false
    this.api.put(`api/product/${prod._id}`,prod, true)
      .subscribe(resp => {
        flag = true
      },err => {
        console.log(err)
        flag = false
      })
      return flag
  }


  saveProds(){
    let flag = false
    this.products.map((val)=>{
      let arr:any = {}
      if(this.prods.length == 0){
        arr = val
        arr.cant = 1
        arr.desc = val.name
        arr.valor = val.price
        this.prods.push(arr)
      } else {
        this.prods.map((val2,index) => {
          if(val2._id == val._id){
            flag = true
            arr = val
            arr.cant = val2.cant + 1
            arr.desc = val.name
            arr.valor = val2.valor + val.price
            this.prods.splice(index,1)
            this.prods.push(arr)
          } else {
            flag = false
          } 
        })
        if(flag == false){
          arr = val
          arr.cant = 1
          arr.desc = val.name
          arr.valor = val.price
          this.prods.push(arr)
        }
      }
    })
  }

  generatePDF(){
    var doc = new jsPDF()
    //Rectangulos y tablas
    doc.rect(5, 5, 200, 286)    
    doc.rect(120,13,80,30)
    doc.rect(10,50,190,30)
    doc.rect(10,90,190,160)
    doc.rect(137,255,63,10)
    doc.line(10, 95, 200, 95)
    doc.line(40,90,40,250)
    doc.line(137,90,137,250)
    doc.line(170,90,170,250)

    let rut 
    if(this.client.roluni){
      rut = this.utilService.Miles(this.client.rut)+'-'+this.client.dv
    } else {
      rut = 'N/A'
    }
    //Encabezado
    doc.setFontStyle('bold')
    doc.text(`RUT: ${this.utilService.Miles(this.company.rut)}-${this.company.dv}`,135,23)
    doc.text(`BOLETA ELECTRONICA`,125,30)
    doc.text(`N°: ${this.utilService.zfill(this.sale.cod,12)}`,135,37)
    doc.text(`${this.company.name}`,20,20)    
    doc.setFontStyle('normal')
    doc.setFontSize(10)
    doc.text(`${this.company.business}`,20,25)
    doc.text(`${this.company.direction}`,20,35)
    doc.text(`${this.company.contact}`,20,40)

    //Datos Cliente
    doc.text(`SEÑOR(ES):`,15,55)
    doc.text(`${this.client.name}`,40,55)
    doc.text(`DIRECCION:`,15,60)
    doc.text(`${this.client.direction}`,40,60)
    doc.text(`COMUNA:`,15,65)
    doc.text(`${this.client.commune}`,40,65)
    doc.text(`REGION:`,15,70)
    doc.text(`${this.client.region}`,40,70)
    doc.text(`FECHA:`,120,55)
    let date = new Date(Date.now())
    let day = date.getDate().toString()
    let month = (date.getMonth() + 1).toString()
    if(day.length == 1)  {day = 0 + '' + day} 
    if(month.length == 1) {month = 0 + '' + month}
    doc.text(`${day}-${month}-${date.getFullYear()}`,150,55)
    doc.text('R.U.T.:',120,60)
    doc.text(`${rut}`,150,60)
    doc.text('TELEFONO:',120,65)
    doc.text(`${this.client.contact}`,150,65)

    //Detalle de compra
    doc.text('CANTIDAD',15,94)
    doc.text('DETALLE',80,94)
    doc.text('VALOR UNIT.',143,94)
    doc.text('TOTAL',180,94)
    doc.text('TOTAL',143,261)
    let file = 100
    this.prods.map((val,index)=>{
      doc.text(`${val.cant}`,22,file)
      doc.text(`${val.desc}`,50,file)
      doc.text(`$ ${this.utilService.Miles(val.valor / val.cant)}`,145,file)
      doc.text(`$ ${this.utilService.Miles(val.valor)}`,178,file)
      file += 4
    })
    doc.text(`$ ${this.utilService.Miles(this.total)}`,178,261)    
    doc.save(`${this.sale.cod}_${Date.now()}.pdf`)
  }
  
}
