'use client'
import React from 'react';
import styled from 'styled-components';
import CustomCard from './customCard';
import { Explore, Event, People } from '@styled-icons/material';

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const TextSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
  flex-direction: column;
  height: 100%;
`;

const SectionTitle = styled.h2`
  color: #013B58;
  font-weight: bold;
  font-size: 50px;
`;

const SectionDescription = styled.h4`
  color: #3C4556;
  font-size: 20px;
  margin-top: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  background-color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Seccion3 = () => {
  return (
    <Container>
      <TextSection>
        <SectionTitle>
          ¿Cómo Funciona?
        </SectionTitle>
        <SectionDescription>
          Tres sencillos pasos para empezar a vivir nuevas experiencias.
        </SectionDescription>
      </TextSection>

      <CardContainer>
        <CustomCard 
          imageSrc="https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          icon={Explore} 
          title="Explora Actividades" 
          description="Usa nuestra herramienta de búsqueda para encontrar actividades cerca de ti o según tus intereses."
        />
        <CustomCard 
          imageSrc="https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          icon={Event} 
          title="Únete o Crea un Evento" 
          description="Encuentra compañeros para unirte a eventos o crea el tuyo propio y permite que otros se sumen."
        />
        <CustomCard 
          imageSrc="https://images.pexels.com/photos/697244/pexels-photo-697244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          icon={People} 
          title="Conecta y Disfruta" 
          description="Conéctate con personas afines, comparte momentos y vive experiencias memorables."
        />
      </CardContainer>
    </Container>
  );
};

export default Seccion3;