package com.creation.picselb.dto;


import lombok.*;

@Data
public class AddTeamRequestNoUrlDto {
    private String name;
    private String role;
    private String description;
    private String mobile;
    private String email;
    private int tokenNo;
    private SocialsDto socials;
}
