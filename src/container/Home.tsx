import { find } from "lodash";
import * as React from "react";
import Save = require("react-icons/lib/md/save");
import { connect } from "react-redux";

import CircleButton from "../component/CircleButton";
import ItemList from "../component/ItemList";
import ItemsMenuButton from "../component/ItemsMenuButton";
import Task from "../component/Task";
import TasksMenu from "../component/TasksMenu";
import { emptyProject, getTasksFromProject, IProject, IProjects } from "../domain/project";
import { includeTaskInTasks, ITask } from "../domain/task";
import { actionCreators as settingsActionCreators } from "../state/settings";
import { actionCreators as tasksActionCreators } from "../state/tasks";
import Timer from "./Timer";

import "./style/Home.css";

interface IProps {
    currentProjectName: string | null;
    currentTaskId: string | null;
    isSmallWindow: boolean;
    notificationOn: boolean | null;
    projects: IProjects;
    requestNotificationPermission: () => void;
    setCurrentTaskId: (id: string) => void;
    setTasks: (items: ITask[]) => void;
    timer: { on: boolean };
    touchable: boolean;
}

interface IState {
    done: boolean;
    fixed: boolean;
}

class Home extends React.Component<IProps, IState> {
    public state: IState = { done: false, fixed: false };

    public render() {
        const {
            currentProjectName, currentTaskId, isSmallWindow, timer, touchable,
        } = this.props;

        if (timer.on) {
            return <Timer />;
        }

        const { done } = this.state;

        const itemsMenu = (
            <TasksMenu
                done={done}
                onTasksStateChange={(done) => this.setState({ done })}
                makeTaskListSortable={() => this.setState({ fixed: false })}
            />
        );

        const sorting = touchable && !this.state.fixed;

        const itemListProps = {
            ...this.props,
            fixed: this.state.fixed,
            sorting,
        };

        const currentTask = this.tasks && find(this.tasks, { id: currentTaskId });

        return (
            <div className="Home-container">
                <div className="Home-content">
                    {!isSmallWindow && itemsMenu}
                    <div className="Home-main">
                        {currentProjectName === null
                            ? "No project."
                            : [
                                (<ItemList
                                    style={done ? { display: "none" } : {}}
                                    done={false}
                                    tasks={this.project.todoTasks}
                                    {...itemListProps}
                                />),
                                (<ItemList
                                    style={done ? {} : { display: "none" }}
                                    done={true}
                                    tasks={this.project.doneTasks}
                                    {...itemListProps}
                                />),
                                !isSmallWindow &&
                                <div className="Home-current-item-container">
                                    {currentTask &&
                                        <Task detailed={true} done={done} {...currentTask} />}
                                </div>,
                                isSmallWindow &&
                                <ItemsMenuButton
                                    closed={sorting}
                                    hidden={sorting}
                                    itemsMenu={itemsMenu}
                                />,
                                sorting &&
                                <div className="Home-fix-list-button-container">
                                    <CircleButton onClick={() => this.setState({ fixed: true })}>
                                        <Save />
                                    </CircleButton>
                                </div>,
                            ]}
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
            this.setState({ fixed: true });
        }

        this.componentDidUpdate();
    }

    public componentDidUpdate() {
        const { currentTaskId, setCurrentTaskId } = this.props;
        const tasks = this.tasks;

        if (tasks &&
            (currentTaskId === null && tasks.length !== 0 ||
                currentTaskId !== null && !includeTaskInTasks(currentTaskId, tasks))) {
            const task = tasks[0] || null;
            setCurrentTaskId(task && task.id);
        }
    }

    private get project(): IProject | null {
        const { currentProjectName, projects } = this.props;

        return currentProjectName && projects[currentProjectName];
    }

    private get tasks(): ITask[] | null {
        const project = this.project;

        return project && getTasksFromProject(project, this.state.done);
    }
}

export default connect(
    ({ settings, tasks, timer }) => ({ ...settings, ...tasks, timer }),
    { ...settingsActionCreators, ...tasksActionCreators },
)(Home);
