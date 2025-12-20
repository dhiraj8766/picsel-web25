package com.creation.picselb.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminDto {
    private long id;
    private String username;
    private String password;
}
