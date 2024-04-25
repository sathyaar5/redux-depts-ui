export const setDepartments = (departments) => ({
    type: 'SET_DEPARTMENTS',
    payload: departments
});
  
export const addEmployee = (departmentIndex, newEmployee) => ({
    type: 'ADD_EMPLOYEE',
    payload: {
      departmentIndex,
      newEmployee
    }
});
  
export const deleteEmployee = (departmentIndex, employeeIndex) => ({
    type: 'DELETE_EMPLOYEE',
    payload: {
      departmentIndex,
      employeeIndex
    }
});
  
export const setSelectedDepartment = (index) => ({
    type: 'SET_SELECTED_DEPARTMENT',
    payload: index
});
  