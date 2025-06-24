"use client"

import { Breadcrumbs, Link, Typography, Box } from "@mui/material"
import { NavigateNext as NavigateNextIcon } from "@mui/icons-material"
import { useRouter } from "next/navigation"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const router = useRouter()

  const handleClick = (href: string) => {
    router.push(href)
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          if (isLast || !item.href) {
            return (
              <Typography key={index} color="text.primary" sx={{ fontWeight: isLast ? "bold" : "normal" }}>
                {item.label}
              </Typography>
            )
          }

          return (
            <Link
              key={index}
              color="inherit"
              href={item.href}
              onClick={(e) => {
                e.preventDefault()
                handleClick(item.href!)
              }}
              sx={{
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </Breadcrumbs>
    </Box>
  )
}
