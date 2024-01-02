import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalaries, deleteSalary } from '../../action/salaryAction';
import { fetchEmployees } from '../../action/employeeAction'; 
import AddSalary from '../salaryComponant/addSalary';
import UpdateSalary from './UpdateSalary';
import {
 Card,Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography,
} from '@mui/material';
import SalaryByDepartment from '../searchComponant/SalaryByDepartmentSearch '
import SalarySearchByRange from '../searchComponant/SalarySearchByRange';
const SalaryList = () => {
  const dispatch = useDispatch();
  const salaries = useSelector((state) => state.salaries.salaries);
  const employees = useSelector((state) => state.employees.employees);
  const [isAddEmployeeVisible, setAddEmployeeVisible] = useState(false);
  const [isSearchEmployeeVisible, setSearchEmployeeVisible] = useState(false);
  const [isSearchSalaryVisible, setSearchSalaryVisible] = useState(false);

  const handleToggleAddEmployee = () => {
    setAddEmployeeVisible((prevVisible) => !prevVisible);
    setSearchEmployeeVisible(false);
  };

  const handleToggleSearchEmployee = () => {
    setSearchEmployeeVisible((prevVisible) => !prevVisible);
    setAddEmployeeVisible(false);
  };

  const handleToggleSearchSalary = () => {
    setSearchSalaryVisible((prevVisible) => !prevVisible);
    setAddEmployeeVisible(false);
    setSearchEmployeeVisible(false);
  };

  useEffect(() => {
    dispatch(fetchEmployees()); 
    dispatch(fetchSalaries());
  }, [dispatch]);

  const [selectedSalary, setSelectedSalary] = useState(null);

  const handleDeleteSalary = (id) => {
    dispatch(deleteSalary(id));
  };

  const handleFillForm = (salary) => {
    setSelectedSalary(salary);
  };

  const handleUpdate = () => {
    setSelectedSalary(null);
  };

  const getEmployeeName = (empId) => {
    const employee = employees.find((emp) => emp.id === empId);
    return employee ? employee.name : 'Loading...'; 
  };
  return (
    <div style={{ margin: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" onClick={handleToggleAddEmployee} fullWidth>
            {isAddEmployeeVisible ? 'Close' : 'Insert Salary'}
          </Button>
          {isAddEmployeeVisible && <AddSalary />}
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" onClick={handleToggleSearchEmployee} fullWidth>
            {isSearchEmployeeVisible ? 'Close' : 'Search Department BY Salary'}
          </Button>
          {isSearchEmployeeVisible && <SalaryByDepartment />}
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary" onClick={handleToggleSearchSalary} fullWidth>
            {isSearchSalaryVisible ? 'Close' : 'Search Salary by Range'}
          </Button>
          {isSearchSalaryVisible && <SalarySearchByRange />}
        </Grid>
      </Grid>

      <Card sx={{ maxWidth: 900, margin: 'auto', marginTop: 5, padding: 5, width: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Salary List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: '#818181', color: 'white' }}>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salaries.map((salary) => (
                <TableRow key={salary.id}>
                  <TableCell>{getEmployeeName(salary.empId)}</TableCell>
                  <TableCell>{salary.amount || 'N/A'}</TableCell>
                  <TableCell>{new Date(salary.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteSalary(salary.id)} variant="contained" color="secondary">
                      Delete
                    </Button>
                    <Button onClick={() => handleFillForm(salary)} variant="contained" color="primary">
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedSalary && (
          <UpdateSalary
            initialValues={{
              id: selectedSalary.id,
              empId: selectedSalary.empId,
              amount: selectedSalary.amount,
              date: selectedSalary.date,
            }}
            onUpdate={handleUpdate}
          />
        )}
      </Card>
     
    </div>
  );
};

export default SalaryList;
