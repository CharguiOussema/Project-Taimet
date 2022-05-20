package com.stage.gestion.Entites;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class User implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int u_id;
	private String nom;
	private String prenom;
	private String login;
	private String password;
	@Column( columnDefinition="varchar(1) default 'u'")
	private String etat;
	@OneToMany(mappedBy = "user")
	@JsonBackReference
	private List<Article> articles;


	
	
	public User() {
		
	}


	public User(String nom, String prenom, String login, String password, String etat) {
	
		this.nom = nom;
		this.prenom = prenom;
		this.login = login;
		this.password = password;
		this.etat = etat;
	}


	public int getU_id() {
		return u_id;
	}


	public void setU_id(int u_id) {
		this.u_id = u_id;
	}


	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getPrenom() {
		return prenom;
	}


	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public String getLogin() {
		return login;
	}


	public void setLogin(String login) {
		this.login = login;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getEtat() {
		return etat;
	}


	public void setEtat(String etat) {
		this.etat = etat;
	}




	@Override
	public String toString() {
		return "User [u_id=" + u_id + ", nom=" + nom + ", prenom=" + prenom + ", login=" + login + ", password="
				+ password + ", etat=" + etat + "]";
	}




	


	
	
	
	


	
	}
	
