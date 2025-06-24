"use client"

import type React from "react"
import { Grid, TextField, Typography, Box, FormControlLabel, Switch } from "@mui/material"
import type { EmployeeData } from "../../types/employee"

interface BasicInfoStepProps {
  data: EmployeeData
  errors: Record<string, string>
  onChange: (data: Partial<EmployeeData>) => void
}

export default function BasicInfoStep({ data, errors, onChange }: BasicInfoStepProps) {
  const handleChange = (field: keyof EmployeeData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (field === "isActive") {
      onChange({ [field]: event.target.checked })
    } else {
      onChange({ [field]: event.target.value })
    }
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Informações Básicas
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Preencha os dados básicos do colaborador
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Título"
            value={data.name}
            onChange={handleChange("name")}
            error={!!errors.name}
            helperText={errors.name}
            placeholder="Digite o nome completo do colaborador"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#22c55e",
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#22c55e",
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="E-mail"
            type="email"
            value={data.email}
            onChange={handleChange("email")}
            error={!!errors.email}
            helperText={errors.email}
            placeholder="e.g. john@gmail.com"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#22c55e",
                  borderWidth: 2,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#22c55e",
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={data.isActive}
                  onChange={handleChange("isActive")}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#22c55e",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "#22c55e",
                    },
                  }}
                />
              }
              label="Ativar ao criar"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
