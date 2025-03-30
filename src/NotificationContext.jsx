import React, { createContext, useState } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success", // 'success', 'error', 'warning', 'info'
  });

  const showNotification = (message, severity = "success") => {
    setNotification({ open: true, message, severity });
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={closeNotification}
        anchorOrigin={{
          vertical: window.innerWidth < 600 ? "bottom" : "top",
          horizontal: window.innerWidth < 600 ? "center" : "right",
        }}
        sx={{
          "& .MuiSnackbarContent-root": {
            flexWrap: "nowrap",
          },
        }}
      >
        <Alert
          onClose={closeNotification}
          severity={notification.severity}
          sx={{
            width: "100%",
            fontSize: (theme) =>
              theme.breakpoints.down("sm") ? "0.875rem" : "1rem",
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};

// Add these imports at the top of the file:
import { Snackbar, Alert } from "@mui/material";
