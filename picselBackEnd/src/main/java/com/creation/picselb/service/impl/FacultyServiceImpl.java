package com.creation.picselb.service.impl;

import com.creation.picselb.dto.AddFacultyRequestNoUrlDto;
import com.creation.picselb.dto.AddTeamRequestNoUrlDto;
import com.creation.picselb.dto.FacultyDto;
import com.creation.picselb.dto.TeamDto;
import com.creation.picselb.model.Faculty;
import com.creation.picselb.repository.FacultyRepository;
import com.creation.picselb.repository.TeamRepository;
import com.creation.picselb.service.CloudinaryService;
import com.creation.picselb.service.FacultyService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacultyServiceImpl implements FacultyService {
    private final FacultyRepository facultyRepository;
    private final CloudinaryService cloudinaryService;
    private final ModelMapper modelMapper;

    private FacultyDto toDto(Faculty faculty) {
        return modelMapper.map(faculty, FacultyDto.class);
    }

    private Faculty getFacultyOrThrow(Long id) {
        return facultyRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Faculty with id " + id + " not found"));
    }





    @Override
    public FacultyDto createFacultyMember(AddFacultyRequestNoUrlDto dto, MultipartFile image) {
        Faculty faculty = modelMapper.map(dto, Faculty.class);
        String imageUrl = cloudinaryService.uploadFile(image, "picsel/faculty/profiles");
        faculty.setImageUrl(imageUrl);
        Faculty saved = facultyRepository.save(faculty);
        return toDto(saved);
    }

    @Override
    public List<FacultyDto> getAllFacultyMembers() {

        List<FacultyDto> dto = facultyRepository.findAll().stream().
                map(faculty -> modelMapper.map(faculty, FacultyDto.class)).toList();
        return dto;
    }

    @Override
    public FacultyDto getFacultyById(Long id) {
        Faculty faculty = getFacultyOrThrow(id);
        return toDto(faculty);
    }

    @Override
    public void deleteFacultyMemberById(Long id) {
        if(!facultyRepository.existsById(id))
            throw new EntityNotFoundException("Faculty with id " + id + " not found");
        facultyRepository.deleteById(id);
    }

    @Override
    public FacultyDto updateFacultyMemberById(Long id, AddFacultyRequestNoUrlDto dto) {

        Faculty faculty = getFacultyOrThrow(id);

        faculty.setName(dto.getName());
        faculty.setRole(dto.getRole());
        faculty.setMobile(dto.getMobile());
        faculty.setEmail(dto.getEmail());

        Faculty saved = facultyRepository.save(faculty);

        return toDto(saved);
    }

    @Override
    public FacultyDto updateImage(Long id, MultipartFile imageUrl) {

        Faculty faculty = getFacultyOrThrow(id);
        if(imageUrl != null && !imageUrl.isEmpty()) {
            String coverUrl = cloudinaryService.uploadFile(imageUrl, "picsel/faculty/profiles");
            faculty.setImageUrl(coverUrl);
        }

        return toDto(facultyRepository.save(faculty));
    }


}
