import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../Services/article.service";
import {Article} from "../Model/article";
import {User} from "../Model/user";
import {UserService} from "../Services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  u: User = new User();
  testlogin: User = new User();
  form = new FormGroup({
    nom: new FormControl('',Validators.required),
    prenom: new FormControl('',Validators.required),
    login: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })
  constructor(private service: UserService,
              private router: Router,
              private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }
  addUser(): void{
    console.log(this.form.value);
    this.service.addUser(this.form.value).subscribe(
      data => {
        // @ts-ignore
        this.u = data;
        this.snackBar.open("Utilisateur ajouté avec succès", "", {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['bb']
        });

      }, error => {
        console.log(error);
      });


  }

  onSubmit(): void{

    if(this.form.valid) {
      this.service.findByLogin(this.login.value)
        .subscribe(data =>{
            this.testlogin = data ;
            if(this.testlogin == null ){
              this.addUser();
              this.toSignIn();
            }else{
              this.snackBar.open("L'utilisateur existe déjà", "", {
                duration: 3000,
                verticalPosition: 'top',
                panelClass: ['aa']
              });
            }
          },
          error => console.log(error));
    }else{
      this.validateAllFormFields(this.form);
    }
  }

  toSignIn(): void{
    this.router.navigate(['/signin']);
  }
  /*toListArticleUser(): void{
    this.router.navigate(['/articlesuser']);
  }*/



  get nom(){
    return this.form.get('nom');
  }
  get prenom(){
    return this.form.get('prenom');
  }
  get login(){
    return this.form.get('login');
  }
  get password(){
    return this.form.get("password");
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
