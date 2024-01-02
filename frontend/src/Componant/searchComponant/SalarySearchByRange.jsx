import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchSalariesByRange } from '../../action/searchAction';
import api from '../../services/api';
import {
  Grid,
  Paper,
  TextField,
  Button,
 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const SalarySearchByRange = () => {
  const dispatch = useDispatch();
  const salaries = useSelector(state => state.search.salaries);
  const token = localStorage.getItem('token');

  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [employeeDetails, setEmployeeDetails] = useState({});

  const handleSearch = () => {
    dispatch(searchSalariesByRange(minSalary, maxSalary));
  };

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        if (!token) {
          console.error('Token is not available');
          return;
        }

        const employeeIds = salaries.map(salary => salary.empId);
        const promises = employeeIds.map(empId =>
          api.get(`Employee/${empId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
        );

        const responses = await Promise.all(promises);

        const details = responses.reduce((acc, response) => {
          acc[response.data.id] = response.data.name;
          return acc;
        }, {});

        setEmployeeDetails(details);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    };

    if (salaries.length > 0) {
      fetchEmployeeDetails();
    }
  }, [salaries, token]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px' }}>
         
          <div style={{ marginBottom: '10px' }}>
            <TextField
              label="Min Salary"
              variant="outlined"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
            />
            <TextField
              label="Max Salary"
              variant="outlined"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              style={{ marginLeft: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              style={{ marginLeft: '10px' }}
            >
              Search
            </Button>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <TableContainer>
            <Table>
              <TableHead style={{ backgroundColor: '#2196f3', color: 'white' }}>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salaries.map(salary => (
                  <TableRow key={salary.id}>
                    <TableCell>{employeeDetails[salary.empId]}</TableCell>
                    <TableCell>{salary.amount}</TableCell>
                    <TableCell>{salary.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SalarySearchByRange;
