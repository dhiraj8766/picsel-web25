package com.creation.picselb.controller;


import com.creation.picselb.dto.AddTeamRequestNoUrlDto;
import com.creation.picselb.dto.TeamDto;
import com.creation.picselb.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
public class TeamController {

    private final TeamService teamService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TeamDto> addTeamMember(
            @RequestPart("data") AddTeamRequestNoUrlDto dto,
            @RequestPart("image") MultipartFile image
    ) {
        TeamDto createdMember = teamService.createTeamMember(dto, image);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMember);
    }

    @GetMapping
    public List<TeamDto> getAllTeam() {
        return teamService.getAllTeamMembers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeamDto> getTeamById(@PathVariable Long id) {
        return ResponseEntity.ok(teamService.getTeamByID(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        teamService.deleteTeamById(id);
        return ResponseEntity.ok().build();

    }

    @PutMapping("/{id}")
    public ResponseEntity<TeamDto> updateTeam(@PathVariable Long id, @RequestBody AddTeamRequestNoUrlDto dto) {
        return ResponseEntity.ok(teamService.updateEvent(id, dto));
    }

    @PutMapping(value = "/images/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TeamDto> updateImage(
            @PathVariable Long id,
            @RequestPart("imageUrl")MultipartFile imageUrl
    ){

        TeamDto dto = teamService.updateImage(id, imageUrl);
        return ResponseEntity.ok(dto);
    }


}
