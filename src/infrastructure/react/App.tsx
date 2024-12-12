import { styled } from "@linaria/react";
import { useState } from "react";
import { useAsync } from "react-use";
import { applicationInitializer } from "../../main/application-initializer.js";
import { Home, type Props as HomeProps } from "./Home.js";
import { Landing } from "./Landing.js";
import { Loader } from "./Loader.js";
import { ProjectMenu, type Props as ProjectMenuProps } from "./ProjectMenu.js";
import { useStore } from "@nanostores/react";
import { authenticationPresenter } from "../../main/authentication-presenter.js";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export interface Props
  extends Omit<HomeProps, "onShowProjects">,
    Omit<ProjectMenuProps, "onHideProjects"> {}

export const App = ({
  archivedProjects,
  currentProject,
  doneTasks,
  projects,
  todoTasks,
  ...props
}: Props): JSX.Element => {
  useAsync(() => applicationInitializer.initialize(), []);
  const signedIn = useStore(authenticationPresenter.signedIn);
  const [projectsShown, setProjectsShown] = useState(false);

  return signedIn === null ? (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  ) : signedIn && projectsShown ? (
    <ProjectMenu
      archivedProjects={archivedProjects}
      currentProject={currentProject}
      onHideProjects={() => setProjectsShown(false)}
      projects={projects}
    />
  ) : signedIn ? (
    <Home
      {...props}
      currentProject={currentProject}
      doneTasks={doneTasks}
      onShowProjects={() => setProjectsShown(true)}
      todoTasks={todoTasks}
    />
  ) : (
    <Landing />
  );
};
