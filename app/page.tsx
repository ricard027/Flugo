"use client";

// MUI - Core
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Components
import HomePage from "./_components/home";

// Context
import { AuthProvider } from "./_contexts/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#22c55e",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <HomePage />
      </AuthProvider>
    </ThemeProvider>
  );
}
