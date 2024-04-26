import React, { useState } from 'react';
import { Typography, Button, Modal, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import { addEmployee } from '../actions';

const FIELD_NAMES = [
  { fieldName: 'name', buttonName: 'Name' },
  { fieldName: 'designation', buttonName: 'Designation' },
  { fieldName: 'branch', buttonName: 'Branch' }
];

const Header = ({ department, numberOfEmployees, manager }) => {
  const [open, setOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState({});
  const dispatch = useDispatch();
  const selectedDepartmentIndex = useSelector(state => state.selectedDepartmentIndex); 

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEmployeeData({}); // Reset the employeeData state to clear the form fields
    setOpen(false); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleAddEmployee = () => {
    const newEmployeeId = department.employeeDetails.length > 0 ? department.employeeDetails[department.employeeDetails.length - 1].id + 1 : 1;
    const newEmployee = { id: newEmployeeId, ...employeeData };

    dispatch(addEmployee(selectedDepartmentIndex, newEmployee));
    handleClose();
  };
  

  return (
    <div className="department-details">
      <Typography variant="h4" gutterBottom>{department.deptName}</Typography>
      <Typography variant="body1" gutterBottom>No of employees: {numberOfEmployees}</Typography>
      <Typography variant="body1" gutterBottom>Manager: {manager}</Typography>
      <Button variant="contained" onClick={handleOpen}>Add Employee</Button>
      <Modal open={open} onClose={handleClose}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px' }}>
          <Typography variant="h6">Add Employee</Typography>
          {FIELD_NAMES.map(({ fieldName, buttonName }) => (
            <TextField key={fieldName} name={fieldName} label={buttonName} value={employeeData[fieldName] || ''} onChange={handleInputChange} />
          ))}
          <Button variant="contained" onClick={handleAddEmployee}>Save</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;