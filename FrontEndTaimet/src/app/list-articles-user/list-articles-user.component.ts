import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../Services/article.service";
import {Observable} from "rxjs";
import {Article} from "../Model/article";
import {User} from "../Model/user";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../Services/user.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-list-articles-user',
  templateUrl: './list-articles-user.component.html',
  styleUrls: ['./list-articles-user.component.css']
})
export class ListArticlesUserComponent implements OnInit {
  articles: Observable<Article[]>;


  constructor(private service: ArticleService,private cookie: CookieService) { }

  ngOnInit(): void {
  this.reloadData();

  }
  reloadData(): any{

    // @ts-ignore
    this.articles = this.service.findAllArticle();
  }
  deconnexion(){
    this.cookie.delete('login');
  }
}
