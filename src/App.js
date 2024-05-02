import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DepartmentList from './components/DepartmentList';
import DepartmentDetails from './components/DepartmentDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DepartmentList />} />
        <Route path="/:deptName" element={<DepartmentDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
