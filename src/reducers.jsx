import { combineReducers } from 'redux';

const initialState = {
  departments: [],
  selectedDepartmentIndex: null
};

const departmentsReducer = (state = initialState.departments, action) => {
  switch (action.type) {
    case 'SET_DEPARTMENTS':
      return action.payload;
    case 'ADD_EMPLOYEE':
      return state.map((department, index) => {
        if (index === action.payload.departmentIndex) {
          const newEmployee = action.payload.newEmployee;
          const updatedEmployeeDetails = [...department.employeeDetails, newEmployee];
          const updatedEmployeeDetailsWithIDs = updateEmployeeIds(updatedEmployeeDetails);
          return {
            ...department,
            employeeDetails: updatedEmployeeDetailsWithIDs
          };
        }
        return department;
      });
      case 'DELETE_EMPLOYEE':
      return state.map((department, index) => {
        if (index === action.payload.departmentIndex) {
          const updatedEmployeeDetails = department.employeeDetails.filter((employee, i) => i !== action.payload.employeeIndex);
          const updatedEmployeeDetailsWithIDs = updatedEmployeeDetails.map((employee, i) => ({
            ...employee,
            id: i + 1 // Update ID 
          }));

          return {
            ...department,
            employeeDetails: updatedEmployeeDetailsWithIDs
          };
        }
        return department;
      });
    default:
      return state;
  }
};

const updateEmployeeIds = (employees) => {
    return employees.map((employee, index) => ({
      ...employee,
      id: index + 1
    }));
};

const selectedDepartmentReducer = (state = initialState.selectedDepartmentIndex, action) => {
  switch (action.type) {
    case 'SET_SELECTED_DEPARTMENT':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  departments: departmentsReducer,
  selectedDepartmentIndex: selectedDepartmentReducer
});
