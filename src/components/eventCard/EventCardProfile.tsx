import React from 'react';
import styled from 'styled-components';
import { IEvent } from '@/services/models'; // Asegúrate de importar la interfaz IEvent

// Paleta de colores
const colors = {
  secondary: "#D2DEEC",
  dark: "#3C4556",
  accent: "#165252",
  white: "#ffffff",
};

// Tarjeta de evento
const EventCardComponent = styled.div`
  background: linear-gradient(135deg, ${colors.accent} 0%, ${colors.white} 100%);
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
  justify-content: flex-end; // Alinea los íconos a la derecha
  margin-top: 10px;
  align-items: center;
  cursor: pointer;
`;

// Iconos estilizados
/* const StyledEdit = styled(Edit)`
  width: 24px;
  color: ${colors.dark};
  cursor: pointer;
  margin-left: 10px; // Añade un margen izquierdo para espaciar íconos

  &:hover {
    color: ${colors.accent};
  }
`; */

// Estilos para el texto
const EventName = styled.h3`
  font-size: 20px;
  color: ${colors.dark};
  margin: 10px 0;
  display: flex; // Cambiado a flex para alinear íconos y texto
  justify-content: space-between; // Espacio entre texto y íconos
  align-items: center; // Centra verticalmente el contenido
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
  event: IEvent; 
  icon?: React.ReactNode;
  onEdit?: () => void;
  onDetails?: () => void;
}

// Componente de tarjeta de evento
const EventCardProfile: React.FC<EventCardProps> = ({ event, icon }) => {
  return (
    <EventCardComponent>
      <EventImage src={event.images[0]?.image} alt="Event" /> {/* Muestra la primera imagen */}
      <EventName>
        {event.information.name}
        <IconContainer>
          {icon}
        </IconContainer>
      </EventName>
      <EventCategory>Category: {event.state}</EventCategory> {/* Puedes ajustar esto según tus necesidades */}
      <EventDate>Date: {new Date(event.startDate).toLocaleDateString()}</EventDate>
    </EventCardComponent>
  );
};

export default EventCardProfile;
