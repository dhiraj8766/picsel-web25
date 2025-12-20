package com.creation.picselb.service;

import com.creation.picselb.dto.AddEventRequestDto;
import com.creation.picselb.dto.AddEventRequestNoUrlDto;
import com.creation.picselb.dto.EventDto;
import org.jspecify.annotations.Nullable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface EventService {
    EventDto createNewEvent(AddEventRequestNoUrlDto addEventRequestNoUrlDto, MultipartFile coverImage, List<MultipartFile> galleryImages);

    List<EventDto> getAllEvents();

    EventDto getEventById(Long id);

    void deleteEventById(Long id);

    EventDto updateEvent(Long id, AddEventRequestDto addEventRequestDto);

    EventDto updatePartialEvent(Long id, Map<String, Object> updates);

    EventDto updateImage(Long id, MultipartFile coverImage, List<MultipartFile> galleryImages, List<String> keptImages);
}
