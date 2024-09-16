"use client";

import React from "react";
import styled from "styled-components";
import { Box, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

// Colores personalizados
const colors = {
  primary: "#165252",
  secondary: "#D2DEEC",
  accent: "#78882D",
  dark: "#3C4556",
  darker: "#013B58",
};

// Contenedor principal del footer
const FooterContainer = styled(Box)`
  background-color: ${colors.dark};
  color: ${colors.secondary};
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

// Contenedor para las secciones
const FooterSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }
`;

// Estilo para los enlaces
const FooterLink = styled(Link)`
  color: ${colors.secondary};
  margin: 5px;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

// Estilo para los íconos de redes sociales
const SocialIcon = styled(IconButton)`
  color: ${colors.secondary};
  margin: 5px;
  &:hover {
    color: ${colors.accent};
  }
`;

// Estilo para la imagen del logo
const FooterLogo = styled.img`
  height: 100px; 
  width: auto;
  margin: 20px 0;

  @media (min-width: 768px) {
    height: 100px; s
  }
`;

const Footer = () => {
  return (
    <FooterContainer sx={{height:'100%'}}>
      <FooterSection>
        <FooterLogo src="/assets/img/parchingHome.png" alt="Parching App Logo" />
      </FooterSection>

      <FooterSection>
        <Box>
          <Typography variant="body2" component="div" sx={{ mb: 2 }}>
            © {new Date().getFullYear()} Parching App. All rights reserved.
          </Typography>
        </Box>
      </FooterSection>

      <FooterSection>
        <Box>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Services</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
        </Box>
      </FooterSection>

      <FooterSection>
        <Box>
          <SocialIcon aria-label="Facebook">
            <Facebook />
          </SocialIcon>
          <SocialIcon aria-label="Twitter">
            <Twitter />
          </SocialIcon>
          <SocialIcon aria-label="Instagram">
            <Instagram />
          </SocialIcon>
          <SocialIcon aria-label="LinkedIn">
            <LinkedIn />
          </SocialIcon>
        </Box>
      </FooterSection>
    </FooterContainer>
  );
};

export default Footer;
