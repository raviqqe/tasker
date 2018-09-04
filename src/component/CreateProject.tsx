import * as React from "react";
import { MdAdd } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";

import * as tasks from "../state/tasks";
import { normalBorder } from "../style/borders";
import IconedButton from "./IconedButton";
import Input from "./Input";
import ModalWindowButton from "./ModalWindowButton";

const Form = styled.form`
  ${normalBorder};
  background: white;
  padding: 1em;
  font-size: 1.2em;
`;

interface IState {
  name: string;
}

@connect(
  null,
  tasks.actionCreators
)
export default class extends React.Component<
  Partial<tasks.IActionCreators>,
  IState
> {
  public input: React.RefObject<HTMLInputElement> = React.createRef();
  public state: IState = { name: "" };

  public render() {
    const { addProject } = this.props;
    const { name } = this.state;

    return (
      <ModalWindowButton
        buttonComponent={({ openWindow }) => (
          <IconedButton icon={<MdAdd />} onClick={openWindow}>
            add
          </IconedButton>
        )}
        onOpen={() => this.input.current && this.input.current.focus()}
      >
        {closeWindow => (
          <Form
            onSubmit={event => {
              addProject(name);
              this.setState({ name: "" });
              closeWindow();
              event.preventDefault();
            }}
          >
            <Input
              innerRef={this.input}
              onChange={({ target: { value } }) =>
                this.setState({ name: value })
              }
              placeholder="Name"
              value={name}
            />
          </Form>
        )}
      </ModalWindowButton>
    );
  }
}
