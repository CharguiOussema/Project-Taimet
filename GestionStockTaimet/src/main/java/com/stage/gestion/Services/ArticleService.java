package com.stage.gestion.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.stage.gestion.Entites.Article;
import com.stage.gestion.Entites.User;
import com.stage.gestion.Repositories.ArticleRepository;
import com.stage.gestion.Repositories.UserRepository;

@Service
public class ArticleService {
	@Autowired
	private ArticleRepository repository;
	@Autowired
	private UserRepository repositoryUser;
	
	public User addUser(User user) {
		user.setEtat("u");
	return 	repositoryUser.save(user);
	}
	
	// solution SignIn N*1
	public List<User> singIn(String login, String password ){
			return repositoryUser.findByLoginAndPasswordWithJPQL(login, password);
	}
	
	public  List<User> findByLoginWithJPQL(String login) {
		return repositoryUser.findByLoginWithJPQL(login);
	}
	
	public Article findArticleById(int id) {
		return repository.findById(id).orElse(null);
	}
	
	
	public void addArticle(Article article)
	{
		repository.save(article);
	}
	
	public String deleteArticle(int id)
	{
		Article a=repository.findById(id).orElse(null);
		repository.delete(a);
		return "article a été supprimé "; 
	}
	
	public List<Article> findAllArticle(){
		return repository.findAll();
	}
	
	public void updateArticle (Article article)
	{
		Article a =repository.findById(article.getId()).orElse(null);
		if(a!=null)
		{
			a.setNom(article.getNom());
			a.setDescription(article.getDescription());
			a.setPrix(article.getPrix());
		}
		repository.save(a);
	}
	
}
