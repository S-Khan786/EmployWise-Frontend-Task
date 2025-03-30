import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NotificationContext } from "../NotificationContext";
import axios from "axios";
import {
  Box,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  TextField,
  IconButton,
  Tooltip,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Add, Logout, Search } from "@mui/icons-material";

const UserList = ({ users, setUsers }) => {
  const { showNotification } = useContext(NotificationContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );

      // Merge API users with locally added users
      const apiUsers = response.data.data;
      const localUsers = users.filter((user) => user.id < 0); // Local users have negative IDs
      const mergedUsers = [...apiUsers, ...localUsers];

      setUsers(mergedUsers);
      setTotalPages(response.data.total_pages);
      setError("");
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [page, navigate, setUsers]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [fetchUsers, navigate]);

  const handleDelete = async (id) => {
    try {
      if (id > 0) {
        // Only call API for real users (positive IDs)
        await axios.delete(`https://reqres.in/api/users/${id}`);
      }
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      showNotification("User deleted successfully!");
    } catch (err) {
      showNotification("Failed to delete user", "error");

      // setError("Failed to delete user. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    showNotification("User Logout successfully!");
    setTimeout(() => navigate("/login"), 100);
  };

  const filteredUsers = users.filter(
    (user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1">
          User Management
        </Typography>
        <Box>
          <Tooltip title="Add User">
            <IconButton color="primary" onClick={() => navigate("/users/add")}>
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton color="error" onClick={handleLogout}>
              <Logout />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <img
                          src={
                            user.avatar ||
                            `https://i.pravatar.cc/150?u=${user.email}`
                          }
                          alt={`${user.first_name} ${user.last_name}`}
                          style={{ width: 50, height: 50, borderRadius: "50%" }}
                        />
                      </TableCell>
                      <TableCell>{user.first_name}</TableCell>
                      <TableCell>{user.last_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton
                            color="primary"
                            onClick={() => navigate(`/users/${user.id}/edit`)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(user.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default UserList;
