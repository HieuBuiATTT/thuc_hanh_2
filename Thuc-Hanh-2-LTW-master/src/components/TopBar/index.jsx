import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { useLocation } from "react-router-dom"; 

import "./styles.css";
import models from "../../modelData/models"; 

/**
 * Define TopBar, a React component of Project 4 (Problem 1).
 */
function TopBar() { 
  const location = useLocation();
  const getContextInfo = () => {
    const path = location.pathname;
    let userId;
    if (path.startsWith('/users/')) {
      userId = path.split('/users/')[1];
    } 
    else if (path.startsWith('/photos/')) {
      userId = path.split('/photos/')[1];
      if (userId) {
        userId = userId.split('/')[0];
      }
    }
    if (userId) {
      const user = models.userModel(userId);
      if (user) {
        if (path.startsWith('/photos/')) {
          return `Photos of ${user.first_name} ${user.last_name}`;
        } else {
          return `${user.first_name} ${user.last_name}`;
        }
      }
    }
    if (path === '/users') {
      return "User List";
    }
    return "";
  };

  return (
    <AppBar position="fixed" className="cs142-topbar-appBar">
      <Toolbar>
        <Box display="flex" alignItems="center" width="100%">
          <Typography variant="h5" color="inherit">
            Photo Sharing
          </Typography>

          <Box display="flex" alignItems="center" sx={{ marginLeft: 'auto' }}>
            <Typography variant="h6" color="inherit">
              {getContextInfo()}
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;