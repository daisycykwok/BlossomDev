import React, { useState, useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import DeleteUser from "./DeleteUser";
import auth from "../lib/auth-helper.js";
import { read } from "./api-user.js";
import { useLocation, Navigate, Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Profile() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();
  const { userId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
  
    const fetchUser = async () => {
      try {
        const data = await read({ userId }, { t: jwt.token }, signal);
        if (data && data.error) {
          setRedirectToSignin(true);
        } else {
          setUser(data);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          // Expected: component unmounted before fetch completed
          console.log("Fetch aborted");
        } else {
          console.error("Fetch user error:", err);
        }
      }
    };
  
    fetchUser();
  
    return () => abortController.abort();
  }, [userId]);

  if (redirectToSignin) {
    return (
      <Navigate to="/signin" state={{ from: location.pathname }} replace />
    );
  }

  if (!user) {
    return (
      <Paper
        elevation={4}
        sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 3 }}
      >
        <Typography variant="h6">Loading profile...</Typography>
      </Paper>
    );
  }

  const handleSignOut = () => {
    auth.clearJWT(() => {
      window.location = "/";
    });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        p: 3,
      }}
    >
      <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "text.primary" }}>
        Profile
      </Typography>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={user?.name || "Name not available"}
            secondary={user?.email || "Email not available"}
          />

          {auth.isAuthenticated().user &&
            user &&
            auth.isAuthenticated().user._id === user._id
             && (
              <ListItemSecondaryAction>
                <Link to={`/user/edit/${user._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
                <DeleteUser userId={user._id} />
              </ListItemSecondaryAction>
            )}
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary={
              user.created
                ? `Joined: ${new Date(user.created).toDateString()}`
                : "Loading..."
            }
          />
        </ListItem>
      </List>
      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleSignOut}
      >
        Sign out
      </Button>
    </Paper>
  );
}
