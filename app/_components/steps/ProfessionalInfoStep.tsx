"use client"

import type React from "react"
import { Grid, TextField, Typography, Box, MenuItem } from "@mui/material"
import type { EmployeeData } from "../../types/employee"

interface ProfessionalInfoStepProps {
  data: EmployeeData
  errors: Record<string, string>
  onChange: (data: Partial<EmployeeData>) => void
}

const departments = [
  "Recursos Humanos",
  "Tecnologia da Informação",
  "Financeiro",
  "Marketing",
  "Vendas",
  "Operações",
  "Jurídico",
  "Administrativo",
]

export default function ProfessionalInfoStep({ data, errors, onChange }: ProfessionalInfoStepProps) {
  const handleChange = (field: keyof EmployeeData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [field]: event.target.value })
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Informações Profissionais
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Selecione o departamento do colaborador
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            select
            label="Selecione um departamento"
            value={data.department}
            onChange={handleChange("department")}
            error={!!errors.department}
            helperText={errors.department || "Escolha o departamento onde o colaborador irá trabalhar"}
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
          >
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  )
}
