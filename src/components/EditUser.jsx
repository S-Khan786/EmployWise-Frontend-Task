import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { NotificationContext } from "../NotificationContext";
import axios from "axios";
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

const EditUser = ({ users, setUsers }) => {
  const { showNotification } = useContext(NotificationContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (id !== "add") {
      const userToEdit = users.find((user) => user.id === parseInt(id));
      if (userToEdit) {
        setFormData({
          first_name: userToEdit.first_name,
          last_name: userToEdit.last_name,
          email: userToEdit.email,
        });
        setLoading(false);
      } else {
        fetchUser();
      }
    } else {
      setLoading(false);
    }
  }, [id, navigate, users]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setFormData({
        first_name: response.data.data.first_name,
        last_name: response.data.data.last_name,
        email: response.data.data.email,
      });
      setError("");
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (parseInt(id) < 0) {
        // Local user (negative ID)
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === parseInt(id) ? { ...user, ...formData } : user
          )
        );
        showNotification("User updated successfully!");
        // setSuccess("User updated successfully!");
      } else {
        // API user
        await axios.put(`https://reqres.in/api/users/${id}`, formData);
        showNotification("User updated successfully!");
        // setSuccess("User updated successfully!");
      }
      setTimeout(() => navigate("/users"), 1500);
    } catch (err) {
      showNotification("Failed to update user", "error");
      // setError(
      //   err.response?.data?.error || "Operation failed. Please try again."
      // );
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Edit User
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
                Update User
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default EditUser;
