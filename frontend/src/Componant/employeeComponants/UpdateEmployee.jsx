
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateEmployee } from '../../action/employeeAction';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
const UpdateEmployee = ({ initialValues, onUpdate, onCancel }) => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.departments);

  const [name, setName] = useState(initialValues.name || '');
  const [email, setEmail] = useState(initialValues.email || '');
  const [phone, setPhone] = useState(initialValues.phone || '');
  const [gender, setGender] = useState(initialValues.gender || '');
  const [dob, setDob] = useState(initialValues.dob || '');
  const [selectedDeptId, setSelectedDeptId] = useState(initialValues.deptId || '');
  const [departmentName, setDepartmentName] = useState(initialValues.departmentName || '');

  const handleUpdateEmployee = () => {
    if (!name || !email || !phone || !gender || !dob || !selectedDeptId) {
      alert('Please fill in all required fields.');
      return;
    }

    const selectedDepartment = departments.find((dept) => dept.id === selectedDeptId);
    const selectedDepartmentName = selectedDepartment ? selectedDepartment.name : '';

    const updatedEmployee = {
      ...initialValues,
      name,
      email,
      phone,
      gender,
      dob,
      deptId: selectedDeptId,
      departmentName: selectedDepartmentName,
    };

    dispatch(updateEmployee(initialValues.id, updatedEmployee));

    onUpdate();

    setName('');
    setEmail('');
    setPhone('');
    setGender('');
    setDob('');
    setSelectedDeptId('');
    setDepartmentName('');
  };

  useEffect(() => {
    setName(initialValues.name || '');
    setEmail(initialValues.email || '');
    setPhone(initialValues.phone || '');
    setGender(initialValues.gender || '');
    setDob(initialValues.dob || '');
    setSelectedDeptId(initialValues.deptId || '');
    setDepartmentName(initialValues.departmentName || '');
  }, [initialValues, departments]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

    <Card style={{ maxWidth: '400px', width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <CardContent>
          <h2>Update Employee</h2>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="DOB"
            type="datetime-local"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              id="deptId"
              value={selectedDeptId}
              onChange={(e) => {
                setSelectedDeptId(e.target.value);
                const selectedDepartment = departments.find((dept) => dept.id === e.target.value);
                setDepartmentName(selectedDepartment ? selectedDepartment.name : '');
              }}
            >
              <MenuItem value="">Select Department</MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleUpdateEmployee}>
            Update Employee
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateEmployee;
