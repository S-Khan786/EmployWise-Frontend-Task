import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NotificationContext } from "../NotificationContext";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

const AddUser = ({ setUsers }) => {
  const { showNotification } = useContext(NotificationContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Generate a temporary negative ID
      const tempId = -Math.floor(Math.random() * 10000);

      const newUser = {
        id: tempId,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        avatar: `https://i.pravatar.cc/150?u=${formData.email}`,
      };

      setUsers((prevUsers) => [...prevUsers, newUser]);
      // setSuccess("User created successfully!");
      showNotification("User created successfully!");
      setTimeout(() => navigate("/users"), 1500);
    } catch (err) {
      showNotification("Failed to create user", "error");
      // setError("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Add New User
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="first_name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="last_name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button variant="outlined" onClick={() => navigate("/users")}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Create User
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AddUser;
