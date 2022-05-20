import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Article} from "../Model/article";
import {ArticleService} from "../Services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../Model/user";
import {UserService} from "../Services/user.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {
 articles: Observable<Article[]>;


  constructor(private service: ArticleService,
              private router: Router,
              private route: ActivatedRoute,
              private serviceUser: UserService,
              private snackBar:MatSnackBar,
              private cookie: CookieService) { }

  ngOnInit(): void {
   this.reloadData();

  }
  reloadData(): any{
    // @ts-ignore
    this.articles = this.service.findAllArticle();

  }

  deleteArticle(id: number, l: string): void{
    if(l === this.cookie.get('login')) {
      this.service.deleteArticle(id).subscribe(data => {
          console.log(data);
        },
        error => console.log(error));
      //this.ngOnInit();

      this.snackBar.open("Article supprimé avec succès", "", {
        duration: 3000,
        verticalPosition: 'bottom',
        panelClass: ['bb']
      });
      location.reload();
    }else{
      this.snackBar.open("tu n'as pas accès", "", {
        duration: 3000,
        verticalPosition: 'bottom',
        panelClass: ['aa']
      });
    }
  }

  addArticle():void{
    this.router.navigate(['/addarticle']);
  }

  updateArticle(id: number,l: string): void{
    if(l === this.cookie.get('login')) {
      this.router.navigate(['/updatearticle', id]);
    }else{
      this.snackBar.open("tu n'as pas accès", "", {
        duration: 3000,
        verticalPosition: 'bottom',
        panelClass: ['aa']
      });
    }
  }
  deconnexion(){
    this.cookie.delete('login');
  }

}
