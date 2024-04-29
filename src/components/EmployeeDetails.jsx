import React from 'react';
import { Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee } from '../actions';

const EmployeeDetails = ({ employees }) => {
  const dispatch = useDispatch();
  const departments = useSelector(state => state.departments);
  const selectedDepartmentIndex = useSelector(state => state.selectedDepartmentIndex);

  const handleDeleteEmployee = (employeeId) => {
    const department = departments[selectedDepartmentIndex];
    const employeeIndex = department.employeeDetails.findIndex(employee => employee.id === employeeId);
    if (employeeIndex !== -1) {
      dispatch(deleteEmployee(selectedDepartmentIndex, employeeIndex));
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Designation</TableCell>
          <TableCell>Branch</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.id}</TableCell>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.designation}</TableCell>
            <TableCell>{employee.branch}</TableCell>
            <TableCell>
              <Button variant="contained" onClick={() => handleDeleteEmployee(employee.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeDetails;