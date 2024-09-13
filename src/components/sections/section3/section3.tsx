'use client'
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import styled from 'styled-components';
import ExploreIcon from '@mui/icons-material/Explore';
import EventIcon from '@mui/icons-material/Event';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const Container = styled(Box)`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  background-color: #D2DEEC;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const CardContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CustomCard = styled(Card)`
  flex: 1;
  margin: 1rem;
  padding: 1rem;
  text-align: center;
  background-color: #165252;
  color: white;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const IconContainer = styled(Box)`
  font-size: 50px;
  color: #78882D;
  transition: color 0.3s ease;
  margin-right: 0.5rem;

  ${CustomCard}:hover & {
    color: #D2DEEC;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const TitleContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Seccion3 = () => {
  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom style={{ color: '#013B58' }}>
        ¿Cómo Funciona?
      </Typography>
      <Typography variant="subtitle1" component="p" gutterBottom style={{ color: '#3C4556' }}>
        Tres sencillos pasos para empezar a vivir nuevas experiencias.
      </Typography>

      <CardContainer>
        <CustomCard>
          <Image src="/img/parque.jpg" alt="Explora Actividades" />
          <CardContent>
            <TitleContainer>
              <IconContainer>
                <ExploreIcon style={{ fontSize: '2rem' }} />
              </IconContainer>
              <Typography variant="h6" component="h3">
                Explora Actividades
              </Typography>
            </TitleContainer>
            <Typography variant="body2" component="p" style={{ color: '#D2DEEC' }}>
              Usa nuestra herramienta de búsqueda para encontrar actividades cerca de ti o según tus intereses.
            </Typography>
          </CardContent>
        </CustomCard>

        <CustomCard>
          <Image src="/img/personas.jpg" alt="Únete o Crea un Evento" />
          <CardContent>
            <TitleContainer>
              <IconContainer>
                <EventIcon style={{ fontSize: '2rem' }} />
              </IconContainer>
              <Typography variant="h6" component="h3">
                Únete o Crea un Evento
              </Typography>
            </TitleContainer>
            <Typography variant="body2" component="p" style={{ color: '#D2DEEC' }}>
              Encuentra compañeros para unirte a eventos o crea el tuyo propio y permite que otros se sumen.
            </Typography>
          </CardContent>
        </CustomCard>

        <CustomCard>
          <Image src="/img/copas.jpg" alt="Conecta y Disfruta" />
          <CardContent>
            <TitleContainer>
              <IconContainer>
                <ConnectWithoutContactIcon style={{ fontSize: '2rem' }} />
              </IconContainer>
              <Typography variant="h6" component="h3">
                Conecta y Disfruta
              </Typography>
            </TitleContainer>
            <Typography variant="body2" component="p" style={{ color: '#D2DEEC' }}>
              Conéctate con personas afines, comparte momentos y vive experiencias memorables.
            </Typography>
          </CardContent>
        </CustomCard>
      </CardContainer>
    </Container>
  );
};

export default Seccion3;