import { BrowserModule } from '@angular/platform-browser';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Ng2Rut } from 'ng2-rut';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RolesComponent } from './roles/roles.component';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FormsModule } from '@angular/forms';
import { UtilityService } from './services/utility.service';
import { MyGuard } from './services/my-guard.service';
import { ProductComponent } from './product/product.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { ProfileComponent } from './profile/profile.component';
import { SalesComponent } from './sales/sales.component';
import { SearchPipe } from './pipes/search.pipe';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { ThousandsPipe } from './pipes/thousands.pipe';
import { ClientComponent } from './client/client.component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { ReportsComponent } from './reports/reports.component';
import { DataTablesModule } from 'angular-datatables';
import { PayComponent } from './pay/pay.component';
import { TestComponent } from './test/test.component';
import { ApiService } from './services/api.service';
import { IndexComponent } from './index/index.component';



const appRoutes : Routes = [
  {path:'roles', component: RolesComponent},
  {path:'register', component: RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component: ProfileComponent},
  {path:'',component: IndexComponent},
  {path:'expenses', component: ExpensesComponent},
  {path:'products', component:ProductComponent},
  {path:'sales', component:SalesComponent},
  {path:'client', component:ClientComponent},
  {path:'reports', component:ReportsComponent},
  {path:'pay', component:PayComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    RegisterComponent,
    LoginComponent,
    ProductComponent,
    ExpensesComponent,
    ProfileComponent,
    SalesComponent,
    SearchPipe,
    ThousandsPipe,
    ClientComponent,
    ReportsComponent,
    PayComponent,
    TestComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    SweetAlert2Module.forRoot(),
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BootstrapModalModule.forRoot({container:document.body}),
    Ng2Rut,
    MDBBootstrapModule.forRoot(),
    DropDownsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    SweetAlert2Module,
    DataTablesModule,
  ],
  providers: [ApiService, UtilityService, MyGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
