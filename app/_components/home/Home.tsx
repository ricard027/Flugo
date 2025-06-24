"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  AppBar,
  Toolbar,
  Fade,
  Zoom,
  Paper,
  Avatar,
} from "@mui/material";
import {
  Google as GoogleIcon,
  ArrowForward,
  CheckCircle,
  Dashboard,
  PersonAdd,
} from "@mui/icons-material";

import { useRouter } from "next/navigation";
import { useAuth } from "../../_contexts/AuthContext";
import { benefits, features, stats, testimonials } from "./mocks";

export default function HomePage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    if (user && !loading) {
      router.push("/colaboradores");
    }
  }, [user, loading, router]);

  const handleLogin = async () => {
    try {
      setLoginLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleGetStarted = () => {
    if (user) {
      router.push("/colaboradores");
    } else {
      handleLogin();
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
        }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          Carregando...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#fafafa" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          color: "#1f2937",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "#22c55e",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                F
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#1f2937" }}
            >
              Flugo
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleLogin}
            disabled={loginLoading}
            sx={{
              backgroundColor: "#22c55e",
              "&:hover": { backgroundColor: "#16a34a" },
              textTransform: "none",
              fontWeight: 500,
              px: 3,
            }}
          >
            {loginLoading ? "Entrando..." : "Entrar"}
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          color: "white",
          pt: 12,
          pb: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={6} alignItems="center">
              <Grid size={{ xs: 12, md: 6 }}>
                <Fade in={isVisible} timeout={1000}>
                  <Box>
                    <Typography
                      variant="h2"
                      component="h1"
                      sx={{
                        fontWeight: "bold",
                        mb: 3,
                        fontSize: { xs: "2.5rem", md: "3.5rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      Gerencie seus{" "}
                      <Box component="span" sx={{ color: "#fbbf24" }}>
                        Colaboradores
                      </Box>{" "}
                      com Eficiência
                    </Typography>

                    <Typography
                      variant="h5"
                      sx={{
                        mb: 4,
                        opacity: 0.9,
                        fontWeight: 300,
                        lineHeight: 1.6,
                      }}
                    >
                      Sistema moderno e intuitivo para gestão completa de
                      colaboradores. Cadastre, edite e acompanhe sua equipe em
                      tempo real com segurança e praticidade.
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleGetStarted}
                        disabled={loginLoading}
                        sx={{
                          backgroundColor: "white",
                          color: "#22c55e",
                          "&:hover": {
                            backgroundColor: "#f9fafb",
                            transform: "translateY(-2px)",
                          },
                          px: 4,
                          py: 1.5,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          textTransform: "none",
                          borderRadius: 2,
                          transition: "all 0.3s ease",
                        }}
                        endIcon={<ArrowForward />}
                      >
                        Começar Agora
                      </Button>

                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          borderColor: "white",
                          color: "white",
                          "&:hover": {
                            borderColor: "white",
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                          px: 4,
                          py: 1.5,
                          fontSize: "1.1rem",
                          fontWeight: 500,
                          textTransform: "none",
                          borderRadius: 2,
                        }}
                      >
                        Ver Demonstração
                      </Button>
                    </Box>
                  </Box>
                </Fade>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Zoom in={isVisible} timeout={1200}>
                  <Box sx={{ textAlign: "center" }}>
                    <Paper
                      elevation={20}
                      sx={{
                        p: 4,
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(10px)",
                        transform: "rotate(-2deg)",
                        "&:hover": {
                          transform: "rotate(0deg)",
                        },
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 3 }}
                      >
                        <Dashboard sx={{ color: "#22c55e", mr: 2 }} />
                        <Typography
                          variant="h6"
                          sx={{ color: "#1f2937", fontWeight: 600 }}
                        >
                          Dashboard Intuitivo
                        </Typography>
                      </Box>

                      <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                          <Grid size={4}>
                            <Box sx={{ textAlign: "center" }}>
                              <Typography
                                variant="h4"
                                sx={{ color: "#22c55e", fontWeight: "bold" }}
                              >
                                1K+
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Colaboradores
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid size={4}>
                            <Box sx={{ textAlign: "center" }}>
                              <Typography
                                variant="h4"
                                sx={{ color: "#3b82f6", fontWeight: "bold" }}
                              >
                                50+
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Empresas
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid size={4}>
                            <Box sx={{ textAlign: "center" }}>
                              <Typography
                                variant="h4"
                                sx={{ color: "#f59e0b", fontWeight: "bold" }}
                              >
                                99%
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Satisfação
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Paper>
                  </Box>
                </Zoom>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2, color: "#1f2937" }}
          >
            Números que Impressionam
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Resultados comprovados de empresas que confiam no Flugo
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Fade in={isVisible} timeout={800 + index * 200}>
                  <Card
                    sx={{
                      textAlign: "center",
                      p: 4,
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        backgroundColor: `${stat.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: "bold", mb: 1, color: stat.color }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Box sx={{ backgroundColor: "#f8fafc", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: "bold", mb: 2, color: "#1f2937" }}
            >
              Por que escolher o Flugo?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto" }}
            >
              Desenvolvido com as melhores tecnologias para oferecer a melhor
              experiência em gestão de colaboradores.
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Fade in={isVisible} timeout={1000 + index * 200}>
                    <Card
                      sx={{
                        height: "100%",
                        textAlign: "center",
                        p: 3,
                        borderRadius: 3,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          backgroundColor: `${feature.color}15`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mx: "auto",
                          mb: 3,
                          color: feature.color,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 2 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", mb: 3, color: "#1f2937" }}
              >
                Tudo que você precisa em um só lugar
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                Sistema completo com todas as funcionalidades necessárias para
                uma gestão eficiente de colaboradores.
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {benefits.map((benefit, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <CheckCircle sx={{ color: "#22c55e", mr: 2 }} />
                    <Typography variant="body1">{benefit}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ textAlign: "center" }}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                  }}
                >
                  <PersonAdd sx={{ fontSize: 60, mb: 2 }} />
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Cadastro Simplificado
                  </Typography>
                  <Typography sx={{ opacity: 0.9 }}>
                    Formulário intuitivo em etapas para cadastrar novos
                    colaboradores rapidamente e sem complicações.
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Box sx={{ backgroundColor: "#f8fafc", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{ fontWeight: "bold", mb: 2, color: "#1f2937" }}
            >
              O que nossos clientes dizem
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Empresas que já transformaram sua gestão com o Flugo.
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              {testimonials.map((testimonial, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Fade in={isVisible} timeout={1200 + index * 200}>
                    <Card
                      sx={{
                        p: 4,
                        height: "100%",
                        borderRadius: 3,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ mb: 3, fontStyle: "italic", lineHeight: 1.6 }}
                      >
                        "{testimonial.text}"
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            mr: 2,
                            backgroundColor: "#22c55e",
                          }}
                        >
                          {testimonial.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role} • {testimonial.company}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 3 }}>
            Pronto para começar?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Junte-se a centenas de empresas que já transformaram sua gestão de
            colaboradores com o Flugo.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            disabled={loginLoading}
            startIcon={<GoogleIcon />}
            sx={{
              backgroundColor: "#22c55e",
              "&:hover": {
                backgroundColor: "#16a34a",
                transform: "translateY(-2px)",
              },
              px: 6,
              py: 2,
              fontSize: "1.2rem",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 3,
              transition: "all 0.3s ease",
            }}
          >
            {loginLoading ? "Entrando..." : "Começar Gratuitamente"}
          </Button>

          <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
            Login seguro com sua conta Google • Sem cartão de crédito
          </Typography>
        </Container>
      </Box>

      <Box sx={{ backgroundColor: "#f8fafc", py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: "#22c55e",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      F
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#1f2937" }}
                  >
                    Flugo
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Sistema moderno de gestão de colaboradores para empresas que
                  buscam eficiência e praticidade.
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "#1f2937" }}
                >
                  Produto
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Funcionalidades
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Preços
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Segurança
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "#1f2937" }}
                >
                  Empresa
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Sobre nós
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Carreiras
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contato
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "#1f2937" }}
                >
                  Suporte
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Central de Ajuda
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Documentação
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "#1f2937" }}
                >
                  Legal
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Privacidade
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Termos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cookies
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              borderTop: "1px solid #e5e7eb",
              mt: 6,
              pt: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © 2024 Flugo. Sistema de Gestão de Colaboradores. Todos os
              direitos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
