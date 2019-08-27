import { isEmpty, pickBy } from "lodash";
import React, { Component } from "react";
import { MdUnarchive } from "react-icons/md";
import { connect } from "react-redux";
import styled from "styled-components";
import { IGlobalState } from "../state";
import * as tasks from "../state/tasks";
import { normalBorder } from "../style/borders";
import { grey } from "../style/colors";
import { horizontalMargin, verticalMargin } from "../style/margin";
import IconedButton from "./IconedButton";
import ModalWindowButton from "./ModalWindowButton";
import SmallIconButton from "./SmallIconButton";

const List = styled.div`
  ${normalBorder};
  ${verticalMargin("0.5em")};
  background: white;
  padding: 1.5em;
  font-size: 1.2em;
`;

const Project = styled.div`
  ${horizontalMargin("0.8em")};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Message = styled.div`
  color: ${grey};
`;

class UnarchivedProject extends Component<
  tasks.IState & tasks.IActionCreators
> {
  public render() {
    const { unarchiveProject } = this.props;
    const projects = pickBy(this.props.projects, ({ archived }) => archived);

    return (
      <ModalWindowButton
        buttonComponent={({ openWindow }) => (
          <IconedButton icon={<MdUnarchive />} onClick={openWindow}>
            unarchive
          </IconedButton>
        )}
      >
        {(closeWindow: () => void) => (
          <List>
            {isEmpty(projects) ? (
              <Message>No archived projects</Message>
            ) : (
              Object.keys(projects)
                .sort()
                .map(name => (
                  <Project key={name}>
                    <div>{name}</div>
                    <SmallIconButton
                      onClick={() => {
                        unarchiveProject(name);
                        closeWindow();
                      }}
                    >
                      <MdUnarchive />
                    </SmallIconButton>
                  </Project>
                ))
            )}
          </List>
        )}
      </ModalWindowButton>
    );
  }
}

export default connect(
  ({ tasks }: IGlobalState) => tasks,
  tasks.actionCreators
)(UnarchivedProject);
