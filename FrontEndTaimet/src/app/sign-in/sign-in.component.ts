import { Component, OnInit } from '@angular/core';
import {Article} from "../Model/article";
import {UserService} from "../Services/user.service";
import {User} from "../Model/user";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  u: User = new User();
// login: string;
 // password: string;
 form = new FormGroup({
    login: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  })
  constructor(private service: UserService,
              private router: Router,private snackBar:MatSnackBar,
              private cookie: CookieService) { }

  ngOnInit(): void {
  }
  signIn(): void {
    if (this.form.valid) {
      // @ts-ignore
     this.service.singIn(this.login.value, this.password.value)
        .subscribe(data => {
            // @ts-ignore
            this.u = data;
            if(this.u == null){
              this.snackBar.open("le login ou le mot de passe est invalide  ","",{
                duration:3000,
                verticalPosition:'top',
                panelClass: ['aa']
              });
            }
            if (this.u.etat === 'u') {
              this.cookie.set('login', this.u.login);
              this.toListArticleUser();
              this.snackBar.open("Welcome "+this.u.nom+" "+this.u.prenom,"",{
                duration:3000,
                verticalPosition:'top',
                panelClass: ['bb']
              });
            } else {
              // pour ajouter une cookie
             this.cookie.set('login', this.u.login);
                this.toListeArticle();
                this.snackBar.open("Welcome "+this.u.nom+" "+this.u.prenom,"",{
                  duration:3000,
                  verticalPosition:'top',
                  panelClass: ['bb']
                    });
              }
            console.log(data);
          },
          error => {
            console.log(error)
          });
    }else{
      this.validateAllFormFields(this.form);

    }
  }

  toListeArticle():void{
    this.router.navigate(['/articles']);
  }


  toSignUp(): void {
    this.router.navigate(['/adduser']);
  }
  toListArticleUser(): void{
    this.router.navigate(['/articlesuser']);
  }
  get login(){
    return this.form.get('login');
  }
  get password(){
    return this.form.get('password');
  }
  validateAllFormFields(formGroup: FormGroup)
  {Object.keys(formGroup.controls).forEach(field =>
  {const control = formGroup.get(field);
    if (control instanceof FormControl)
    {control.markAsTouched({ onlySelf: true }); }
    else if (control instanceof FormGroup)
    {this.validateAllFormFields(control); }});
  }
}
