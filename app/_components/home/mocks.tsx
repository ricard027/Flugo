import {
  People,
  Security,
  Speed,
  Analytics,
  Business,
  TrendingUp,
  Assignment,
} from "@mui/icons-material";

export const features = [
  {
    icon: <People sx={{ fontSize: 40 }} />,
    title: "Gestão Completa",
    description:
      "Gerencie todos os seus colaboradores em um só lugar com interface intuitiva e moderna.",
    color: "#22c55e",
  },
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: "Segurança Total",
    description:
      "Autenticação segura com Google e dados protegidos no Firebase Cloud.",
    color: "#3b82f6",
  },
  {
    icon: <Speed sx={{ fontSize: 40 }} />,
    title: "Performance",
    description:
      "Sistema rápido e responsivo, otimizado para melhor experiência do usuário.",
    color: "#f59e0b",
  },
  {
    icon: <Analytics sx={{ fontSize: 40 }} />,
    title: "Relatórios",
    description:
      "Dashboards e relatórios detalhados para acompanhar métricas importantes.",
    color: "#8b5cf6",
  },
];

export const benefits = [
  "Interface moderna e intuitiva",
  "Autenticação segura com Google",
  "Dados em tempo real",
  "Sistema responsivo",
  "Relatórios detalhados",
  "Suporte completo",
];

export const testimonials = [
  {
    name: "Maria Silva",
    role: "Gerente de RH",
    company: "TechCorp",
    text: "O Flugo revolucionou nossa gestão de colaboradores. Interface intuitiva e funcionalidades completas!",
  },
  {
    name: "João Santos",
    role: "Diretor",
    company: "StartupXYZ",
    text: "Implementação rápida e resultados imediatos. Recomendo para qualquer empresa!",
  },
  {
    name: "Ana Costa",
    role: "CEO",
    company: "InnovaCorp",
    text: "Excelente ferramenta! Nosso time de RH economiza horas de trabalho toda semana.",
  },
];

export const stats = [
  {
    icon: <People sx={{ fontSize: 40 }} />,
    number: "1000+",
    label: "Colaboradores Gerenciados",
    color: "#22c55e",
  },
  {
    icon: <Business sx={{ fontSize: 40 }} />,
    number: "50+",
    label: "Empresas Ativas",
    color: "#3b82f6",
  },
  {
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    number: "99.9%",
    label: "Uptime Garantido",
    color: "#f59e0b",
  },
  {
    icon: <Assignment sx={{ fontSize: 40 }} />,
    number: "24/7",
    label: "Suporte Disponível",
    color: "#8b5cf6",
  },
];
