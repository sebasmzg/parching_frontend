"use client";

import React from "react";
import styled from "styled-components";
import { Hiking, Palette, People } from "@mui/icons-material";

// Colores personalizados
const colors = {
  containerBackground: "#F0F4F8",
  sectionBackground: "#FFFFFF",
  titleColor: "#013b58",
  descriptionColor: "#165252",
  iconColor: "#34A853",
};

// Estilos personalizados con styled-components
const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.containerBackground};

  @media (max-width: 768px) {
    height: auto;
  }
`;

const TextSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.sectionBackground};
  height: 50%;
  text-align: center;
`;

const SectionTitle = styled.h2`
  color: ${colors.titleColor};
  font-weight: bold;
  font-size: 4rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const StyledSection = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.sectionBackground};
  height: calc(100% / 3);
  width: 100%;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Title = styled.h3`
  color: ${colors.titleColor};
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 3rem;
`;

const Description = styled.p`
  color: ${colors.descriptionColor};
  margin-bottom: 12px;
  font-size: 1.5rem;
`;

const IconContainer = styled.div`
  display: flex;
  color: ${colors.iconColor};
  justify-content: center;
`;

interface Seccion {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
}

const Seccion1: React.FC = () => {
  const secciones: Seccion[] = [
    {
      titulo: "Adventurers:",
      descripcion:
        "If you enjoy outdoor activities such as hiking, cycling, or water sports.",
      icono: <Hiking style={{ fontSize: 50 }} />,
    },
    {
      titulo: "Art and Culture Lovers:",
      descripcion:
        "For those who want to attend creative workshops, museum visits, or cultural events.",
      icono: <Palette style={{ fontSize: 50 }} />,
    },
    {
      titulo: "Socializers:",
      descripcion:
        "Perfect for those looking to expand their social circle in a relaxed and friendly environment.",
      icono: <People style={{ fontSize: 50 }} />,
    },
  ];

  return (
    <Container>
      <ContentWrapper>
        <TextSection>
          <SectionTitle>Who is ParchingApp for?</SectionTitle>
        </TextSection>
        {secciones.map((seccion, index) => (
          <StyledSection key={index}>
            <ContentContainer>
              <IconContainer>{seccion.icono}</IconContainer>
              <TextContainer>
                <Title>{seccion.titulo}</Title>
                <Description>{seccion.descripcion}</Description>
              </TextContainer>
            </ContentContainer>
          </StyledSection>
        ))}
      </ContentWrapper>
    </Container>
  );
};

export default Seccion1;
