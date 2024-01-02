
import React, { useState, useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Componant/Layout/Layout';
import store from './store/store';
import ListDepartment from './Componant/departmentComponants/ListDepartment';
import EmployeeList from './Componant/employeeComponants/EmployeeList';
import SalaryList from './Componant/salaryComponant/SalaryList';
import AllAuth from './Componant/Authentication/AllAuth';
import Login from './Componant/Authentication/Login';
import Registration from './Componant/Authentication/Registration';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={<Layout />}
            >
              <Route
                index
                element={isLoggedIn ? <ListDepartment /> : <Navigate to="/login" replace />}
              />
              <Route
                path="employee"
                element={isLoggedIn ? <EmployeeList /> : <Navigate to="/login" replace />}
              />
              <Route
                path="salary"
                element={isLoggedIn ? <SalaryList /> : <Navigate to="/login" replace />}
              />
              
              
            </Route>

            <Route
              path="/login"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
             <Route
              path="/registration"
              element={<Registration/>}
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
