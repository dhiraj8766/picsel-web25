package com.creation.picselb.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String date; // Format: YYYY-MM-DD
    private String time;
    private String location;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String eventType;
    private String registerUrl;
    private String coverImage;  // Cloudinary URL

    @ElementCollection
    @CollectionTable(name = "event_gallery", joinColumns = @JoinColumn(name = "event_id"))
    @Column(name = "image_url")
    private List<String> gallery;
}