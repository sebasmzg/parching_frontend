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
  color: #013B58;
  font-size: 20px;
  margin-top: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  background-color: white;
  padding: 20px;

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
          How it works?
        </SectionTitle>
        <SectionDescription>
          3 simple steps to connect with people and enjoy activities.
        </SectionDescription>
      </TextSection>

      <CardContainer>
        <CustomCard 
          imageSrc="./assets/section3/img1.jpeg" 
          icon={Explore} 
          title="Explore Activities" 
          description="Use our search tool to find activities near you or based on your interests."
        />
        <CustomCard 
          imageSrc="./assets/section3/img2.jpeg" 
          icon={Event} 
          title="Join or Create Events" 
          description="Find companions to join events or create your own and allow others to join."
        />
        <CustomCard 
          imageSrc="./assets/section3/img3.jpeg" 
          icon={People} 
          title="Connect and Enjoy" 
          description="Connect with like-minded people, share moments, and create memorable experiences."
        />
      </CardContainer>
    </Container>
  );
};

export default Seccion3;