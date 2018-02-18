import * as React from "react";
import sortable = require("sortablejs");

import { ITask } from "../domain/task";
import ModalWindowButton from "./ModalWindowButton";
import Task from "./Task";

import "./style/TaskList.css";

interface IProps {
    currentTaskId: string | null;
    done: boolean;
    fixed?: boolean;
    isSmallWindow: boolean;
    tasks: ITask[];
    setTasks: (tasks: ITask[]) => void;
    sorting?: boolean;
    style?: { [key: string]: any };
}

export default class extends React.Component<IProps> {
    private sortable;
    private container: HTMLElement;

    public render() {
        const { currentTaskId, done, isSmallWindow, tasks, setTasks, sorting, style }
            = this.props;

        if (tasks.length === 0) {
            return <div className="TaskList-message" style={style}>There is no task.</div>;
        }

        return (
            <div
                ref={(container) => this.container = container}
                className="TaskList"
                data-shadowed={sorting}
                style={style}
            >
                {tasks.map((task) =>
                    isSmallWindow ?
                        <ModalWindowButton
                            key={task.id}
                            buttonComponent={this.ClickableTask}
                            buttonProps={{ done, task }}
                        >
                            <Task detailed={true} done={done} {...task} />
                        </ModalWindowButton> :
                        <Task
                            key={task.id}
                            done={done}
                            highlighted={task.id === currentTaskId}
                            {...task}
                        />)}
            </div>
        );
    }

    public componentDidMount() {
        this.componentDidUpdate();
    }

    public componentDidUpdate() {
        if (this.container && !this.sortable) {
            this.sortable = sortable.create(this.container, {
                animation: 200,
                ghostClass: "TaskList-placeholder",
                onSort: ({ oldIndex, newIndex }) => {
                    const tasks = [...this.props.tasks];
                    tasks.splice(newIndex, 0, tasks.splice(oldIndex, 1)[0]);
                    this.props.setTasks(tasks);
                },
                scroll: true,
            });
        }

        if (this.sortable) {
            this.sortable.option("disabled", this.props.fixed);
        }
    }

    private ClickableTask = ({ done, openWindow, task }) => {
        return (
            <div onClick={openWindow}>
                <Task done={done} {...task} />
            </div>
        );
    }
}
