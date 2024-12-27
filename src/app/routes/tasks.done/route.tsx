import { styled } from "@linaria/react";
import { useStore } from "@nanostores/react";
import { useAsync, useInfiniteScroll } from "@raviqqe/react-hooks";
import { useCallback, useRef, useState } from "react";
import { doneTaskLister } from "../../../main/done-task-lister.js";
import { doneTaskPresenter } from "../../../main/done-task-presenter.js";
import { Loader } from "../../components/Loader.js";
import { Task } from "../../components/Task.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;
  padding: 1rem;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default (): JSX.Element => {
  const tasks = useStore(doneTaskPresenter.tasks);
  const [done, setDone] = useState(false);

  useAsync(() => doneTaskLister.list(), []);

  const listMore = useCallback(async () => {
    if (!tasks) {
      return;
    }

    await doneTaskLister.listMore();
    setDone(doneTaskPresenter.tasks.get()?.length === tasks.length);
  }, [tasks]);
  const ref = useRef(null);
  useInfiniteScroll(ref, listMore);

  return (
    <Container>
      {tasks?.map((task) => <Task key={task.id} task={task} />)}
      {!done && (
        <LoaderContainer ref={ref}>
          <Loader />
        </LoaderContainer>
      )}
    </Container>
  );
};
