package com.jide.ppmtool.services;

import com.jide.ppmtool.exceptions.ProjectIdException;
import com.jide.ppmtool.model.Backlog;
import com.jide.ppmtool.model.Project;
import com.jide.ppmtool.respositories.BackLogRepository;
import com.jide.ppmtool.respositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BackLogRepository backLogRepository;


    public Project saveOrUpdate(Project project) {

        try{
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            if(project.getId() == null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                project.setCreatedAt(project.getCreatedAt());
                project.setUpdatedAt(project.getUpdatedAt());
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            }

            if(project.getId() != null){
                project.setBacklog(backLogRepository.findByProjectIdentifier(project.getProjectIdentifier().toUpperCase()));
            }
            return  projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project Id '" + project.getProjectIdentifier().toUpperCase() +"' already exists");
        }

    }

    public  Project findByProjectId(String projectId){
        Project foundProject = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(foundProject == null){
            throw new ProjectIdException("Project with " + projectId +" does not exist");
        }

        return  foundProject;
    }

    public Iterable<Project> findAllProjects(){
        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier (String projectId){
        Project projectToDelete = projectRepository.findByProjectIdentifier(projectId.toUpperCase());
        if(projectToDelete == null){
            throw new ProjectIdException("Cannot delete Project with ProjectId '" + projectId +"'. This Project does not exist");
        }
        projectRepository.delete(projectToDelete);
    }
}
