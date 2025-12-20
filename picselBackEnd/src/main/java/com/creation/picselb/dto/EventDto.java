package com.creation.picselb.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EventDto {

    private Long id;
    private String title;
    private String date;
    private String time;
    private String location;
    private String description;
    private String eventType;
    private String registerUrl;
    private String coverImage;      // Cloudinary URL
    private List<String> gallery;   // Cloudinary URLs
}
