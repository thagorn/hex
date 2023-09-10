package com.thagorn.hex.hexserver.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "hex_maps")
public class HexMap {
    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    String name;
    String description;
}
