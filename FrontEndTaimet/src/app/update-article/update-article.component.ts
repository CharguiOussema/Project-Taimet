import { Component, OnInit } from '@angular/core';
import {Article} from "../Model/article";
import {ArticleService} from "../Services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";
import {User} from "../Model/user";
import {UserService} from "../Services/user.service";

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.css']
})
export class UpdateArticleComponent implements OnInit {
  a: Article = new Article();
  id: number;
  u: User = new User();

  form = new FormGroup({
    id: new FormControl('',Validators.required),
    nom: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    prix: new FormControl('',Validators.required)
  });
  constructor(private service: ArticleService,
              private serviceUser: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private cookie: CookieService) { }

  ngOnInit(): void {
    this.getArticleById();

  }



  getArticleById(): void{
    this.id = this.route.snapshot.params.id;
    this.service.getArticleById(this.id)
      .subscribe(data =>{

          // @ts-ignore
          this.a = data ;
        },
        error => console.log(error));
  }


  updateArticle():void {
    this.serviceUser.findByLogin(this.cookie.get('login'))
      .subscribe(data =>{
        this.u = data ;
        this.a.user=this.u;
        this.service.updateArticle(this.a).subscribe(
          data =>{
            this.snackBar.open("Article modifié avec succès", "", {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['bb']
            });
            console.log(data);
          },error => console.log(error));
      },error => console.log(error));

  }

  onSubmit(): void{

    if(this.form.valid){
      this.updateArticle();
      this.service.findAllArticle();
      this.toListarticle();
    }else{
      this.validateAllFormFields(this.form);
    }

  }
  toListarticle(): void{

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
