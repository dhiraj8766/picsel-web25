package com.creation.picselb.controller;


import com.creation.picselb.dto.AddEventRequestDto;
import com.creation.picselb.dto.AddEventRequestNoUrlDto;
import com.creation.picselb.dto.EventDto;
import com.creation.picselb.model.Event;
import com.creation.picselb.repository.EventRepository;
import com.creation.picselb.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;
    private final EventRepository eventRepository;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventDto> addEvent(
            @RequestPart("data") AddEventRequestNoUrlDto dto,
            @RequestPart(value = "coverImage", required = false) MultipartFile coverImage,
            @RequestPart(value = "galleryImages", required = false)
            List<MultipartFile> galleryImages
            ) {
        EventDto created = eventService.createNewEvent(dto, coverImage, galleryImages);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }


    @GetMapping
    public List<EventDto> getAllEvent() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventDto> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEventById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(
            @PathVariable Long id,
            @RequestBody AddEventRequestDto addEventRequestDto
    ) {
        return ResponseEntity.ok(eventService.updateEvent(id, addEventRequestDto));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<EventDto> updatePartialEvent(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updates
    ) {
        return ResponseEntity.ok(eventService.updatePartialEvent(id, updates));
    }

    @PutMapping(value = "/images/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventDto> updateImage(
            @PathVariable Long id,
            @RequestPart(value = "coverImage", required = false) MultipartFile coverImage,
            @RequestPart(value = "galleryImages", required = false)
            List<MultipartFile> galleryImages,
            @RequestParam(value = "keptImages", required = false) List<String> keptImages
    ) {

        EventDto dto = eventService.updateImage(id, coverImage, galleryImages, keptImages);
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/nearest")
    public List<Event> getNearestEvents() {
        return eventRepository.findTop5ByOrderByDateAsc();
    }


}
