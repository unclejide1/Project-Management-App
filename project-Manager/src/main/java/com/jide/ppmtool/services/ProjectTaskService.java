package com.jide.ppmtool.services;


import com.jide.ppmtool.exceptions.ProjectNotFoundException;
import com.jide.ppmtool.model.Backlog;
import com.jide.ppmtool.model.Project;
import com.jide.ppmtool.model.ProjectTask;
import com.jide.ppmtool.respositories.BackLogRepository;
import com.jide.ppmtool.respositories.ProjectRepository;
import com.jide.ppmtool.respositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    private BackLogRepository backLogRepository;

    private ProjectTaskRepository projectTaskRepository;

    private ProjectRepository projectRepository;


    @Autowired
    public ProjectTaskService(BackLogRepository backLogRepository, ProjectTaskRepository projectTaskRepository, ProjectRepository projectRepository) {
        this.backLogRepository = backLogRepository;
        this.projectTaskRepository = projectTaskRepository;
        this.projectRepository = projectRepository;
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){
        try{
            Backlog backlog = backLogRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
            System.out.println(backlog.toString() +"====");
            projectTask.setBacklog(backlog);
            Integer backlogSequence = backlog.getPTSequence();
            backlogSequence++;
            backlog.setPTSequence(backlogSequence);
            projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);
            if(projectTask.getStatus() == ("") || projectTask.getStatus() == null){
                projectTask.setStatus("PENDING");
            }
            if(projectTask.getPriority() == null || projectTask.getPriority() == 0){
                projectTask.setPriority(3);
            }
      return projectTaskRepository.save(projectTask);
        } catch (Exception e) {
            throw new ProjectNotFoundException("project with id:" +projectIdentifier +  " not found");
        }


    }

    public Iterable<ProjectTask> findBacklogById(String backlog_id) {
        Project foundProject = projectRepository.findByProjectIdentifier(backlog_id);

        if(foundProject == null){
            throw new ProjectNotFoundException("project with id:'" + backlog_id + "' not found");
        }
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlog_id);
    }

    public ProjectTask findProjectTaskBySequence(String backlog_id, String sequence){
        Backlog backlog = backLogRepository.findByProjectIdentifier(backlog_id);

        if(backlog == null){
            throw new ProjectNotFoundException("project with id:'" + backlog_id + "' not found");
        }

        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
        if(projectTask == null){
            throw new ProjectNotFoundException("project Task with id:'" + sequence + "' not found");
        }
        if(!projectTask.getProjectIdentifier().equals(backlog_id)){
            throw new ProjectNotFoundException("project Task with id:'" + sequence + "' does not exist in project: '" + backlog_id +"'");
        }

        return  projectTask;
    }

    public ProjectTask updateProjectTaskByProjectSequence(ProjectTask updatedProjectTask, String backlog_id, String projectSequence){
        ProjectTask projectTask =  findProjectTaskBySequence(backlog_id, projectSequence);

        projectTask = updatedProjectTask;

        return projectTaskRepository.save(projectTask);

    }

    public void deleteProjectTaskByProjectSequence(String backlog_id, String projectSequence){
        ProjectTask projectTask =  findProjectTaskBySequence(backlog_id, projectSequence);
        projectTaskRepository.delete(projectTask);

    }
}
