import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from '../services/utility.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
products:any 
product:any = {}
company:any = {}
add:any = {}
query: string = ''
user:any
  constructor(private api: ApiService, private modalService: NgbModal,private utilService: UtilityService) {
    let session = localStorage.getItem('session')
    this.api.get(`api/users/${session}`,true)
      .subscribe((resp:any) =>{
        this.user = resp
        this.company.rutEmp = resp.rutEmp
        this.company.dvEmp = resp.dvEmp
        this.api.get(`api/companies/${resp.rutEmp}`,true)
          .subscribe(resp =>{
            this.loadTable()
          },err => {
            // console.log(err)
          })
      },err => {
        // console.log(err)
      })
  }

  ngOnInit() {
  }

  open(content) {
    this.product = {}
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
    document.getElementById('txtCod').removeAttribute('disabled')
    document.getElementById('txtStock').removeAttribute('disabled')
    document.getElementById('txtCosto').removeAttribute('disabled')
  }

  modifyProd(content, prod){
    this.product = prod
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'})
      .result.then(resp => {
        }, (reason) =>{
        })
        document.getElementById('txtCod').setAttribute("disabled","true")
        document.getElementById('txtStock').setAttribute("disabled","true")
        document.getElementById('txtCosto').setAttribute("disabled","true")
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  addStock(stock,prod){
    this.add.stock = 0
    this.product = prod
    this.modalService.open(stock,{ size: 'sm', centered:true})
      .result.then(resp => {
      }, (reason) =>{
      })
  }

  saveStock(){
    this.product.stock += this.add.stock
    let stock:any = {}
    stock.rutEmp = this.company.rutEmp
    stock.codProd = this.product.cod
    stock.operation = `Agregado:${this.user.rut}-${this.user.dv}`
    stock.quantity = this.add.stock
    stock.date = Date.now()
    this.api.post(`api/stock`,stock,true)
      .subscribe(resp => {
        this.api.put(`api/product/${this.product._id}`,this.product,true)
        .subscribe(resp => {
          alert('Stock agregado con éxito')
          this.loadTable()
          this.modalService.dismissAll('Cross click')
        },err =>{
          console.log(`Error al guardar stock, error: ${err.error.message}`)
        })   
      },err =>{
        console.log(`Error al guardar stock, Error: ${err.error.message}`)
      }) 
  }

  save(){
    if(this.product.cod && this.product.name && this.product.cost && this.product.price && this.product.stock && this.product.category && this.product.description){
      if(this.product._id){
        this.api.put(`api/product/${this.product._id}`,this.product, true)
          .subscribe(resp=>{
            alert('Modificacion exitosa')
            this.loadTable()
            this.modalService.dismissAll('Cross click')
          }, err =>{
            alert('Ha ocurrodp un problema al modificar, favor contacte con administrador')
            this.modalService.dismissAll('Cross click')
          })
      } else {
          let flag = false
          if(this.products){
            this.products.map(val => {
              if(val.cod == this.product.cod){
                flag = true
              }
            })
          }
          if(!flag){
            this.product.rutEmp = this.company.rutEmp
            this.product.dvEmp = this.company.dvEmp
            this.product.addDate = Date.now()
            this.api.post(`api/product`, this.product,true)
              .subscribe(resp =>{
                alert('Producto guardado con exito')
                this.loadTable()
                this.modalService.dismissAll('Cross click')
              },err =>{
                alert('Error al guardar ')
                this.modalService.dismissAll('Cross click')
                // console.log(err)
              })
          } else {
            alert('Codigo de producto ya existe')
          }
        }
    } else {
      alert('Debe llenar todos los campos del formulario')
    }
    
  }

  validator(){

  }

  loadTable(){
    this.api.get(`api/products/${this.company.rutEmp}`,true)
    .subscribe((resp:any)=>{
      if(resp && resp.length > 0){
        this.products = resp    
      } else {
        this.products = null
      }
    },err => {
      alert('No se ha podido cargar tabla, favor contacte a administrador')
      // console.log(err)
    })
  }

  deleteProd(idProd){
    let val = confirm('Seguro que desea eliminar este producto?')
    if(val){
      this.api.delete(`api/product/${idProd}`,true)
      .subscribe(resp =>{
        alert('Producto eliminado')
        this.loadTable()
      },err => {
        alert('Ha ocurrido un problema al eliminar producto ')
      })
    }
  }



}
