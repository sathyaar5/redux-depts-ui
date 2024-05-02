import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import EmployeeDetails from './EmployeeDetails';

const DepartmentDetails = () => {
  const { deptName } = useParams();
  const departments = useSelector(state => state.departments);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    const storedDepartment = JSON.parse(localStorage.getItem('selectedDepartment'));
    if (storedDepartment && storedDepartment.deptName.toLowerCase().replace(/\s+/g, '-') === deptName.toLowerCase()) {
      setSelectedDepartment(storedDepartment);
    } else {
      const matchedDepartment = departments.find(
        department => department.deptName.toLowerCase().replace(/\s+/g, '-') === deptName.toLowerCase()
      );
      if (matchedDepartment) {
        setSelectedDepartment(matchedDepartment);
        localStorage.setItem('selectedDepartment', JSON.stringify(matchedDepartment));
      } else {
        setSelectedDepartment(null);
        localStorage.removeItem('selectedDepartment');
      }
    }
  }, [deptName, departments]);

  if (!selectedDepartment) {
    return;
  }

  const { employeeDetails, manager } = selectedDepartment;
  const numberOfEmployees = employeeDetails.length;

  return (
    <div>
      <Header
        department={selectedDepartment}
        numberOfEmployees={numberOfEmployees}
        manager={manager}
      />
      <EmployeeDetails employees={employeeDetails} />
    </div>
  );
};

export default DepartmentDetails;