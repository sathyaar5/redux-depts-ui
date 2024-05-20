import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import renderer from "react-test-renderer";

import DepartmentDetails from "../DepartmentDetails";
import store from "../../store";

test("renders department details correctly", () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter initialEntries={["/technical-department"]}>
        <Routes>
          <Route path="/:deptName" element={<DepartmentDetails />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
