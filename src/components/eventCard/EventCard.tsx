import React from 'react';
import styled from 'styled-components';
import { Trash, Edit } from '@styled-icons/boxicons-regular';

// Paleta de colores
const colors = {
  secondary: "#D2DEEC",
  dark: "#3C4556",
  accent: "#78882D",
  white: "#ffffff",
};

// Tarjeta de evento
const EventCardComponent = styled.div`
  background: linear-gradient(135deg, ${colors.secondary} 0%, ${colors.white} 100%);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }
`;

// Imagen del evento
const EventImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

// Contenedor para íconos
const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  align-items: center;
`;

// Iconos estilizados
const StyledTrash = styled(Trash)`
  width: 24px;
  color: ${colors.dark};
  cursor: pointer;

  &:hover {
    color: ${colors.accent};
  }
`;

const StyledEdit = styled(Edit)`
  width: 24px;
  color: ${colors.dark};
  cursor: pointer;

  &:hover {
    color: ${colors.accent};
  }
`;

// Estilos para el texto
const EventName = styled.h3`
  font-size: 20px;
  color: ${colors.dark};
  margin: 10px 0;
`;

const EventCategory = styled.p`
  font-size: 16px;
  color: ${colors.dark};
  margin: 5px 0;
`;

const EventDate = styled.p`
  font-size: 14px;
  color: ${colors.dark};
`;

// Props para el componente
interface EventCardProps {
  imageSrc: string;
  name: string;
  category: string;
  date: string;
  onEdit: () => void;
  onDelete: () => void;
}

// Componente de tarjeta de evento
const EventCard: React.FC<EventCardProps> = ({ imageSrc, name, category, date, onEdit, onDelete }) => {
  return (
    <EventCardComponent>
      <EventImage src={imageSrc} alt="Event" />
      <EventName>{name}</EventName>
      <EventCategory>Category: {category}</EventCategory>
      <EventDate>Date: {date}</EventDate>
      <IconContainer>
        <StyledEdit onClick={onEdit} />
        <StyledTrash onClick={onDelete} />
      </IconContainer>
    </EventCardComponent>
  );
};

export default EventCard;