import { PulseLoader } from "react-spinners";
import React from "react";
import styled from "styled-components";
import { ITask } from "../../domain/task";
import { Task } from "./Task";
import { buttonMargin } from "./style";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 70ex;
  max-width: 100%;
  overflow: auto;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 0.5em ${buttonMargin};

  > * {
    margin: 0.5em;
  }
`;

export interface IProps {
  completeTodoTask: (task: ITask) => Promise<void>;
  todoTasks: ITask[] | null;
  updateTodoTask: (task: ITask) => Promise<void>;
}

export const TodoTasks = ({
  completeTodoTask,
  todoTasks,
  updateTodoTask
}: IProps) =>
  todoTasks ? (
    <Container>
      <Tasks>
        {todoTasks.map((task: ITask) => (
          <Task
            completeTask={completeTodoTask}
            key={task.id}
            task={task}
            updateTask={updateTodoTask}
          />
        ))}
      </Tasks>
    </Container>
  ) : (
    <LoaderContainer>
      <PulseLoader color="white" />
    </LoaderContainer>
  );
