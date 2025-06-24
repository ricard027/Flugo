"use client";

import type React from "react";
import { useAuth } from "../../_contexts/AuthContext";
import LoginPage from "./LoginPage";
import { Box, CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CircularProgress size={40} sx={{ color: "#22c55e" }} />
      </Box>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <>{children}</>;
}
