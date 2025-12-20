package com.creation.picselb.service.impl;


import com.creation.picselb.dto.AddTeamRequestNoUrlDto;
import com.creation.picselb.dto.EventDto;
import com.creation.picselb.dto.TeamDto;
import com.creation.picselb.model.Event;
import com.creation.picselb.model.Socials;
import com.creation.picselb.model.Team;
import com.creation.picselb.repository.TeamRepository;
import com.creation.picselb.service.CloudinaryService;
import com.creation.picselb.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;
    private final ModelMapper modelMapper;
    private final CloudinaryService cloudinaryService;

    private TeamDto toDto(Team team) {
        return modelMapper.map(team, TeamDto.class);
    }

    private Team getTeamOrThrow(Long id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Event not found with id " + id));
    }


    @Override
    public TeamDto createTeamMember(AddTeamRequestNoUrlDto dto, MultipartFile image) {

        Team team = modelMapper.map(dto, Team.class);
        String imageUrl = cloudinaryService.uploadFile(image, "picsel/team/profiles");
        team.setImageUrl(imageUrl);
        Team saved = teamRepository.save(team);

        return toDto(saved);
    }


    @Override
    public List<TeamDto> getAllTeamMembers() {

        List<TeamDto> dto = teamRepository.findAll().stream().
                map(team -> modelMapper.map(team, TeamDto.class)).toList();
        return dto;
    }

    @Override
    public TeamDto getTeamByID(Long id) {
        Team team = getTeamOrThrow(id);
        return toDto(team);
    }

    @Override
    public void deleteTeamById(Long id) {
        if(!teamRepository.existsById(id))
            throw new NoSuchElementException("Team not found with id " + id);

        teamRepository.deleteById(id);
    }

    @Override
    public TeamDto updateEvent(Long id, AddTeamRequestNoUrlDto dto) {

        Team team = getTeamOrThrow(id);

        team.setName(dto.getName());
        team.setRole(dto.getRole());
        team.setDescription(dto.getDescription());
        team.setMobile(dto.getMobile());
        team.setEmail(dto.getEmail());
        team.setTokenNo(dto.getTokenNo());
        if (dto.getSocials() != null) {
            // Convert Dto -> Entity automatically
            Socials updatedSocials = modelMapper.map(dto.getSocials(), Socials.class);
            team.setSocials(updatedSocials);
        }

        Team saved = teamRepository.save(team);
        return toDto(saved);
    }

    @Override
    public TeamDto updateImage(Long id, MultipartFile imageUrl) {
        Team team = getTeamOrThrow(id);
        if (imageUrl != null && !imageUrl.isEmpty()) {
            String coverUrl = cloudinaryService.uploadFile(imageUrl, "picsel/team/profiles");
            team.setImageUrl(coverUrl);
        }
        Team saved = teamRepository.save(team);
        return toDto(saved);
    }


}
