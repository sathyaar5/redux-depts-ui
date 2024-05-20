import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import Header from "../Header";
import store from "../../store";

test("renders header details correctly", () => {
  const department = {
    deptName: "Technical Department",
    numberOfEmployees: 5,
    manager: "Abdul hameed",
  };

  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Header department={department} />
      </MemoryRouter>
    </Provider>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
