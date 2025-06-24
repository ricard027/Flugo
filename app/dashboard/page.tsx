"use client";
// Types
import type * as React from "react";

// React Hooks
import { useEffect, useState } from "react";

// MUI - Core Components
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// MUI - Icons
import { Business, People, PersonAdd, TrendingUp } from "@mui/icons-material";

// Components
import ProtectedRoute from "../_components/Auth/ProtectedRoute";
import MainLayout from "../_components/Layout/MainLayout";

// Context
import { AuthProvider } from "../_contexts/AuthContext";

// Services
import { getEmployees } from "../services/firebase";

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

interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  newThisMonth: number;
  departments: number;
  departmentList: string[];
}

const StatCard = ({
  title,
  value,
  icon,
  color,
  loading = false,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  loading?: boolean;
}) => (
  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
    <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <Box sx={{ color, fontSize: 40 }}>{icon}</Box>
      </Box>
      {loading ? (
        <CircularProgress size={24} sx={{ color, mb: 1 }} />
      ) : (
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {value}
        </Typography>
      )}
      <Typography variant="body1" color="text.secondary">
        {title}
      </Typography>
    </Paper>
  </Grid>
);

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    newThisMonth: 0,
    departments: 0,
    departmentList: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      setError(null);

      const employees = await getEmployees();
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const totalEmployees = employees.length;
      const activeEmployees = employees.filter((emp) => emp.isActive).length;
      const inactiveEmployees = employees.filter((emp) => !emp.isActive).length;

      const newThisMonth = employees.filter((emp) => {
        const createdDate = emp.createdAt;
        return (
          createdDate.getMonth() === currentMonth &&
          createdDate.getFullYear() === currentYear
        );
      }).length;

      const departmentList = [
        ...new Set(employees.map((emp) => emp.department).filter(Boolean)),
      ];
      const departments = departmentList.length;

      setStats({
        totalEmployees,
        activeEmployees,
        inactiveEmployees,
        newThisMonth,
        departments,
        departmentList,
      });
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      setError("Erro ao carregar dados do dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <MainLayout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: "#1f2937", fontWeight: 600, mb: 4 }}
          >
            Dashboard
          </Typography>
          <Paper sx={{ p: 4, textAlign: "center" }}>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tente recarregar a página ou verifique sua conexão.
            </Typography>
          </Paper>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ color: "#1f2937", fontWeight: 600, mb: 4 }}
        >
          Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <StatCard
              title="Total de Colaboradores"
              value={stats.totalEmployees}
              icon={<People />}
              color="#22c55e"
              loading={loading}
            />
            <StatCard
              title="Colaboradores Ativos"
              value={stats.activeEmployees}
              icon={<TrendingUp />}
              color="#4caf50"
              loading={loading}
            />
            <StatCard
              title="Novos este Mês"
              value={stats.newThisMonth}
              icon={<PersonAdd />}
              color="#ff9800"
              loading={loading}
            />
            <StatCard
              title="Departamentos"
              value={stats.departments}
              icon={<Business />}
              color="#9c27b0"
              loading={loading}
            />
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, mt: 3 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "#1f2937", fontWeight: 600 }}
                >
                  Resumo Geral
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Colaboradores Ativos:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, color: "#22c55e" }}
                    >
                      {loading ? "..." : stats.activeEmployees}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Colaboradores Inativos:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, color: "#ef4444" }}
                    >
                      {loading ? "..." : stats.inactiveEmployees}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Taxa de Atividade:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 500, color: "#3b82f6" }}
                    >
                      {loading
                        ? "..."
                        : stats.totalEmployees > 0
                        ? `${Math.round(
                            (stats.activeEmployees / stats.totalEmployees) * 100
                          )}%`
                        : "0%"}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "#1f2937", fontWeight: 600 }}
                >
                  Departamentos
                </Typography>
                {loading ? (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", py: 2 }}
                  >
                    <CircularProgress size={24} />
                  </Box>
                ) : stats.departmentList.length > 0 ? (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {stats.departmentList.slice(0, 5).map((dept, index) => (
                      <Box
                        key={index}
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: [
                              "#22c55e",
                              "#3b82f6",
                              "#f59e0b",
                              "#ef4444",
                              "#8b5cf6",
                            ][index % 5],
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {dept}
                        </Typography>
                      </Box>
                    ))}
                    {stats.departmentList.length > 5 && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1, fontStyle: "italic" }}
                      >
                        +{stats.departmentList.length - 5} outros departamentos
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Nenhum departamento cadastrado ainda.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Bem-vindo ao Sistema de Colaboradores
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Use o menu lateral para navegar entre as diferentes seções do
            sistema.
            {stats.totalEmployees === 0 && (
              <span>
                {" "}
                Comece <strong>cadastrando colaboradores</strong> ou{" "}
                <strong>populando com dados de exemplo</strong>.
              </span>
            )}
          </Typography>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      </AuthProvider>
    </ThemeProvider>
  );
}
