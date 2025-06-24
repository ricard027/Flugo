"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useAuth } from "../../_contexts/AuthContext";
import { AuthError } from "firebase/auth";

export default function LoginPage() {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await signInWithGoogle();
    } catch (error) {
      const _error = error as AuthError;
      console.error("Erro no login:", error);

      let errorMessage = "Erro ao fazer login. Tente novamente.";

      if (_error.code === "auth/popup-closed-by-user") {
        errorMessage = "Login cancelado pelo usuário.";
      } else if (_error.code === "auth/popup-blocked") {
        errorMessage = "Pop-up bloqueado. Permita pop-ups para este site.";
      } else if (_error.code === "auth/network-request-failed") {
        errorMessage = "Erro de conexão. Verifique sua internet.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        backgroundImage: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 6,
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              backgroundColor: "#22c55e",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "white", fontWeight: "bold" }}
            >
              F
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#1f2937", mb: 1 }}
          >
            Flugo
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sistema de Gestão de Colaboradores
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={
            loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <GoogleIcon />
            )
          }
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{
            backgroundColor: "#4285f4",
            "&:hover": {
              backgroundColor: "#3367d6",
            },
            "&:disabled": {
              backgroundColor: "#9ca3af",
            },
            py: 1.5,
            fontSize: "1rem",
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          {loading ? "Entrando..." : "Entrar com Google"}
        </Button>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          Faça login para acessar o sistema
        </Typography>
      </Paper>
    </Box>
  );
}
