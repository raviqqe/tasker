import { beforeEach, expect, it } from "vitest";
import { ApplicationInitializer } from "./application-initializer";
import { MockManager } from "./test/mock-manager";

let mockManager: MockManager;
let applicationInitializer: ApplicationInitializer;

beforeEach(() => {
  mockManager = new MockManager();

  mockManager.authenticationController.isSignedIn.mockResolvedValue(true);

  applicationInitializer = new ApplicationInitializer(
    mockManager.currentProjectInitializer,
    mockManager.authenticationController,
    mockManager.authenticationPresenter
  );
});

it("presents sign-in state", async () => {
  await applicationInitializer.initialize();

  expect(
    mockManager.authenticationPresenter.presentSignedIn
  ).toHaveBeenCalledWith(true);
});

it("presents an initial project", async () => {
  await applicationInitializer.initialize();

  expect(
    mockManager.currentProjectInitializer.initialize
  ).toHaveBeenCalledOnce();
});

it("does not present any project if a user is not signed in", async () => {
  mockManager.authenticationController.isSignedIn.mockResolvedValue(false);

  await applicationInitializer.initialize();

  expect(mockManager.currentProjectSwitcher.switch).not.toHaveBeenCalled();
  expect(mockManager.projectPresenter.presentProjects).not.toHaveBeenCalled();
});
