import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../Model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string;

  constructor(private http: HttpClient) {
    this.path ='http://localhost:8081/api/';
  }

  addUser(s: User){
    return this.http.post(this.path+'addUser', s);
  }
  singIn(login:string, password: string){
    return this.http.get(this.path+'SignIn/'+ login + '/' + password);
  }
  findByLogin(login:string): any{
    return this.http.get(this.path+'findByLogin/'+ login);
  }
}
