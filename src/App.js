import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DepartmentList from './components/DepartmentList';
import DepartmentDetails from './components/DepartmentDetails';
import { Provider } from 'react-redux'; // Import Provider
import store from './store'; // Import your Redux store

const App = () => {
  return (
    <Provider store={store}> 
      <Router>
        <Routes>
          <Route path="/" element={<DepartmentList />} />
          <Route path="/:deptName" element={<DepartmentDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
