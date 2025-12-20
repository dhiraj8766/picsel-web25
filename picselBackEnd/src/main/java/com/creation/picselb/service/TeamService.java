package com.creation.picselb.service;

import com.creation.picselb.dto.AddTeamRequestNoUrlDto;
import com.creation.picselb.dto.TeamDto;
import org.jspecify.annotations.Nullable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface TeamService {
    TeamDto createTeamMember(AddTeamRequestNoUrlDto dto, MultipartFile image);

    List<TeamDto> getAllTeamMembers();

    TeamDto getTeamByID(Long id);

    void deleteTeamById(Long id);

    TeamDto updateEvent(Long id, AddTeamRequestNoUrlDto dto);

    TeamDto updateImage(Long id, MultipartFile imageUrl);
}
