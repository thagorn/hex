package com.thagorn.hex.hexserver.auth;

import org.springframework.stereotype.Service;

import com.thagorn.hex.hexserver.model.User;
import com.thagorn.hex.hexserver.model.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class CustomUserDetailsService implements UserDetailsService {
  @Autowired
  private UserRepository userRepository;
  
  @Override
  public UserDetails loadUserByUsername(String username) {
    System.out.println(username);
    User user = userRepository.findByUsername(username);
    System.out.println("Hello ");
    if (user == null) {
        throw new UsernameNotFoundException(username);
    }
    return new CustomUserPrincipal(user);
  }
}
