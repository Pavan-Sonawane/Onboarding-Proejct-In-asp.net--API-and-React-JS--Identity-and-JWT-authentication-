import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSalary } from '../../action/salaryAction';
import { fetchEmployees } from '../../action/employeeAction';
import {
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
const AddSalary = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);

  const [empId, setEmpId] = useState(0);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString());

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleAddSalary = () => {
    const newSalary = {
      id: 0,
      empId,
      amount,
      date,
    };

    dispatch(addSalary(newSalary));

    setEmpId(0);
    setAmount(0);
    setDate(new Date().toISOString());
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginBottom: 5 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Add Salary
        </Typography>
        <div>
          <FormControl fullWidth>
            <InputLabel htmlFor="empId">Employee Name:</InputLabel>
            <Select
              id="empId"
              value={empId}
              label="Employee Name"
              onChange={(e) => setEmpId(e.target.value)}
            >
              <MenuItem value={0}>Select Employee</MenuItem>
              {employees.map((employee) => (
                <MenuItem key={employee.id} value={employee.id}>
                  {employee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            fullWidth
            id="amount"
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            id="date"
            label="Date"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleAddSalary} style={{ marginTop: '20px' }}>
          Add Salary
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddSalary;
