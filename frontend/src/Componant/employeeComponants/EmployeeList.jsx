
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../../action/employeeAction';
import AddEmployee from './AddEmployee';
import UpdateEmployee from './UpdateEmployee';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EmployeeSearch from '../searchComponant/EmployeeSearch';
import { Grid } from '@mui/material';
const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const [isAddEmployeeVisible, setAddEmployeeVisible] = useState(false);
  const [isSearchEmployeeVisible, setSearchEmployeeVisible] = useState(false);

  const handleToggleAddEmployee = () => {
    setAddEmployeeVisible((prevVisible) => !prevVisible);
    setSearchEmployeeVisible(false);
  };

  const handleToggleSearchEmployee = () => {
    setSearchEmployeeVisible((prevVisible) => !prevVisible);
    setAddEmployeeVisible(false);
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleFillForm = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleUpdate = () => {
    setSelectedEmployee(null);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" onClick={handleToggleAddEmployee} fullWidth>
            {isAddEmployeeVisible ? 'Close' : 'Insert Employee'}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" onClick={handleToggleSearchEmployee} fullWidth>
            {isSearchEmployeeVisible ? 'Close' : 'Search Employee'}
          </Button>
        </Grid>
      </Grid>

      {isAddEmployeeVisible && <AddEmployee />}

      {isSearchEmployeeVisible && <EmployeeSearch />}

      <h2>Employee List</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#818181', color: 'white' }}>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees &&
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phone}</TableCell>
                  <TableCell>{employee.gender}</TableCell>
                  <TableCell>{employee.dob}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteEmployee(employee.id)}>
                      Delete
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => handleFillForm(employee)}>
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedEmployee && (
        <UpdateEmployee
          initialValues={{
            name: selectedEmployee.name,
            email: selectedEmployee.email,
            phone: selectedEmployee.phone,
            gender: selectedEmployee.gender,
            dob: selectedEmployee.dob,
            id: selectedEmployee.id,
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default EmployeeList;