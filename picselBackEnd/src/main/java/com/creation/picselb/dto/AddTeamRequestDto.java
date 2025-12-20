package com.creation.picselb.dto;


import lombok.*;

@Data
public class AddTeamRequestDto {

    private String name;
    private String role;
    private String description;
    private String mobile;
    private String email;
    private int tokenNo;
    private String imageUrl;
    private SocialsDto socials;
}
