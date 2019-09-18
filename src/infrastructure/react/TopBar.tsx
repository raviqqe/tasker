import React from "react";
import styled from "styled-components";
import { boxShadow } from "./style";
import { SignOut, IProps as ISignOutProps } from "./SignOut";
import { Project, IProps as IProjectProps } from "./Project";

const Container = styled.div`
  ${boxShadow}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: indianred;
  width: 100%;
`;

const SignOutContainer = styled.div`
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
`;

const StyledSignOut = styled(SignOut)`
  color: white;
  font-size: 1.75rem;
`;

export interface IProps extends IProjectProps, ISignOutProps {}

export const TopBar = ({ currentProject, projects, signOut }: IProps) => (
  <Container>
    <Project currentProject={currentProject} projects={projects} />
    <SignOutContainer>
      <StyledSignOut signOut={signOut} />
    </SignOutContainer>
  </Container>
);
