package com.creation.picselb.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class FacultyDto {

    private Long id;
    private String name;
    private String role;
    private String mobile;
    private String email;
    private String imageUrl;
    private String message;

}
