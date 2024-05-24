import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setSelectedDepartment, addDepartment } from "../actions";

const Sidebar = () => {
  const departments = useSelector((state) => state.departments);
  const dispatch = useDispatch();
  const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
  const [departmentName, setDepartmentName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [errors, setErrors] = useState({});

  const handleDepartmentClick = (index) => {
    dispatch(setSelectedDepartment(index));
  };

  const handleAddDepartment = () => {
    setShowAddDepartmentForm(true);
  };

  const handleSubmit = () => {
    if (!departmentName.trim()) {
      setErrors({ departmentName: "Department name is required" });
      return;
    }
    if (!managerName.trim()) {
      setErrors({ managerName: "Manager name is required" });
      return;
    }

    setErrors({});
    dispatch(addDepartment(departmentName, managerName));

    setShowAddDepartmentForm(false);
    setDepartmentName("");
    setManagerName("");
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Departments
      </Typography>
      <List>
        {departments &&
          departments.map((department, index) => (
            <ListItem
              key={index}
              button
              onClick={() => handleDepartmentClick(index)}
              className="department-item"
            >
              <Link
                to={`/${department.deptName
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                <ListItemText primary={department.deptName} />
              </Link>
            </ListItem>
          ))}
      </List>
      {showAddDepartmentForm ? (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Department Name"
              data-testid="department-name-input"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              error={!!errors.departmentName}
              helperText={errors.departmentName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              placeholder="Manager Name"
              data-testid="manager-name-input"
              value={managerName}
              onChange={(e) => setManagerName(e.target.value)}
              error={!!errors.managerName}
              helperText={errors.managerName}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit}>
              Add
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Button variant="contained" onClick={handleAddDepartment}>
          Add Department
        </Button>
      )}
    </div>
  );
};

export default Sidebar;
