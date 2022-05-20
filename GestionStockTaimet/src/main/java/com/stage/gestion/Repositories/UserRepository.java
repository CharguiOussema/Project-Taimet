package com.stage.gestion.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.stage.gestion.Entites.User;

@Repository
public interface UserRepository  extends JpaRepository<User, Integer> {
	
	// solution SignIn N*2
	@Query("SELECT u FROM User u WHERE u.login = ?1 AND u.password = ?2")
	public List<User> findByLoginAndPasswordWithJPQL(String login,String password);
	
	
		@Query("SELECT u FROM User u WHERE u.login = ?1")
		public List<User> findByLoginWithJPQL(String login);
}
