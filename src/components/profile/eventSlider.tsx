"use client"
import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Event {
  img: string;
  title: string;
}

const events: Event[] = [
  { img: '/img/arte.jpg', title: 'Arte y cultura' },
  { img: '/img/senderismo.jpg', title: 'Aventura' },
  { img: '/img/social.jpg', title: 'Eventos sociales' },
];

const CardContainer = styled.div`
  padding: 30px;
  margin: 20px;
`;

const StyledCard = styled(Card)`
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(1, 59, 88, 0.5), 0 6px 20px rgba(1, 59, 88, 0.3);
  transition: transform 0.3s, box-shadow 0.3s
  height: 200px;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 15px rgba(1, 59, 88, 0.6), 0 8px 30px rgba(1, 59, 88, 0.4);
  }
`;

const ArrowButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #013b58;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 30px;
  min-width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  
  &:hover {
    background-color: #005a6e;
  }
`;

const CustomArrowLeft = styled(ArrowButton)`
  left: 10px;
`;

const CustomArrowRight = styled(ArrowButton)`
  right: 10px;
`;

const EventSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomArrowRight>▶</CustomArrowRight>,
    prevArrow: <CustomArrowLeft>◀</CustomArrowLeft>,
  };

  return (
    <Slider {...settings} styled={{ position: 'relative' }}>
      {events.map((event, index) => (
        <CardContainer key={index}>
          <StyledCard>
            <CardMedia
              component="img"
              height="180"
              image={event.img}
              alt={event.title}
            />
            <CardContent>
              <Typography variant="body1" color="#000">
                {event.title}
              </Typography>
            </CardContent>
          </StyledCard>
        </CardContainer>
      ))}
    </Slider>
  );
};

export default EventSlider;