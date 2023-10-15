package com.thagorn.hex.hexserver;

import com.google.common.collect.ImmutableSet;
import com.thagorn.hex.hexserver.model.HexMap;
import com.thagorn.hex.hexserver.model.User;
import com.thagorn.hex.hexserver.model.UserRepository;
import com.thagorn.hex.hexserver.model.Level;
import com.thagorn.hex.hexserver.model.LevelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.stream.Stream;

@Component
public class TestDataInitializer implements CommandLineRunner {

    private final LevelRepository repository;
    private final UserRepository user_repository;

    public TestDataInitializer(LevelRepository repository, UserRepository user_repository) {
        this.repository = repository;
        this.user_repository = user_repository;
    }

    @Override
    public void run(String... args) throws Exception {
        Stream.of("Test Level 1", "DND level", "The other test level",
                "Pretends to be the third test level").filter(
                    name -> repository.findByName(name) == null
                ).forEach(name ->
                {
                    repository.save(new Level(name));
                }
        );

        Level level = repository.findByName("DND level");
        HexMap firstMap = HexMap.builder()
                .name("floor 1")
                .description("the first floor of this level")
                .build();
        HexMap secondMap = HexMap.builder()
                .name("floor 2")
                .description("the second floor of this level")
                .build();
        level.setMaps(ImmutableSet.of(firstMap, secondMap));
        repository.save(level);

        repository.findAll().forEach(System.out::println);

        if (user_repository.findByUsername("TestUser") == null) {
            User test_user = new User();
            test_user.setUsername("TestUser");
            test_user.setPassword("{noop}password");
            user_repository.save(test_user);
        }
        user_repository.findAll().forEach(System.out::println);
    }

}
