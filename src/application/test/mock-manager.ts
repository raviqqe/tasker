import { IProjectPresenter } from "../project-presenter";
import { ICurrentProjectRepository } from "../current-project-repository";
import { TodoTaskLister } from "../todo-task-lister";
import { IInfrastructureInitializer } from "../infrastructure-initializer";
import { IAuthenticationController } from "../authentication-controller";
import { IAuthenticationPresenter } from "../authentication-presenter";
import { IProjectRepository } from "../project-repository";
import { ProjectCreator } from "../project-creator";
import { IDoneTaskRepository } from "../done-task-repository";
import { IDoneTaskPresenter } from "../done-task-presenter";
import { IMessagePresenter } from "../message-presenter";
import { CurrentProjectSwitcher } from "../current-project-switcher";
import { DoneTaskLister } from "../done-task-lister";
import { ITodoTaskPresenter } from "../todo-task-presenter";
import { ITodoTaskRepository } from "../todo-task-repository";

export class MockManager {
  public authenticationController: jest.Mocked<IAuthenticationController> = {
    isSignedIn: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn()
  };

  public authenticationPresenter: jest.Mocked<IAuthenticationPresenter> = {
    presentSignedIn: jest.fn()
  };

  public currentProjectRepository: jest.Mocked<ICurrentProjectRepository> = {
    get: jest.fn(),
    set: jest.fn()
  };

  public currentProjectSwitcher: jest.Mocked<CurrentProjectSwitcher> = ({
    switch: jest.fn()
  } as unknown) as jest.Mocked<CurrentProjectSwitcher>;

  public doneTaskRepository: jest.Mocked<IDoneTaskRepository> = {
    create: jest.fn(),
    list: jest.fn()
  };

  public doneTaskLister: jest.Mocked<DoneTaskLister> = ({
    list: jest.fn()
  } as unknown) as jest.Mocked<DoneTaskLister>;

  public doneTaskPresenter: jest.Mocked<IDoneTaskPresenter> = {
    presentNewTask: jest.fn(),
    presentTasks: jest.fn()
  };

  public infrastructureInitializer: jest.Mocked<IInfrastructureInitializer> = {
    initialize: jest.fn()
  };

  public messagePresenter: jest.Mocked<IMessagePresenter> = {
    present: jest.fn()
  };

  public projectCreator: jest.Mocked<ProjectCreator> = ({
    create: jest.fn()
  } as unknown) as jest.Mocked<ProjectCreator>;

  public projectPresenter: jest.Mocked<IProjectPresenter> = {
    presentArchivedProjects: jest.fn(),
    presentCurrentProject: jest.fn(),
    presentProjects: jest.fn()
  };

  public projectRepository: jest.Mocked<IProjectRepository> = {
    create: jest.fn(),
    list: jest.fn(),
    listArchived: jest.fn(),
    update: jest.fn()
  };

  public todoTaskLister: jest.Mocked<TodoTaskLister> = ({
    list: jest.fn()
  } as unknown) as jest.Mocked<TodoTaskLister>;

  public todoTaskRepository: jest.Mocked<ITodoTaskRepository> = {
    create: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
    reorder: jest.fn(),
    update: jest.fn()
  };

  public todoTaskPresenter: jest.Mocked<ITodoTaskPresenter> = {
    presentDeletedTask: jest.fn(),
    presentNewTask: jest.fn(),
    presentTasks: jest.fn(),
    presentUpdatedTask: jest.fn()
  };
}
