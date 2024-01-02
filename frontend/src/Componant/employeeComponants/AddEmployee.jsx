
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee } from '../../action/employeeAction';
import { fetchDepartments } from '../../action/DepartmentAction';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
const AddEmployee = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.departments.departments);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [departmentName, setDepartmentName] = useState('');

  const handleAddEmployee = () => {
    if (!name || !email || !phone || !gender || !dob || !selectedDeptId) {
      alert('Please fill in all required fields.');
      return;
    }

    const selectedDepartment = departments.find((dept) => dept.id === selectedDeptId);
    const selectedDepartmentName = selectedDepartment ? selectedDepartment.name : '';

    const newEmployee = {
      id: 0,
      name,
      email,
      phone,
      gender,
      dob,
      deptId: selectedDeptId,
      departmentName: selectedDepartmentName,
    };

    dispatch(addEmployee(newEmployee));

    setName('');
    setEmail('');
    setPhone('');
    setGender('');
    setDob('');
    setSelectedDeptId('');
    setDepartmentName('');
  };

  return  (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ maxWidth: '400px', width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <h2 style={{ textAlign: 'center', marginBottom: '16px' }}>Add Employee</h2>
          <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth margin="normal" />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth margin="normal" />
          <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              label="Gender"
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField  type="datetime-local" value={dob} onChange={(e) => setDob(e.target.value)} fullWidth margin="normal" />
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="deptId">Department</InputLabel>
            <Select
              id="deptId"
              value={selectedDeptId}
              onChange={(e) => {
                setSelectedDeptId(e.target.value);
                const selectedDepartment = departments.find((dept) => dept.id === e.target.value);
                setDepartmentName(selectedDepartment ? selectedDepartment.name : '');
              }}
              label="Department"
            >
              <MenuItem value="">Select Department</MenuItem>
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={handleAddEmployee} style={{ marginTop: '16px' }}>
            Add Employee
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default AddEmployee;
