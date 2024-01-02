import React, { useState } from 'react';
import api from '../../services/api';
import { Grid, Paper, TextField, Button, Typography } from '@mui/material';

const SalaryByDepartmentSearch = () => {
  const [salaries, setSalaries] = useState([]);
  const [year, setYear] = useState('');

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token is not available');
        return;
      }

      const response = await api.get(`Salary/department-salary?year=${year}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSalaries(response.data);
      } else {
        console.error('Error searching salaries by department:', response.data);
      }
    } catch (error) {
      console.error('Error searching salaries by department:', error);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Salary Search By Department
          </Typography>
          <div>
            <TextField
              label="Year"
              variant="outlined"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            style={{ marginTop: '10px' }}
          >
            Search
          </Button>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: '20px', marginTop: '10px' }}>
          <div>
            <Typography variant="h6" gutterBottom>
              Search Results
            </Typography>
            {salaries &&
              salaries.map((result, index) => (
                <div key={index}>
                  <p>Department Name: {result.departmentName}</p>
                  <p>Month: {result.month}</p>
                  <p>Total Salary: {result.totalSalary}</p>
                </div>
              ))}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SalaryByDepartmentSearch;
