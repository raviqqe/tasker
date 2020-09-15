import React from "react";
import { create } from "react-test-renderer";
import { SignOut } from "../SignOut";

it("renders", () => {
  expect(
    create(<SignOut signOut={() => undefined} />).toJSON()
  ).toMatchSnapshot();
});
