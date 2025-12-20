package com.creation.picselb.controller;


import com.creation.picselb.dto.AddFacultyRequestNoUrlDto;
import com.creation.picselb.dto.AddTeamRequestNoUrlDto;
import com.creation.picselb.dto.FacultyDto;
import com.creation.picselb.dto.TeamDto;
import com.creation.picselb.service.FacultyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
@RequiredArgsConstructor
public class FacultyController {

    private final FacultyService facultyService;


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FacultyDto> addFacultyMember(
            @RequestPart("data") AddFacultyRequestNoUrlDto dto,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        FacultyDto createdMember = facultyService.createFacultyMember(dto, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMember);
    }

    @GetMapping
    public List<FacultyDto> getAllFaculty() {
        return facultyService.getAllFacultyMembers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacultyDto> getFacultyMemberById(@PathVariable Long id) {
        return ResponseEntity.ok(facultyService.getFacultyById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFacultyMemberById(@PathVariable Long id) {
        facultyService.deleteFacultyMemberById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacultyDto> updateFacultyMemberById(@PathVariable Long id, @RequestBody AddFacultyRequestNoUrlDto dto) {
        return ResponseEntity.ok(facultyService.updateFacultyMemberById(id, dto));
    }



    @PutMapping(value = "/images/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<FacultyDto> updateImage(
            @PathVariable Long id, @RequestPart(value = "imageUrl", required = false) MultipartFile imageUrl
    ){
        FacultyDto dto = facultyService.updateImage(id,imageUrl);
        return ResponseEntity.ok(dto);
    }


}
