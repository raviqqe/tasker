import { fireEvent, render } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { Task } from "./Task.js";

it("renders", () => {
  expect(
    render(
      <Task task={{ id: "id", name: "name" }} updateTask={async () => {}} />,
    ).container.firstChild,
  ).toMatchSnapshot();
});

it("updates a task", () => {
  vi.spyOn(window, "prompt").mockReturnValue("bar");
  const updateTask = vi.fn();

  const { container } = render(
    <Task task={{ id: "", name: "foo" }} updateTask={updateTask} />,
  );

  fireEvent.click(container.querySelector('[aria-label="Edit"]')!);

  expect(updateTask).toHaveBeenCalledTimes(1);
});

it("does not update any tasks if update is cancelled", () => {
  vi.spyOn(window, "prompt").mockReturnValue(null);
  const updateTask = vi.fn();

  const { container } = render(
    <Task task={{ id: "", name: "foo" }} updateTask={updateTask} />,
  );

  fireEvent.click(container.querySelector('[aria-label="Edit"]')!);

  expect(updateTask).not.toHaveBeenCalled();
});
