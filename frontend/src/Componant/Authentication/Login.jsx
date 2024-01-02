
import React, { useState } from 'react';
import axios from '../../services/api';  
import {Link, useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    if ( !username || !password) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('Auth/Login', {
        username: username,
        password: password,
      });

      const jwttoken = response.data;

      if (!jwttoken) {
        console.error('Token is undefined or null');
        return;
      }

      localStorage.setItem('token', jwttoken);

      console.log('Login successful!');

      onLoginSuccess();

      navigate('/employee');

    } catch (error) {
      console.error('Error during login:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f0f0' }}>
      <Card style={{ width: '300px', height: '400px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <h2 style={{ textAlign: 'center', color: '#333' }}>Login</h2>
          <form>
            <TextField
              label="Email"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '16px' }}>
              Login
            </Button>
          </form> 
          <p style={{ textAlign: 'center', marginTop: '16px' }}>
            Already have an account? <Link to="/registration">Back To sign-in</Link>.
          </p>
        </CardContent>
       
      </Card>
     
    </div>
  );
};

export default Login;
