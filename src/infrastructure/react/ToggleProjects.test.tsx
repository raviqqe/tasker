import { fireEvent, render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { ToggleProjects } from "./ToggleProjects.js";

it("renders with projects unarchived", () => {
  expect(
    render(
      <ToggleProjects
        projectsArchived={false}
        setProjectsArchived={() => {}}
      />,
    ).container.firstChild,
  ).toMatchSnapshot();
});

it("renders with projects archived", () => {
  expect(
    render(<ToggleProjects projectsArchived setProjectsArchived={() => {}} />)
      .container.firstChild,
  ).toMatchSnapshot();
});

it("toggles projects", () => {
  const setProjectsArchived = vi.fn();

  const { container } = render(
    <ToggleProjects
      projectsArchived={false}
      setProjectsArchived={setProjectsArchived}
    />,
  );

  fireEvent.click(container.firstElementChild!);

  expect(setProjectsArchived).toHaveBeenCalledTimes(1);
});
