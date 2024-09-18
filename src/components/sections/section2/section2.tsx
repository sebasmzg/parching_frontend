"use client";

import React from "react";
import styled from "styled-components";
import { Hiking, Palette, People } from "@mui/icons-material";

// Colores personalizados
const colors = {
  containerBackground: "#F0F4F8",
  sectionBackground: "#FFFFFF",
  titleColor: "#0A3D62",
  descriptionColor: "#1F2A38",
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
`;

const SectionTitle = styled.h2`
  color: ${colors.titleColor};
  font-weight: bold;
  font-size: 50px;
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
  font-size: 30px;
`;

const Description = styled.p`
  color: ${colors.descriptionColor};
  margin-bottom: 12px;
  font-size: 18px;
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
      titulo: "Aventureros:",
      descripcion:
        "Si disfrutas de actividades al aire libre como senderismo, ciclismo o deportes acuáticos.",
      icono: <Hiking style={{ fontSize: 50 }} />,
    },
    {
      titulo: "Amantes del arte y la cultura:",
      descripcion:
        "Para quienes desean asistir a talleres creativos, visitas a museos, o eventos culturales.",
      icono: <Palette style={{ fontSize: 50 }} />,
    },
    {
      titulo: "Socializadores:",
      descripcion:
        "Perfecto para aquellos que buscan ampliar su círculo social en un ambiente relajado y amistoso.",
      icono: <People style={{ fontSize: 50 }} />,
    },
  ];

  return (
    <Container>
      <ContentWrapper>
        <TextSection>
          <SectionTitle>¿Para quién es ParchingApp?</SectionTitle>
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
