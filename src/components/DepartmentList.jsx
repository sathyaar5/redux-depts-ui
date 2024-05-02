import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import EmployeeDetails from '../components/EmployeeDetails';
import { Container, Grid } from '@mui/material';
import { setDepartments, setSelectedDepartment } from '../actions';

const employeesData = [
    {
        deptName: 'Technical Department',
        manager: 'Abdul hameed',
        employeeDetails: [ 
            { id: 1, name: 'Ragulan', designation: 'TL-Senior Software Engineer', branch: 'Bengaluru' },
            { id: 2, name: 'Abdul hameed', designation: 'Manager', branch: 'Bengaluru' },
            { id: 3, name: 'Siranjeevi', designation: 'TL-Senior Software Engineer', branch: 'Bengaluru' },
            { id: 4, name: 'Rudresh', designation: 'Software Engineer', branch: 'Bengaluru' },
            { id: 5, name: 'Sathya', designation: 'Software Engineer', branch: 'Bengaluru' },
            { id: 6, name: 'Sai Keerthana', designation: 'Software Engineer', branch: 'Bengaluru' },
            { id: 7, name: 'Ammu', designation: 'Software Engineer', branch: 'Bengaluru' },
            { id: 8, name: 'Shankar', designation: 'Software Engineer', branch: 'Bengaluru' },
            { id: 9, name: 'ram', designation: 'Software Engineer', branch: 'Bengaluru' },
            { id: 10, name: 'Ibrahim', designation: 'Software Engineer', branch: 'Chennai' },       
            { id: 11, name: 'baba', designation: 'Software Engineer', branch: 'bengaluru' },       
        ]
    },  
  
    {
        deptName: 'HR Department',
        manager: 'Spoorthi',
        employeeDetails: [ 
            { id: 1, name: 'Spoorthi', designation: 'Manager', branch: 'Bengaluru' },
            { id: 2, name: 'Sudhendra', designation: 'Manager', branch: 'Chennai' },
            { id: 3, name: 'Sharnitha', designation: 'HR-executive', branch: 'Bengaluru' },
            { id: 4, name: 'Preethi', designation: 'HR-executive', branch: 'Chennai' }
        ]
    },
  
    {
        deptName: 'Business Department',
        manager: 'Avinash',
        employeeDetails: [ 
            { id: 1, name: 'Avinash', designation: 'Manager', branch: 'Bengaluru' },
            { id: 2, name: 'Raashi', designation: 'Digital Marketing', branch: 'Bengaluru' }
        ]
    },
  
    {
        deptName: 'Accounts Department',
        manager: 'Srilekha',
        employeeDetails: [ 
            { id: 1, name: 'Srilekha', designation: 'Manager', branch: 'Bengaluru' },
            { id: 2, name: 'Harsha', designation: 'Financial Analyst', branch: 'Bengaluru' }
        ]
    },
  
    {
        deptName: 'Testing Department',
        manager: 'Hemanth',
        employeeDetails: [ 
            { id: 1, name: 'Hemanth', designation: 'Manager', branch: 'Bengaluru' },
            { id: 2, name: 'Bhupathi', designation: 'QA engineer', branch: 'Bengaluru' },
            { id: 3, name: 'Vijay Anandh', designation: 'QA engineer', branch: 'Bengaluru' },
            { id: 4, name: 'Shasidhar', designation: 'QA engineer', branch: 'Bengaluru' }
        ]
    },
  
];

const DepartmentList = () => {
  const departments = useSelector((state) => state.departments);
  const selectedDepartmentIndex = useSelector((state) => state.selectedDepartmentIndex);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDepartments(employeesData));
  }, [dispatch]); 


  const handleDepartmentClick = (index) => {
    dispatch(setSelectedDepartment(index));
  };
  
  const selectedDepartment = departments[selectedDepartmentIndex];
  const numberOfEmployees = selectedDepartment ? selectedDepartment.employeeDetails.length : 0;

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Sidebar departments={departments} handleDepartmentClick={handleDepartmentClick} />
        </Grid>
        <Grid item xs={9}>
          {selectedDepartment && (
            <>
              <Header
                department={selectedDepartment}
                numberOfEmployees={numberOfEmployees}
                manager={selectedDepartment.manager}
              />
              <EmployeeDetails employees={selectedDepartment.employeeDetails} />
            </>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default DepartmentList;
