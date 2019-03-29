import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expense:any = {}
  company:any = {}
  expenses: any
  query: string = ''
  constructor(private modalService: NgbModal, private api:ApiService) {
    let session = localStorage.getItem('session')
    this.api.get(`api/users/${session}`,true)
      .subscribe((resp:any) =>{
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
    this.expense = {}
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  modifyExpense(content, expense){
    this.expense = expense
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'})
      .result.then(resp => {
        }, (reason) =>{
        })
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  save(){
    if(this.expense.cod && this.expense.name && this.expense.category && this.expense.price && this.expense.description){
      if(this.expense._id){
        this.api.put(`api/expense/${this.expense._id}`,this.expense, true)
          .subscribe(resp=>{
            alert('Modificacion exitosa')
            this.loadTable()
            this.modalService.dismissAll('Cross click')
          }, err =>{
            alert('Ha ocurrido un problema al modificar, favor contacte con administrador')
            this.modalService.dismissAll('Cross click')
          })
      } else {
        let flag = false
        
        if(this.expenses) {
          this.expenses.map(val => {
            if(val.cod == this.expense.cod){
              flag = true
            }
          })
        }
          if (!flag){
            this.expense.rut = this.company.rutEmp
            this.expense.dv = this.company.dvEmp
            this.expense.addDate = Date.now()
            this.api.post(`api/expense`, this.expense, true)
              .subscribe(resp =>{
                alert('Gasto guardado con exito')
                this.loadTable()
                this.modalService.dismissAll('Cross click')
              },err =>{
                alert('Error al guardar ')
                this.modalService.dismissAll('Cross click')
                // console.log(err)
              })
          } else {
            alert('Ya existe este código de gasto')
          }
        }
      } else {
        alert('Debe llenar todos los campos del formulario')
      }
  }

  loadTable(){
    this.api.get(`api/expenses/${this.company.rutEmp}`,true)
    .subscribe((resp:any)=>{
      // console.log(resp)  
      if(resp && resp.length > 0){
        this.expenses = resp    
      } else {
        this.expenses = null
      }
    },err => {
      alert('No se ha podido cargar tabla, favor contacte a administrador')
      // console.log(err)
    })
  }

  deleteExp(idEx){
    let val = confirm('Seguro que desea eliminar este gasto?')
    if (val) {
      this.api.delete(`api/expense/${idEx}`,true)
      .subscribe(resp =>{
        alert('Gasto eliminado')
        this.loadTable()
      },err => {
        alert('Ha ocurrido un problema al eliminar producto ')
      })
    }
  }
}
