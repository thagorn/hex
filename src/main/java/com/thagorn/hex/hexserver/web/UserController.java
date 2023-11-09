package com.thagorn.hex.hexserver.web;

import com.thagorn.hex.hexserver.model.User;
import com.thagorn.hex.hexserver.model.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final Logger log = LoggerFactory.getLogger(LevelController.class);
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
      this.userRepository = userRepository;
    }

    @PostMapping("/")
    ResponseEntity<User> createUser(@Valid @RequestBody User user) throws URISyntaxException {
        log.info("Request to register user: {}", user);
        User result = userRepository.save(user);
        return ResponseEntity.created(new URI("/api/user/" + result.getId()))
                .body(result);
    }

    @GetMapping("/")
    Collection<User> getAll() {
        return userRepository.findAll();
    }

}
