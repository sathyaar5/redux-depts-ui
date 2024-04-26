import React from 'react';
import { Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee } from '../actions'; 

const EmployeeDetails = ({ employees }) => {
  const dispatch = useDispatch();
  const departments = useSelector(state => state.departments);

  const handleDeleteEmployee = (employeeId) => {
    const departmentIndex = departments.findIndex(department =>
      department.employeeDetails.some(employee => employee.id === employeeId)
    );
    const employeeIndex = departments[departmentIndex].employeeDetails.findIndex(employee =>
      employee.id === employeeId
    );
  
    dispatch(deleteEmployee(departmentIndex, employeeIndex));
  
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