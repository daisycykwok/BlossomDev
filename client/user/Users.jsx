import React, { useEffect, useState } from "react";
import { list, update } from "./api-user.js"; // Add update
import auth from "../lib/auth-helper.js";
import { Navigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Typography,
  Paper,
} from "@mui/material";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    if (!jwt || jwt.user.role !== "admin") {
      setRedirectToHome(true);
    } else {
      list({ t: jwt.token }).then((data) => {
        if (data && !data.error) setUsers(data);
      });
    }
  }, []);

  const handleRoleToggle = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    const updatedUser = { ...user, role: newRole };

    try {
      const response = await update(
        { userId: user._id },
        { t: jwt.token },
        updatedUser
      );
      if (!response.error) {
        setUsers(users.map((u) => (u._id === user._id ? response : u)));
      }
    } catch (err) {
      console.error("Role change failed:", err);
    }
  };

  if (redirectToHome) return <Navigate to="/" replace />;

  return (
    <Paper sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        All Users (Admin Only)
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user._id} divider>
            <ListItemText
              primary={`${user.name} (${user.role})`}
              secondary={user.email}
            />
            <ListItemSecondaryAction>
              {user._id !== jwt.user._id && (
                <Button
                  variant="outlined"
                  onClick={() => handleRoleToggle(user)}
                >
                  Make {user.role === "admin" ? "User" : "Admin"}
                </Button>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
