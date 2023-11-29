package com.thagorn.hex.hexserver.web;

import com.thagorn.hex.hexserver.model.User;
import com.thagorn.hex.hexserver.model.UserRepository;
import com.thagorn.hex.hexserver.web.GenericFormResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final Logger log = LoggerFactory.getLogger(LevelController.class);
    private final UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository) {
      this.userRepository = userRepository;
    }

    @PostMapping("/")
    ResponseEntity<GenericFormResponse> createUser(@Valid @RequestBody User user) throws URISyntaxException {
        User existingUser = userRepository.findByUsernameOrEmail(user.getUsername(), user.getEmail());
        if (existingUser != null) {
            String message;
            if (existingUser.getUsername().equals(user.getUsername())) {
                message = "That username is already being used.";
            } else if (existingUser.getEmail().equals(user.getEmail())) {
                message = "A user associated with that email address already exists.";
            } else {
                message = "Something weird happened in UserController.java"; //should be unreachable
            }
            GenericFormResponse response = new GenericFormResponse(message, false);
            return ResponseEntity.badRequest().body(response);
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        log.info("Existing user: {}", existingUser);
        log.info("Request to register user: {}", user);
        User result = userRepository.save(user);
        GenericFormResponse response = new GenericFormResponse(null, true);
        return ResponseEntity.created(new URI("/api/user/" + result.getId()))
                .body(response);
    }

    @GetMapping("/")
    Collection<User> getAll() {
        return userRepository.findAll();
    }
}
