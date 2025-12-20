package com.creation.picselb.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamDto {

    private Long id;
    private String name;
    private String role;
    private String description;
    private String mobile;
    private String email;
    private int tokenNo;
    private String imageUrl;
    private SocialsDto socials;
}
