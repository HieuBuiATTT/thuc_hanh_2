import React from "react";
import {
  Divider,
  List,
  ListItemText,
  Typography,
  Box,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom"; 

import "./styles.css";
import models from "../../modelData/models"; 

/**
 * Define UserList, a React component of Project 4 (Problem 1).
 */
function UserList() {
  const users = models.userListModel();

  return (
    <Box className="user-list">
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ px: 2, pt: 2 }}
      >
        Users
      </Typography>
      <List component="nav">
        {users.map((user, index) => (
          <React.Fragment key={user._id}>
            <ListItemButton
              component={Link}
              to={`/users/${user._id}`}
              sx={{
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
              />
            </ListItemButton>
            {index < users.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

export default UserList;