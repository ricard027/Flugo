"use client";

// MUI - Core Components
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// MUI - Icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

// React & Next Hooks
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Types
import type { Employee } from "../types/employee";

// Services
import {
  deleteEmployee,
  getEmployees,
  populateInitialData,
  toggleEmployeeStatus,
} from "../services/firebase";

// Components
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

function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    employee: Employee | null;
  }>({
    open: false,
    employee: null,
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });
  const router = useRouter();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      await populateInitialData();
      const employeeList = await getEmployees();
      setEmployees(employeeList);
    } catch (error) {
      console.error("Erro ao carregar colaboradores:", error);
      showSnackbar("Erro ao carregar colaboradores", "error");
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleNewEmployee = () => {
    router.push("/cadastrar-colaborador");
  };

  const handleEditEmployee = (employee: Employee) => {
    router.push(`/editar-colaborador/${employee.id}`);
  };

  const handleDeleteClick = (employee: Employee) => {
    setDeleteDialog({ open: true, employee });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.employee) return;

    try {
      await deleteEmployee(deleteDialog.employee.id);
      await loadEmployees();
      showSnackbar("Colaborador excluído com sucesso", "success");
    } catch (error) {
      console.error("Erro ao excluir colaborador:", error);
      showSnackbar("Erro ao excluir colaborador", "error");
    } finally {
      setDeleteDialog({ open: false, employee: null });
    }
  };

  const handleToggleStatus = async (employee: Employee) => {
    try {
      await toggleEmployeeStatus(employee.id, employee.isActive);
      await loadEmployees();
      showSnackbar(
        `Colaborador ${
          employee.isActive ? "desativado" : "ativado"
        } com sucesso`,
        "success"
      );
    } catch (error) {
      console.error("Erro ao alterar status:", error);
      showSnackbar("Erro ao alterar status do colaborador", "error");
    }
  };

  const getAvatarColor = (index: number) => {
    const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];
    return colors[index % colors.length];
  };

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: "#1f2937", fontWeight: 600 }}
          >
            Colaboradores
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewEmployee}
            sx={{
              backgroundColor: "#22c55e",
              color: "white",
              textTransform: "none",
              fontWeight: 500,
              px: 3,
              py: 1,
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#16a34a",
              },
            }}
          >
            Novo Colaborador
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          elevation={1}
          sx={{ borderRadius: 2, border: "1px solid #e5e7eb" }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9fafb" }}>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "0.875rem",
                  }}
                >
                  Nome
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "0.875rem",
                  }}
                >
                  Email
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "0.875rem",
                  }}
                >
                  Departamento
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "0.875rem",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "0.875rem",
                  }}
                >
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    Carregando colaboradores...
                  </TableCell>
                </TableRow>
              ) : employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      Nenhum colaborador cadastrado ainda.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Clique em Novo Colaborador para adicionar o primeiro.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((employee, index) => (
                  <TableRow
                    key={employee.id}
                    hover
                    sx={{ "&:hover": { backgroundColor: "#f9fafb" } }}
                  >
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            backgroundColor: getAvatarColor(index),
                            fontSize: "1rem",
                            fontWeight: "bold",
                          }}
                        >
                          {employee.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography
                          sx={{
                            fontSize: "0.875rem",
                            color: "#1f2937",
                            fontWeight: 500,
                          }}
                        >
                          {employee.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {employee.email}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {employee.department}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={employee.isActive ? "Ativo" : "Inativo"}
                        sx={{
                          backgroundColor: employee.isActive
                            ? "#dcfce7"
                            : "#f3f4f6",
                          color: employee.isActive ? "#166534" : "#6b7280",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          height: 24,
                        }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Tooltip
                          title={employee.isActive ? "Desativar" : "Ativar"}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleToggleStatus(employee)}
                            sx={{
                              color: employee.isActive ? "#22c55e" : "#6b7280",
                            }}
                          >
                            {employee.isActive ? (
                              <ToggleOnIcon />
                            ) : (
                              <ToggleOffIcon />
                            )}
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton
                            size="small"
                            onClick={() => handleEditEmployee(employee)}
                            sx={{ color: "#3b82f6" }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(employee)}
                            sx={{ color: "#ef4444" }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={deleteDialog.open}
          onClose={() => setDeleteDialog({ open: false, employee: null })}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Tem certeza que deseja excluir o colaborador{" "}
              <strong>{deleteDialog.employee?.name}</strong>? Esta ação não pode
              ser desfeita.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDeleteDialog({ open: false, employee: null })}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
            >
              Excluir
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </MainLayout>
  );
}

export default function Colaboradores() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ProtectedRoute>
          <EmployeesPage />
        </ProtectedRoute>
      </AuthProvider>
    </ThemeProvider>
  );
}
