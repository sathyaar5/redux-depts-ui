import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import EmployeeDetails from './EmployeeDetails';

const DepartmentDetails = () => {
  const { deptName } = useParams();
  const departments = useSelector(state => state.departments);
  const selectedDepartment = departments.find(department => department.deptName.toLowerCase().replace(' ', '-') === deptName);

  if (!selectedDepartment) {
    return <div>Department not found</div>;
  }

  const numberOfEmployees = selectedDepartment.employeeDetails.length;

  return (
    <div>
      <Header
        department={selectedDepartment}
        numberOfEmployees={numberOfEmployees}
        manager={selectedDepartment.manager}
      />
      <EmployeeDetails employees={selectedDepartment.employeeDetails} />
    </div>
  );
};

export default DepartmentDetails;
