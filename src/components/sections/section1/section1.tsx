"use client";

import React from "react";
import styled, {keyframes} from "styled-components";
import { Box} from "@mui/material";

// Animación de desvanecimiento
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Contenedor principal
const SectionContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  // Adaptación para pantallas más grandes
  @media (min-width: 768px) {
    height: 100vh;
  }
`;

// Video de fondo
const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileVideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  
  // Ocultar video para pantallas grandes
  @media (min-width: 768px) {
    display: none;
  }
`;

// Contenedor de texto superpuesto
const TextOverlay = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;

  // Fondo semitransparente para mejorar legibilidad
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;

  // Adaptación para pantallas más grandes
  @media (min-width: 768px) {
    padding: 50px;
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

const Title = styled.h1`
  margin-bottom: 30px;
  animation: ${fadeIn} 1.2s ease-out;

  img {
    width: 100%;
    max-width: 400px; // Adjust as needed
    height: auto;
  }

  @media (max-width: 768px) {
    font-size: 35px;

    img {
      max-width: 200px;
    }
  }
`;
const SubTitle = styled.h2`
  color: white;
  font-size: 4rem;
  margin-bottom: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  animation: ${fadeIn} 1.7s ease-out;
  position: relative;
  font-weight: bold;

  &::after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 63%;
    transform: translateX(-50%);
    width: 130%;
    height: 55px;
    background: url('/assets/img/underlineText.png') no-repeat center;
    background-size: contain;
    z-index: -1;
  }

  @media (max-width: 768px) {
    font-size: 28px;
    &::after {
      width: 120%;
      height: 30px;
    }
  }
`;

const Description = styled.h4`
  font-size: 1.6rem;
  line-height: 1.6;
  animation: ${fadeIn} 2.2s ease-out;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SeccionComponent = () => {
  return (
    <SectionContainer>
      <VideoBackground autoPlay loop muted>
        <source
          src="./assets/section1/video.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </VideoBackground>

      <MobileVideoBackground autoPlay loop muted>
        <source
          src="./assets/section1/videoMobile.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </MobileVideoBackground>

      <TextOverlay>
        <Title>
          <img src="/assets/img/parchingHomeWhite.png" alt="Parching Home" />
        </Title>
        <SubTitle>Socialize and discover</SubTitle>
        <Description>
          Parching App is a platform that connects people with shared interests
          through social events and outdoor activities.
        </Description>
      </TextOverlay>
    </SectionContainer>
  );
};

export default SeccionComponent;
