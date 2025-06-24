"use client";

import { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Alert,
  CircularProgress,
  LinearProgress,
  Snackbar,
} from "@mui/material";
import { useRouter } from "next/navigation";
import BasicInfoStep from "./steps/BasicInfoStep";
import ProfessionalInfoStep from "./steps/ProfessionalInfoStep";
import type { EmployeeData } from "../types/employee";
import { saveEmployee } from "../services/firebase";

const steps = ["Informações Básicas", "Informações Profissionais"];

const initialData: EmployeeData = {
  name: "",
  email: "",
  isActive: true,
  department: "",
};

export default function EmployeeRegistrationForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [employeeData, setEmployeeData] = useState<EmployeeData>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const updateEmployeeData = (data: Partial<EmployeeData>) => {
    setEmployeeData((prev) => ({ ...prev, ...data }));
    if (errors) {
      const newErrors = { ...errors };
      Object.keys(data).forEach((key) => {
        delete newErrors[key];
      });
      setErrors(newErrors);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!employeeData.name.trim()) newErrors.name = "Nome é obrigatório";
        if (!employeeData.email.trim()) newErrors.email = "Email é obrigatório";
        else if (!/\S+@\S+\.\S+/.test(employeeData.email))
          newErrors.email = "Email inválido";
        break;

      case 1:
        if (!employeeData.department.trim())
          newErrors.department = "Departamento é obrigatório";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const employeeId = await saveEmployee(employeeData);
      console.log("Colaborador salvo com sucesso! ID:", employeeId);

      setShowSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Erro ao salvar colaborador:", error);
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Erro ao salvar os dados. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <BasicInfoStep
            data={employeeData}
            errors={errors}
            onChange={updateEmployeeData}
          />
        );
      case 1:
        return (
          <ProfessionalInfoStep
            data={employeeData}
            errors={errors}
            onChange={updateEmployeeData}
          />
        );
      default:
        return "Etapa desconhecida";
    }
  };

  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  return (
    <>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
              Etapa {activeStep + 1} de {steps.length}
            </Box>
            <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
              {Math.round(progressPercentage)}%
            </Box>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercentage}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: "#e2e8f0",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                backgroundColor: "#22c55e",
              },
            }}
          />
        </Box>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {errors.submit && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.submit}
          </Alert>
        )}

        <Box sx={{ minHeight: 300 }}>{getStepContent(activeStep)}</Box>

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0 || isSubmitting}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Voltar
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              variant="contained"
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
              sx={{
                backgroundColor: "#22c55e",
                "&:hover": {
                  backgroundColor: "#16a34a",
                },
                "&:disabled": {
                  backgroundColor: "#9ca3af",
                },
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "medium",
              }}
            >
              {isSubmitting ? "Salvando..." : "Concluir"}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#22c55e",
                "&:hover": {
                  backgroundColor: "#16a34a",
                },
                borderRadius: 2,
                textTransform: "none",
                fontWeight: "medium",
              }}
            >
              Próximo
            </Button>
          )}
        </Box>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Colaborador cadastrado com sucesso! Redirecionando...
        </Alert>
      </Snackbar>
    </>
  );
}
