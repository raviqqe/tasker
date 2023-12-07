import { defaultImport } from "default-import";
import { useState, useRef, useEffect } from "react";
import { styled } from "@linaria/react";
import { type IProject } from "../../domain/project.js";
import {
  CreateProject,
  type IProps as ICreateProjectProps,
} from "./CreateProject.js";
import { Loader } from "./Loader.js";
import { Project, type IProps as IProjectProps } from "./Project.js";
import { ToggleProjects } from "./ToggleProjects.js";
import { grey, white, lightGrey } from "./style/colors.js";
import { boxShadow } from "./style.js";



const Container = styled.div`
  background-color: ${lightGrey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ScrollContainer = styled.div`
  overflow: auto;
`;

const ProjectsContainer = styled.div`
  ${boxShadow}
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  max-width: 50ex;
  background-color: ${white};
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;

  > :not(:first-child) {
    margin-top: 0.75rem;
  }
`;

const Message = styled.div`
  color: ${grey};
`;

const LowerButtonsContainer = styled.div`
  position: fixed;
  right: 0.5rem;
  bottom: 0.5rem;

  > * {
    margin-top: 0.5rem;
  }
`;

const StyledCreateProject = styled(CreateProject)<{
  projectsArchived: boolean;
}>`
  visibility: ${({ projectsArchived }) =>
    projectsArchived ? "hidden" : "visible"};
`;

export interface IProps
  extends ICreateProjectProps,
    Required<Omit<IProjectProps, "currentProject" | "project">> {
  archivedProjects: IProject[] | null;
  currentProject: IProject | null;
  hideProjects: () => void;
  projects: IProject[] | null;
}

export const ProjectMenu = ({
  archivedProjects,
  archiveProject,
  createProject,
  currentProject,
  deleteProject,
  hideProjects,
  projects,
  switchCurrentProject,
  unarchiveProject,
  updateProject,
}: IProps): JSX.Element => {
  const [projectsArchived, setProjectsArchived] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: "center" });
    }
  });

  return currentProject && archivedProjects && projects ? (
    <Container>
      <ScrollContainer>
        {projectsArchived ? (
          <ProjectsContainer>
            {archivedProjects.length === 0 ? (
              <Message>No archived projects</Message>
            ) : (
              archivedProjects.map((project) => (
                <Project
                  deleteProject={deleteProject}
                  key={project.id}
                  project={project}
                  unarchiveProject={async (project) => {
                    await unarchiveProject(project);
                    hideProjects();
                  }}
                />
              ))
            )}
          </ProjectsContainer>
        ) : (
          <ProjectsContainer>
            {projects.map((project) => (
              <Project
                archiveProject={archiveProject}
                currentProject={currentProject}
                key={project.id}
                project={project}
                ref={project.id === currentProject.id ? ref : null}
                switchCurrentProject={async (project) => {
                  hideProjects();
                  await switchCurrentProject(project);
                }}
                updateProject={updateProject}
              />
            ))}
          </ProjectsContainer>
        )}
      </ScrollContainer>
      <LowerButtonsContainer>
        <ToggleProjects
          projectsArchived={projectsArchived}
          setProjectsArchived={setProjectsArchived}
        />
        <StyledCreateProject
          createProject={async (name: string): Promise<void> => {
            await createProject(name);
            hideProjects();
          }}
          projectsArchived={projectsArchived}
        />
      </LowerButtonsContainer>
    </Container>
  ) : (
    <Container>
      <Loader />
    </Container>
  );
};
