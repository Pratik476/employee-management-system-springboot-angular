package com.pratik.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pratik.entity.User;
import com.pratik.repo.UserRepository;

@Service
public class CustomUserService implements UserDetailsService {

	

	private final UserRepository repository;

	public CustomUserService(UserRepository repository) {
	    this.repository = repository;
	}

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        Optional<User> optionalUser =
                repository.findByUsername(username);

        User user = optionalUser.orElseThrow(
            () -> new UsernameNotFoundException(
                "User not found with name: " + username)
        );

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole()) // USER → ROLE_USER
                .build();
    }
}
