import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "../Model/article";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  path: string;
  constructor(private http: HttpClient) {
    this.path ='http://localhost:8081/api/';
  }
  findAllArticle(){
    return this.http.get(this.path + 'articles');
  }
  addArticle(a: Article): Observable<any>{
    return this.http.post(this.path+'addArticle', a);
  }
  deleteArticle(id: number){
    return this.http.delete(this.path+'deleteArticle/'+ id);
  }

  updateArticle(a: Article): any{
    return this.http.put(this.path+'updateArticle', a);
  }
  getArticleById(id: number)
  {
    return this.http.get(this.path+"findArticleById/" + id);
  }


}
