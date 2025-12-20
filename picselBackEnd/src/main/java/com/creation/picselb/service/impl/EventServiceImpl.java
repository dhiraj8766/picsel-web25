package com.creation.picselb.service.impl;


import com.creation.picselb.dto.AddEventRequestDto;
import com.creation.picselb.dto.AddEventRequestNoUrlDto;
import com.creation.picselb.dto.EventDto;
import com.creation.picselb.model.Event;
import com.creation.picselb.repository.EventRepository;
import com.creation.picselb.service.CloudinaryService;
import com.creation.picselb.service.EventService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final CloudinaryService cloudinaryService;
    private final ModelMapper modelMapper;

    private EventDto toDto(Event event) {
        return modelMapper.map(event, EventDto.class);
    }

    private Event getEventOrThrow(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Event not found with id " + id));
    }


//--------------------------------------------------------------------------------------------------//

    @Override
    public EventDto createNewEvent(AddEventRequestNoUrlDto addEventRequestNoUrlDto, MultipartFile coverImage, List<MultipartFile> galleryImages) {

        Event event = modelMapper.map(addEventRequestNoUrlDto, Event.class);
        String coverUrl = cloudinaryService.uploadFile(coverImage, "picsel/events/covers");
        event.setCoverImage(coverUrl);

        List<String> galleryUrls = new ArrayList<>();
        if (galleryImages != null) {
            for (MultipartFile file : galleryImages) {
                if (file != null && !file.isEmpty()) {
                    String url = cloudinaryService.uploadFile(file, "picsel/events/gallery");
                    galleryUrls.add(url);
                }
            }
        }

        event.setGallery(galleryUrls);

        Event saved = eventRepository.save(event);


        return toDto(saved);
    }

    @Override
    public List<EventDto> getAllEvents() {

        List<EventDto> dto = eventRepository.findAll().stream().
        map(event -> modelMapper.map(event, EventDto.class)).toList();
        return dto;
    }

    @Override
    public EventDto getEventById(Long id) {
        Event event = getEventOrThrow(id);
        return toDto(event);
    }

    @Override
    public void deleteEventById(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new NoSuchElementException("Event not found with id " + id);
        }
        eventRepository.deleteById(id);
    }

    @Override
    public EventDto updateEvent(Long id, AddEventRequestDto dto) {
        Event event = getEventOrThrow(id);

        event.setTitle(dto.getTitle());
        event.setDate(dto.getDate());
        event.setTime(dto.getTime());
        event.setLocation(dto.getLocation());
        event.setDescription(dto.getDescription());
        event.setEventType(dto.getEventType());
        event.setRegisterUrl(dto.getRegisterUrl());
        // images stay same (no file upload here)

        Event saved = eventRepository.save(event);
        return toDto(saved);
    }

    @Override
    public EventDto updatePartialEvent(Long id, Map<String, Object> updates) {
        Event event = getEventOrThrow(id);

        updates.forEach((key, value) -> {
            if (value == null) return;

            switch (key) {
                case "title" -> event.setTitle(value.toString());
                case "date" -> event.setDate(value.toString());
                case "time" -> event.setTime(value.toString());
                case "location" -> event.setLocation(value.toString());
                case "description" -> event.setDescription(value.toString());
                // if later you want to patch gallery/cover via URLs, handle here
                default -> {
                    // ignore unknown fields
                }
            }
        });

        Event saved = eventRepository.save(event);
        return toDto(saved);
    }

    @Override
    public EventDto updateImage(Long id, MultipartFile coverImage, List<MultipartFile> galleryImages, List<String> keptImages) {
        Event event = getEventOrThrow(id);

        // 1. Handle Cover Image (Same as before)
        if (coverImage != null && !coverImage.isEmpty()) {
            String coverUrl = cloudinaryService.uploadFile(coverImage, "picsel/events/covers");
            event.setCoverImage(coverUrl);
        }

        // 2. Handle Gallery Images
        // Create a NEW empty list. This will become the final list in the database.
        List<String> finalGallery = new ArrayList<>();

        // Step A: Add the old images that the user kept (passed from frontend)
        if (keptImages != null && !keptImages.isEmpty()) {
            finalGallery.addAll(keptImages);
        }

        // Step B: Upload NEW images and add them to the list
        if (galleryImages != null && !galleryImages.isEmpty()) {
            for (MultipartFile file : galleryImages) {
                if (file != null && !file.isEmpty()) {
                    String url = cloudinaryService.uploadFile(file, "picsel/events/gallery");
                    finalGallery.add(url);
                }
            }
        }

        // Step C: Replace the old gallery list with the new final list
        event.setGallery(finalGallery);

        Event saved = eventRepository.save(event);
        return toDto(saved);
    }


}
