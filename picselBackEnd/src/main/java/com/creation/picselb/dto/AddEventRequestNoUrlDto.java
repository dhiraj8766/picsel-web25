package com.creation.picselb.dto;


import lombok.*;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddEventRequestNoUrlDto {

    private String title;
    private String date;        // "YYYY-MM-DD"
    private String time;
    private String location;
    private String description;
    private String eventType;
    private String registerUrl;
}
