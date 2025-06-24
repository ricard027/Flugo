"use client";

// MUI - Core Components
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Components
import Breadcrumb from "../_components/Breadcrumb";
import EmployeeRegistrationForm from "../_components/EmployeeRegistrationForm";
import ProtectedRoute from "../_components/Auth/ProtectedRoute";
import MainLayout from "../_components/Layout/MainLayout";

// Context
import { AuthProvider } from "../_contexts/AuthContext";

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

const breadcrumbItems = [
  { label: "Colaboradores", href: "/" },
  { label: "Cadastrar Colaborador" },
];

function CadastrarColaboradorPage() {
  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Breadcrumb items={breadcrumbItems} />

        <Typography
          variant="h4"
          component="h1"
          sx={{ color: "#1f2937", fontWeight: 600, mb: 4 }}
        >
          Cadastrar Colaborador
        </Typography>

        <EmployeeRegistrationForm />
      </Container>
    </MainLayout>
  );
}

export default function CadastrarColaborador() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ProtectedRoute>
          <CadastrarColaboradorPage />
        </ProtectedRoute>
      </AuthProvider>
    </ThemeProvider>
  );
}
