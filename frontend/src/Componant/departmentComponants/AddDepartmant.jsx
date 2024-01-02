import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDepartment } from '../../action/DepartmentAction';
import { Card, CardContent, TextField, Button } from '@mui/material';

const AddDepartment = () => {
  const dispatch = useDispatch();
  const [departmentName, setDepartmentName] = useState('');

  const handleInputChange = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleAddDepartment = () => {
    if (departmentName.trim() !== '') {
      const newDepartment = {
        name: departmentName.trim(),
      };

      dispatch(addDepartment(newDepartment));

      setDepartmentName('');
    } else {
      alert('Please enter a valid department name');
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 20 }}>
    <CardContent>
      <h2>Add Department</h2>
      <div>
        <TextField
          label="Department Name"
          id="departmentName"
          value={departmentName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddDepartment}
        style={{ marginTop: 10 }}
      >
        Add Department
      </Button>
    </CardContent>
  </Card>
  );
};

export default AddDepartment;
