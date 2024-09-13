'use client'

// components/SeccionComponent.tsx
import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import styled from 'styled-components';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px;
  width: 100%;
`;

const CardWrapper = styled(Card)`
  max-width: 345px;
  border-radius: 10px;
  background-color: #D2DEEC;
  color: #013B58;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PriceTag = styled(Typography)`
  color: #78882D;
  font-weight: bold;
`;

const DetailButton = styled(Button)`
  background-color: #3C4556;
  color: white;
  margin-top: 12px;
  &:hover {
    background-color: #165252;
  }
`;

const IconsContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

const SmallIcon = styled.div`
  font-size: 16px;
`;

const Seccion4 = () => {
  const cards = [
    {
      title: 'Parque Arví',
      price: '70.000 COP',
      image: '/img/parque.jpg',
      description: 'Senderismo y naturaleza',
      iconos: ['bus', 'guía', 'seguro'],
      link: '/detalle-cartagena'
    },
    {
      title: 'Cerro de las tres cruces',
      price: '35.000 COP',
      image: '/img/aventureros.jpg',
      description: 'Caminata',
      iconos: ['avión', 'guía', 'seguro'],
      link: '/detalle-dubai'
    },
    {
      title: 'Mirador San Felix',
      price: '25.000 COP',
      image: '/img/caption.jpg',
      description: 'Salidas puntuales',
      iconos: ['avión', 'bus', 'seguro'],
      link: '/detalle-uk'
    },
  ];

  return (
    <Container>
      {cards.map((card, index) => (
        <CardWrapper key={index}>
          <CardMedia
            component="img"
            alt={card.title}
            height="140"
            image={card.image}
          />
          <CardContent>
            <Header>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <PriceTag variant="h6">
                DESDE: {card.price}
              </PriceTag>
            </Header>
            <Typography variant="body2" color="textSecondary">
              {card.description}
            </Typography>
            <IconsContainer>
              {/* Iconos: Transporte, Guía, Seguro */}
              <SmallIcon>
                <DirectionsBusIcon style={{ fontSize: '20px', color: '#013B58' }} />
              </SmallIcon>
              <SmallIcon>
                <LocalActivityIcon style={{ fontSize: '20px', color: '#013B58' }} />
              </SmallIcon>
              <SmallIcon>
                <HealthAndSafetyIcon style={{ fontSize: '20px', color: '#013B58' }} />
              </SmallIcon>
            </IconsContainer>
            <DetailButton variant="contained" href={card.link}>
              DETALLE DEL PLAN
            </DetailButton>
          </CardContent>
        </CardWrapper>
      ))}
    </Container>
  );
};

export default Seccion4;