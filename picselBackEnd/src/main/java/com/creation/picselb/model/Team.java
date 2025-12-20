package com.creation.picselb.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Team{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String role;
    @Column(length = 1000)
    private String description;
    private String mobile;
    private String email;
    private int tokenNo;
    private String imageUrl;

    @Embedded
    private Socials socials;
}
