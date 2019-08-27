import React, {
  ChangeEvent,
  KeyboardEvent,
  RefObject,
  useRef,
  useState
} from "react";
import { MdAdd } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";
import { createTask } from "../domain/task";
import * as tasks from "../state/tasks";
import { normalBorder } from "../style/borders";
import { verticalMargin } from "../style/margin";
import IconedButton from "./IconedButton";
import Input from "./Input";
import ModalWindowButton from "./ModalWindowButton";
import OriginalTextArea from "./TextArea";

const Form = styled.form`
  ${normalBorder};
  ${verticalMargin("0.6em")};
  background: white;
  width: 40em;
  padding: 1em;
`;

const TextArea = styled(OriginalTextArea)`
  height: 20vh;
  resize: vertical;
`;

const CreateTask = ({ addTask }: tasks.IActionCreators) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const input: RefObject<HTMLInputElement> = useRef(null);

  return (
    <ModalWindowButton
      buttonComponent={({ openWindow }) => (
        <IconedButton icon={<MdAdd />} onClick={openWindow}>
          add
        </IconedButton>
      )}
      onOpen={() => input.current && input.current.focus()}
    >
      {(closeWindow: () => void) => {
        const submit = (): void => {
          addTask(createTask(name, description));
          setName("");
          setDescription("");
          closeWindow();
        };

        return (
          <Form
            onSubmit={event => {
              submit();
              event.preventDefault();
            }}
          >
            <Input
              ref={input}
              placeholder="Name"
              value={name}
              onChange={({
                target: { value }
              }: ChangeEvent<HTMLInputElement>) => setName(value)}
            />
            <TextArea
              placeholder="Description"
              value={description}
              onChange={({
                target: { value }
              }: ChangeEvent<HTMLTextAreaElement>) => setDescription(value)}
              onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
                if (event.keyCode === 13 && event.shiftKey) {
                  submit();
                  event.preventDefault();
                }
              }}
            />
            <IconedButton icon={<MdAdd />} type="submit">
              add
            </IconedButton>
          </Form>
        );
      }}
    </ModalWindowButton>
  );
};

export default connect(
  null,
  tasks.actionCreators
)(CreateTask);
