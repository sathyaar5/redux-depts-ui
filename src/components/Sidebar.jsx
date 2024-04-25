import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSelectedDepartment } from '../actions';

const Sidebar = ({ departments }) => {
  const dispatch = useDispatch();

  const handleDepartmentClick = (index) => {
    dispatch(setSelectedDepartment(index));
  };

  return (
    <div className="sidebar">
      <Typography variant="h5" gutterBottom>Departments</Typography>
      <List>
        {departments.map((department, index) => (
          <ListItem key={index} button onClick={() => handleDepartmentClick(index)} className="department-item">
            <ListItemText primary={department.deptName} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
