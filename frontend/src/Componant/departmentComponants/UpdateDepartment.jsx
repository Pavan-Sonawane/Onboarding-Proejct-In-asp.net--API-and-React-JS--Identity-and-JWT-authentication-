import React, { useState } from 'react';
import { TextField, Button, Card, CardContent } from '@mui/material';

const UpdateDepartment = ({ department, onUpdateDepartment, onCancel ,id}) => {
  const [updatedName, setUpdatedName] = useState(department.name);

  const handleInputChange = (e) => {
    setUpdatedName(e.target.value);
  };

  const handleUpdateClick = () => {
    if (updatedName.trim() !== '') {
      const updatedDepartment = {
        Id: id,
        name: updatedName.trim(),
      };
      onUpdateDepartment(updatedDepartment);
    } else {
      alert('Please enter a valid department name');
    }
  };
  

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: 20 }}>
      <CardContent>
        <h2>Update Department</h2>
        <TextField
          label="Updated Department Name"
          id="updatedName"
          value={updatedName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdateClick}
          style={{ marginTop: 10, marginRight: 10 }}
        >
          Update
        </Button>
        <Button variant="outlined" onClick={onCancel} style={{ marginTop: 10 }}>
          Cancel
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpdateDepartment;
