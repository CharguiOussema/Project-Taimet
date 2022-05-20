package com.stage.gestion.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException.BadRequest;

import com.stage.gestion.Entites.Article;
import com.stage.gestion.Entites.User;
import com.stage.gestion.Services.ArticleService;

import javassist.tools.web.BadHttpRequest;

@RestController
@RequestMapping("/api")
public class ArticleControler {

	@Autowired
	private ArticleService service;
	
	@PostMapping("/addUser")
	public User addUser(@RequestBody User u) {
		return service.addUser(u);
	}
	
	
	// solution SignIn N*1
	@GetMapping(path="SignIn/{login}/{password}")
	public ResponseEntity<User> singIn(@PathVariable String login, @PathVariable String password ){
		List<User> users= service.singIn(login, password);
		int j=0;
		if(!users.isEmpty()) {
		for(int i=0;i<=users.size();i++) {

			 if ((users.get(i).getLogin().equals(login))&&( users.get(i).getPassword().equals(password)) ) {
				 return new ResponseEntity<User>(users.get(i),HttpStatus.OK);
			}else {
				j++;
				if(j==users.size())
					return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
				}
			}
		}
		return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
			
	}
	
	
	@GetMapping(path="findByLogin/{login}")
	public ResponseEntity<User> findByLoginWithJPQL(@PathVariable String login){
		List<User> users= service.findByLoginWithJPQL(login);
		int j=0;
		if(!users.isEmpty()) {
		for(int i=0;i<=users.size();i++) {

			 if (users.get(i).getLogin().equals(login) ) {
				 return new ResponseEntity<User>(users.get(i),HttpStatus.OK);
			}else {
				j++;
				if(j==users.size())
					return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
				}
			}
		}
		return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
			
	}
/*	@GetMapping(path="SignIn/{login}/{password}")
	public User singIn(@PathVariable String login, @PathVariable String password ){
		List<User> users= service.singIn(login, password);
		int j=0;
		if(!users.isEmpty()) {
		for(int i=0;i<=users.size();i++) {

			 if ((users.get(i).getLogin().equals(login))&&( users.get(i).getPassword().equals(password)) ) {
				 return users.get(i);
			}else {
				j++;
				if(j==users.size())
					return null;
				}
			}
		}
		return null;
			
	}*/
	
	
	
	
	@GetMapping("findArticleById/{id}")
	public Article findArticleById(@PathVariable int id) {
		return service.findArticleById(id);
	}
	
	
	@PostMapping("/addArticle")
	public void addArticle(@RequestBody Article a) {
		service.addArticle(a);
	}
	
	@GetMapping("/articles")
	public List<Article> findAllArticle(){
		return service.findAllArticle();
	}
	
	@DeleteMapping("/deleteArticle/{id}")
	public String deleteArticle(@PathVariable int id) {
		return service.deleteArticle(id);
	}
	
	@PutMapping("/updateArticle")
	public void updateArticle(@RequestBody Article a) {
		service.updateArticle(a);
	}
}
