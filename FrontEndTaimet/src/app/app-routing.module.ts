import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListArticlesComponent} from "./list-articles/list-articles.component";
import {AddArticleComponent} from "./add-article/add-article.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {UpdateArticleComponent} from "./update-article/update-article.component";
import {ListArticlesUserComponent} from "./list-articles-user/list-articles-user.component";

const routes: Routes = [
  {path: 'articles', component: ListArticlesComponent},
  {path: 'addarticle', component: AddArticleComponent},
  {path: 'adduser', component: AddUserComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'updatearticle/:id', component: UpdateArticleComponent},
  {path: 'articlesuser', component: ListArticlesUserComponent},
  {path: '', redirectTo: 'signin', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
