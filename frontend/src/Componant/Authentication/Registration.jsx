import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRegistration } from '../../action/employeeAction';
import { useNavigate, Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
} from '@mui/material';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleAddRegistration = () => {
    if (!userName || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    const newRegistration = {
      userName,
      password,
    };

    dispatch(addRegistration(newRegistration));

    setUserName('');
    setPassword('');
  };

  return (
    <Container maxWidth="xs">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Registration
          </Typography>
          <TextField
            fullWidth
            id="userName"
            label="Email"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddRegistration}
            fullWidth
          >
            Register
          </Button>
          <Typography>
            Already have an account? <Link to="/login">Back To sign-in</Link>.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Registration;
