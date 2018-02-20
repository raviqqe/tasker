import { find } from "lodash";
import * as React from "react";
import Save = require("react-icons/lib/md/save");
import { connect } from "react-redux";

import CircleButton from "../component/CircleButton";
import Menu from "../component/Menu";
import MenuButton from "../component/MenuButton";
import Task from "../component/Task";
import TaskList from "../component/TaskList";
import { getTasksFromProject, IProject, IProjects } from "../domain/project";
import { includeTaskInTasks, ITask } from "../domain/task";
import { actionCreators as settingsActionCreators } from "../state/settings";
import { actionCreators as tasksActionCreators } from "../state/tasks";
import Timer from "./Timer";

import "./style/Home.css";

interface IProps {
    currentProjectName: string;
    currentTaskId: string | null;
    isSmallWindow: boolean;
    notificationOn: boolean | null;
    projects: IProjects;
    requestNotificationPermission: () => void;
    setCurrentTaskId: (id: string) => void;
    setTasks: (tasks: ITask[]) => void;
    timer: { on: boolean };
    touchable: boolean;
}

interface IState {
    done: boolean;
    listsFixed: boolean;
}

class Home extends React.Component<IProps, IState> {
    public state: IState = { done: false, listsFixed: false };

    public render() {
        const {
            currentProjectName, currentTaskId, isSmallWindow, timer, touchable,
        } = this.props;
        const currentTask = find(this.currentTasks, { id: currentTaskId });

        if (timer.on) {
            return <Timer currentTask={currentTask} />;
        }

        const { done, listsFixed } = this.state;

        const menuProps = {
            done,
            makeTaskListSortable: () => this.setState({ listsFixed: false }),
            onTasksStateChange: (done) => this.setState({ done }),
        };

        const sorting = touchable && !listsFixed;

        return (
            <div className="Home">
                <div className="content">
                    {!isSmallWindow && <Menu {...menuProps} />}
                    <div className="tasks">
                        <TaskList
                            done={done}
                            tasks={done
                                ? this.currentProject.doneTasks
                                : this.currentProject.todoTasks}
                            fixed={listsFixed}
                            sorting={sorting}
                            {...this.props}
                        />
                        {!isSmallWindow &&
                            <div className="current-task">
                                {currentTask && <Task detailed={true} done={done} {...currentTask} />}
                            </div>}
                        {isSmallWindow &&
                            <MenuButton
                                closed={sorting}
                                hidden={sorting}
                                {...menuProps}
                            />}
                        {sorting &&
                            <div className="fix-list-button">
                                <CircleButton onClick={() => this.setState({ listsFixed: true })}>
                                    <Save />
                                </CircleButton>
                            </div>}
                    </div>
                </div>
            </div>
        );
    }

    public componentDidMount() {
        if (this.props.notificationOn === null) {
            this.props.requestNotificationPermission();
        }

        if (this.props.touchable) {
            this.setState({ listsFixed: true });
        }

        this.componentDidUpdate();
    }

    public componentDidUpdate() {
        const { currentTaskId, setCurrentTaskId } = this.props;
        const tasks = this.currentTasks;

        if (tasks.length === 0) {
            setCurrentTaskId(null);
        } else if (currentTaskId === null || !includeTaskInTasks(currentTaskId, tasks)) {
            setCurrentTaskId(tasks[0].id);
        }
    }

    private get currentProject(): IProject {
        const { currentProjectName, projects } = this.props;

        return projects[currentProjectName];
    }

    private get currentTasks(): ITask[] {
        return getTasksFromProject(this.currentProject, this.state.done);
    }
}

export default connect(
    ({ environment, settings, tasks, timer }) => ({ ...environment, ...settings, ...tasks, timer }),
    { ...settingsActionCreators, ...tasksActionCreators },
)(Home);
