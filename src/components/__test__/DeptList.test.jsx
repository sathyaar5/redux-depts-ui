import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import DepartmentList from "../DepartmentList";
import store from "../../store";

test("renders department list correctly", () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <DepartmentList />
      </MemoryRouter>
    </Provider>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
