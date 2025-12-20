package com.creation.picselb.service;

import com.creation.picselb.dto.AddFacultyRequestNoUrlDto;
import com.creation.picselb.dto.AddTeamRequestNoUrlDto;
import com.creation.picselb.dto.FacultyDto;
import com.creation.picselb.dto.TeamDto;
import org.jspecify.annotations.Nullable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FacultyService {
    FacultyDto createFacultyMember(AddFacultyRequestNoUrlDto dto, MultipartFile image);

    List<FacultyDto> getAllFacultyMembers();

    FacultyDto getFacultyById(Long id);

    void deleteFacultyMemberById(Long id);

    FacultyDto updateFacultyMemberById(Long id, AddFacultyRequestNoUrlDto dto);

    FacultyDto updateImage(Long id, MultipartFile imageUrl);
}
