package com.creation.picselb.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddEventRequestDto {

    private String title;
    private String date;        // "YYYY-MM-DD"
    private String time;
    private String location;
    private String description;
    private String eventType;
    private String registerUrl;
    private String coverImage;      // Cloudinary URL
    private List<String> gallery;
}
