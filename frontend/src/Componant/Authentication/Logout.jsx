import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Button from '@mui/material/Button';  

const Logout = () => {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post('Auth/Logout');
      setResponse(response.data);

      localStorage.removeItem('isLoggedIn');

      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
      setResponse({ error: 'An error occurred during logout.' });
    }
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>      {response && (
        <div>
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
export default Logout;
