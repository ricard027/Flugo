"use client"

import type React from "react"
import { Grid, TextField, Typography, Box, MenuItem } from "@mui/material"
import type { EmployeeData } from "../../types/employee"

interface ProfessionalDataStepProps {
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

export default function ProfessionalDataStep({ data, errors, onChange }: ProfessionalDataStepProps) {
  const handleChange = (field: keyof EmployeeData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [field]: event.target.value })
  }

  const formatSalary = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(numbers) / 100)
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Dados Profissionais
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Cargo"
            value={data.position}
            onChange={handleChange("position")}
            error={!!errors.position}
            helperText={errors.position}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            select
            label="Departamento"
            value={data.department}
            onChange={handleChange("department")}
            error={!!errors.department}
            helperText={errors.department}
          >
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Salário"
            value={data.salary}
            onChange={(e) => {
              const formatted = formatSalary(e.target.value)
              onChange({ salary: formatted })
            }}
            error={!!errors.salary}
            helperText={errors.salary}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Data de Admissão"
            type="date"
            value={data.admissionDate}
            onChange={handleChange("admissionDate")}
            error={!!errors.admissionDate}
            helperText={errors.admissionDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  )
}
