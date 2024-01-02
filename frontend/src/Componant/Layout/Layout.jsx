import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { Outlet } from 'react-router-dom';

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from 'react-router-dom';
import Logout from '../Authentication/Logout';
const Layout = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleLogout = () => {
   
    navigate('/login');
  };
  return (
    <>
      <AppBar position="static" style={{background:"#818181"}}>
      <Container>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={toggleDrawer} edge="start">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Employee Management
            </Typography>
          </div>
          <Logout onLogout={handleLogout} />
        </Toolbar>
      </Container>
    </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={RouterLink} to="/">
            <ListItemText primary="Department" />
            
          </ListItem>
          <ListItem button component={RouterLink} to="/employee">
            <ListItemText primary="Employee" />
          </ListItem>
          <ListItem button component={RouterLink} to="/salary">
            <ListItemText primary="Salary" />
           
          </ListItem>
         
        </List>
      </Drawer>

      <Container sx={{ marginTop: '20px' }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;