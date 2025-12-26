package com.pratik.restcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pratik.entity.User;
import com.pratik.repo.UserRepository;

@RestController
@RequestMapping("/auth")
public class Authcontroller {
     
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	BCryptPasswordEncoder encoder;
	  
	@PostMapping("/save")
	public ResponseEntity<User> createUsers(@RequestBody User user) {
	    user.setRole("USER");
	    user.setPassword(encoder.encode(user.getPassword()));
	    User save = userRepository.save(user);
	    return new ResponseEntity<>(save, HttpStatus.CREATED);
	}

}
