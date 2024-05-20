import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import EmployeeDetails from "../EmployeeDetails";
import store from "../../store";

test("renders employee details correctly", () => {
  const employees = [
    { id: 1, name: "Sathya", designation: "Developer", branch: "Bengaluru" },
    {
      id: 2,
      name: "Mohammed Ibrahim ",
      designation: "Developer",
      branch: "Chennai",
    },
  ];

  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <EmployeeDetails employees={employees} />
      </MemoryRouter>
    </Provider>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
