
import React, { fetchData,useState, useEffect } from 'react';
import api from '../../services/api';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Typography,
} from '@mui/material';

const EmployeeSearch = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token is not available');
          return;
        }

        const response = await api.get(`Employee/search?employeeName=${searchName}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        setEmployeeData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchName]);

  const handleSearch = () => {
    fetchData();
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Employee Search
      </Typography>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Employee Name"
          variant="outlined"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Search
        </Button>
      </div>

      <Typography variant="h5" gutterBottom>
        Employee Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: '#2196f3', color: 'white' }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Department ID</TableCell>
              <TableCell>Department Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.dob}</TableCell>
                <TableCell>{employee.deptId}</TableCell>
                <TableCell>{employee.department.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeSearch;