package com.thagorn.hex.hexserver.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LevelRepository extends JpaRepository<Level, Long> {
    Level findByName(String name);
}
