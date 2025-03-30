import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import AddUser from "./components/AddUser";
import { NotificationProvider } from "./NotificationContext";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function App() {
  const [users, setUsers] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/users"
              element={<UserList users={users} setUsers={setUsers} />}
            />
            <Route
              path="/users/:id/edit"
              element={<EditUser users={users} setUsers={setUsers} />}
            />
            <Route
              path="/users/add"
              element={<AddUser setUsers={setUsers} />}
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
