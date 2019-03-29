import {Injectable} from "@angular/core";
import {CanActivate} from "@angular/router";
import { UserService } from "./user.service";
@Injectable()
export class MyGuard implements CanActivate{
    loggedIn = false;
    constructor(private userService:UserService){
        userService.isLogged().pipe()
            .subscribe((result:any)=>{
                // console.log(result)
                if(result.cod != 0){
                    this.loggedIn = true;
                }else{
                    this.loggedIn = false;
                }
            }, (err)=>{
                // console.log(err)
                this.loggedIn = false;
            })
    }
    canActivate(){
        return this.loggedIn;
    }
}