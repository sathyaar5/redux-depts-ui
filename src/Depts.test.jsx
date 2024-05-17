import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import store from "./store";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import EmployeeDetails from "./components/EmployeeDetails";

test("renders department names correctly", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>,
  );

  await waitFor(() => {
    const departmentNames = screen
      .getAllByText(/^[\w\s]+ Department$/)
      .map((text) => text.textContent);
    const expectedDepartmentNames = [
      "Technical Department",
      "HR Department",
      "Business Department",
      "Accounts Department",
      "Testing Department",
    ];
    expect(departmentNames).toEqual(expectedDepartmentNames);
  });
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

  await waitFor(() => {
    expect(screen.getByText("Marketing Department")).toBeInTheDocument();
  });
});

test("displays alert when adding employee with missing fields", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>,
  );

  fireEvent.click(screen.getByRole("button", { name: "Technical Department" }));

  fireEvent.click(screen.getByText("Add Employee"));

  fireEvent.click(screen.getByText("Save"));

  await waitFor(() => {
    expect(
      screen.getByText("Please fill in all the required fields."),
    ).toBeInTheDocument();
  });
});

test("adds employee when all required fields are filled in", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>,
  );

  fireEvent.click(screen.getByRole("button", { name: "Technical Department" }));

  fireEvent.click(screen.getByText("Add Employee"));

  const nameInput = screen.getByLabelText("Name");
  const designationInput = screen.getByLabelText("Designation");
  const branchInput = screen.getByLabelText("Branch");

  fireEvent.change(nameInput, { target: { value: "Sanju" } });
  fireEvent.change(designationInput, {
    target: { value: "Software Engineer" },
  });
  fireEvent.change(branchInput, { target: { value: "Bangalore" } });

  fireEvent.click(screen.getByText("Save"));

  await waitFor(() => {
    expect(screen.getByText("Sanju")).toBeInTheDocument();
  });
});

test("deletes employee when delete button is clicked", async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <EmployeeDetails />
      </MemoryRouter>
    </Provider>,
  );

  fireEvent.click(screen.getByRole("button", { name: "Technical Department" }));

  fireEvent.click(screen.getByRole("button", { name: "Delete" }));

  await waitFor(() => {
    expect(screen.queryByText("Sathya")).not.toBeInTheDocument();
  });
});
