package com.thagorn.hex.hexserver.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "levels")
public class Level {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    String name;
    String description;
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<HexMap> maps;
}
