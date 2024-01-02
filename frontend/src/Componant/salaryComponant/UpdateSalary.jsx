import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSalary } from '../../action/salaryAction';
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
const UpdateSalary = ({ initialValues, onUpdate }) => {
  const dispatch = useDispatch();
  const [eid, setId] = useState(initialValues.id);
  const [empId, setEmpId] = useState(initialValues.empId);
  const [amount, setAmount] = useState(initialValues.amount);
  const [date, setDate] = useState(initialValues.date);

  const employees = useSelector((state) => state.employees.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleUpdateSalary = () => {
    const updatedSalary = {
      id: eid,
      empId,
      amount,
      date,
    };

    dispatch(updateSalary(initialValues.id, updatedSalary));

    onUpdate();
  };

  useEffect(() => {
    setId(initialValues.id);
    setEmpId(initialValues.empId);
    setAmount(initialValues.amount);
    setDate(initialValues.date);
  }, [initialValues]);

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 20 }}>
    <CardContent>
      <Typography variant="h5" component="div">
        Update Salary
      </Typography>
      {/* <div>
        <label htmlFor="eid">Salary ID:</label>
        <input type="number" id="eid" value={eid} onChange={(e) => setId(e.target.value)} />
      </div> */}
      <div>
        <FormControl fullWidth>
          <InputLabel htmlFor="empId">Employee Name:</InputLabel>
          <Select
            id="empId"
            value={empId}
            label="Employee Name"
            onChange={(e) => setEmpId(e.target.value)}
          >
            <MenuItem value="">Select Employee</MenuItem>
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
      <Button variant="contained" color="primary" onClick={handleUpdateSalary} style={{ marginTop: '20px' }}>
        Update Salary
      </Button>
    </CardContent>
  </Card>
  );
};

export default UpdateSalary;
