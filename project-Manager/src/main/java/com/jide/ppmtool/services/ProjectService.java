package com.jide.ppmtool.services;

import com.jide.ppmtool.model.Project;
import com.jide.ppmtool.respositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;


    public Project saveOrUpdate(Project project){
        return  projectRepository.save(project);
    }
}
