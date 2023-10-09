package com.thagorn.hex.hexserver.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String username;
    private String email;
    private String password;

}
