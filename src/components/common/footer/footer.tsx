"use client";

import React from "react";
import styled from "styled-components";
import { Facebook, Twitter, Instagram, Linkedin } from "@styled-icons/fa-brands";

// Colores personalizados
const colors = {
  primary: "#165252",
  secondary: "#D2DEEC",
  accent: "#78882D",
  dark: "#165252",
  darker: "#013B58",
};

// Contenedor principal del footer
const FooterContainer = styled.footer`
  background-color: ${colors.dark};
  color: ${colors.secondary};
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 200px;

`;

// Contenedor para las secciones
const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
  height: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    text-align: center;
  }
`;

// Estilo para los enlaces
const FooterLink = styled.a`
  color: ${colors.secondary};
  margin: 5px;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Estilo para los íconos de redes sociales
const SocialIcon = styled.a`
  color: ${colors.secondary};
  margin: 5px;
  cursor: pointer;
  display: inline-block;
  
  &:hover {
    color: ${colors.accent};
  }
`;

// Estilo para la imagen del logo
const FooterLogo = styled.img`
  height: 80px; 
  width: auto;
  margin: 20px 0;
  
  @media (min-width: 768px) {
    height: 40px;
  }
`;

// Estilo para el texto de derechos reservados
const FooterText = styled.p`
  margin: 0;
  padding-bottom: 10px;
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection>
        <FooterLogo src="/assets/img/parchingHome.png" alt="Parching App Logo" />
      </FooterSection>

      <FooterSection>
        <FooterText>
          © {new Date().getFullYear()} Parching App. All rights reserved.
        </FooterText>
      </FooterSection>

      <FooterSection>
        <div>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Services</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
        </div>
      </FooterSection>

      <FooterSection>
        <div>
          <SocialIcon href="#" aria-label="Facebook">
            <Facebook size="20" />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Twitter">
            <Twitter size="20" />
          </SocialIcon>
          <SocialIcon href="#" aria-label="Instagram">
            <Instagram size="20" />
          </SocialIcon>
          <SocialIcon href="#" aria-label="LinkedIn">
            <Linkedin size="20" />
          </SocialIcon>
        </div>
      </FooterSection>
    </FooterContainer>
  );
};

export default Footer;