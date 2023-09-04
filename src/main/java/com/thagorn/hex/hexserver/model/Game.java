package com.thagorn.hex.hexserver.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "games")
public class Game {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    String name;
    String description;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private User owner;
    @ManyToMany
    private Set<User> players;
    // @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    // private Set<Level> levels;
}
