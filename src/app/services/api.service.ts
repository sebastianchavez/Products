import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ApiService {
        httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json', authorization: localStorage.getItem('token') })
        }
        api: String = 'http://localhost:3001/'
        constructor(public http: HttpClient) { }

        get(url,options:boolean) {
                if(!options){
                        return this.http.get(`${this.api}${url}`)
                } else{
                        return this.http.get(`${this.api}${url}`,this.httpOptions)
                }
        }

        post(url, body,options:boolean) {
                if (!options){
                        return this.http.post(`${this.api}${url}`, body)
                } else {
                        return this.http.post(`${this.api}${url}`, body,this.httpOptions)
                }
        }

        put(url, body, options:boolean) {
                if (!options){
                        return this.http.put(`${this.api}${url}`, body)
                } else {
                        return this.http.put(`${this.api}${url}`, body, this.httpOptions)
                }
        }

        delete(url, options:boolean) {
                if(!options){
                        return this.http.delete(`${this.api}${url}`)
                } else {
                        return this.http.delete(`${this.api}${url}`,this.httpOptions)
                }
        }
        isLogged(){
                return this.http.get(`${this.api}api/auth`)
        }
}