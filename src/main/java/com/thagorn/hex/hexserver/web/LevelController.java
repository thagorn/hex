package com.thagorn.hex.hexserver.web;

import com.thagorn.hex.hexserver.model.Level;
import com.thagorn.hex.hexserver.model.LevelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api/level")
public class LevelController {

    private final Logger log = LoggerFactory.getLogger(LevelController.class);
    private final LevelRepository levelRepository;

    public LevelController(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    @GetMapping("/")
    Collection<Level> getAll() {
        return levelRepository.findAll();
    }

    @GetMapping("/{id}")
    ResponseEntity<?> getById(@PathVariable Long id) {
        Optional<Level> level = levelRepository.findById(id);
        return level.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    ResponseEntity<Level> createLevel(@Valid @RequestBody Level level) throws URISyntaxException {
        log.info("Request to create level: {}", level);
        Level result = levelRepository.save(level);
        return ResponseEntity.created(new URI("/api/level/" + result.getId()))
                .body(result);
    }

    @PutMapping("/{id}")
    ResponseEntity<Level> updateLevel(@Valid @RequestBody Level level) {
        log.info("Request to update level: {}", level);
        Level result = levelRepository.save(level);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Level> deleteLevel(@PathVariable Long id) {
        log.info("Request to delete level: {}", id);
        levelRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
