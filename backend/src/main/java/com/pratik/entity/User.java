package com.pratik.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity(name ="Users")
@Data
public class User {
 
	  @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Integer id;
	 
	 private String username;
	 
	 private String password;
	 
	  @Column(name = "user_role") 
	 private String role;
}
