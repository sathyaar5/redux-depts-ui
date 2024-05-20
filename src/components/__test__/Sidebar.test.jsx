import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

import store from "../../store";
import Sidebar from "../Sidebar";

test("renders department names correctly", () => {
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>,
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("allows adding new department", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>,
  );

  const addDepartmentButton = screen.getByText("Add Department");
  fireEvent.click(addDepartmentButton);

  const departmentNameInput = screen.getByLabelText("Department Name");
  const managerNameInput = screen.getByLabelText("Manager Name");

  fireEvent.change(departmentNameInput, {
    target: { value: "Marketing Department" },
  });
  fireEvent.change(managerNameInput, { target: { value: "Sathya" } });

  const addButton = screen.getByText("Add");
  fireEvent.click(addButton);

  // Wait for any asynchronous operations to complete
  await screen.findByText("Marketing Department");

  const tree = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <Sidebar />
        </MemoryRouter>
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});