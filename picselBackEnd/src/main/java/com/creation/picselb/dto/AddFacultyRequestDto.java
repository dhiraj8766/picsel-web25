package com.creation.picselb.dto;


import lombok.Data;

@Data
public class AddFacultyRequestDto {

    private String name;
    private String role;
    private String mobile;
    private String email;
    private String imageUrl;
    private String message;
}
