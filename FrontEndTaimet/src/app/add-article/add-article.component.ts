import { Component, OnInit } from '@angular/core';
import {Article} from "../Model/article";
import {ArticleService} from "../Services/article.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../Services/user.service";
import {User} from "../Model/user";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  a: Article = new Article();
  u: User = new User();

  form = new FormGroup({
    nom: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    prix: new FormControl('',Validators.required)
  });
  constructor(private service: ArticleService,
              private serviceUser: UserService,
              private router: Router,
              private snackBar:MatSnackBar,
              private cookie: CookieService) { }

  ngOnInit(): void {
    //alert(this.cookie.get('login'));
  }
  addArticle(): void{
     this.serviceUser.findByLogin(this.cookie.get('login'))
       .subscribe(data =>{
         this.u = data;
        this.a.user=this.u;
         this.service.addArticle(this.a).subscribe(
           data =>{
             this.snackBar.open("articles ajoutés avec succès", "", {
               duration: 3000,
               verticalPosition: 'top',
               panelClass: ['bb']
             });
             console.log(data);
           },error => console.log(error));
       },error => console.log(error));


  }
  onSubmit(): void{
    if(this.form.valid) {
      this.addArticle();
      this.service.findAllArticle();
      this.toListarticles();
    }else{
      this.validateAllFormFields(this.form);
    }
  }
  toListarticles():void{

    this.router.navigate(['/articles']);
  }
  get nom(){
    return this.form.get('nom');
  }
  get description(){
    return this.form.get('description');
  }
  get prix(){
    return this.form.get('prix');
  }
  validateAllFormFields(formGroup: FormGroup)
  {Object.keys(formGroup.controls).forEach(field =>
  {const control = formGroup.get(field);
    if (control instanceof FormControl)
    {control.markAsTouched({ onlySelf: true }); }
    else if (control instanceof FormGroup)
    {this.validateAllFormFields(control); }});
  }
  deconnexion(){
    this.cookie.delete('login');
  }

}
