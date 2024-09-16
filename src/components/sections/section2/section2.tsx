"use client";

import React from "react";
import { Typography } from "@mui/material";
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
  max-width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 40px;
  background-color: ${colors.containerBackground};

    @media (max-width: 768px) {
        height: auto;
    }
`;

const StyledSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background-color: ${colors.sectionBackground};
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: calc(100%/3 - 40px);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  height: 100%;
  margin-right: 20px;
  border-radius: 12px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

const Title = styled(Typography)`
  color: ${colors.titleColor};
  margin-bottom: 20px;
  font-weight: 600;
`;

const Description = styled(Typography)`
  color: ${colors.descriptionColor};
  margin-bottom: 12px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: ${colors.iconColor};
  font-size: 24px;
  transition: transform 0.3s ease;
`;

interface Seccion {
  titulo: string;
  descripcion: string;
  imagen: string;
  icono: React.ReactNode;
}

const Seccion1: React.FC = () => {
  const secciones: Seccion[] = [
    {
      titulo: "Aventureros:",
      descripcion:
        "Si disfrutas de actividades al aire libre como senderismo, ciclismo o deportes acuáticos.",
      imagen: "/img/aventureros.jpg",
      icono: <Hiking />,
    },
    {
      titulo: "Amantes del arte y la cultura:",
      descripcion:
        "Para quienes desean asistir a talleres creativos, visitas a museos, o eventos culturales.",
      imagen: "/img/arte y cultura.jpg",
      icono: <Palette />,
    },
    {
      titulo: "Socializadores:",
      descripcion:
        "Perfecto para aquellos que buscan ampliar su círculo social en un ambiente relajado y amistoso.",
      imagen: "/img/sociables.jpg",
      icono: <People />,
    },
  ];

  return (
    <Container>
      <Typography
        variant="h3"
        gutterBottom
        style={{ color: "#003B6F", textAlign: "center", marginBottom: "30px" }}
      >
        ¿Para quién es ParchingApp?
      </Typography>
      {secciones.map((seccion, index) => (
        <StyledSection key={index}>
          <ImageContainer>
            <Image src={seccion.imagen} alt={seccion.titulo} />
          </ImageContainer>
          <ContentContainer>
            <Title variant="h6">{seccion.titulo}</Title>
            <Description variant="body1">{seccion.descripcion}</Description>
            <IconContainer>{seccion.icono}</IconContainer>
          </ContentContainer>
        </StyledSection>
      ))}
    </Container>
  );
};

export default Seccion1;
