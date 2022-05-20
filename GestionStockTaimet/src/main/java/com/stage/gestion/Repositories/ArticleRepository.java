package com.stage.gestion.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stage.gestion.Entites.Article;


@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {

}
