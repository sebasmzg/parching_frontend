"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import NavBar from "@/components/common/navbar/navBar";
import Footer from "@/components/common/footer/footer";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ApiServiceEvent } from "@/services/actions"; // Importa la función para obtener eventos
import { IEvent } from "@/services/models"; // Asegúrate de importar tu tipo IEvent

const ProfilePage: React.FC = () => {
  const [showCreatedEvents, setShowCreatedEvents] = useState(true);
  const [events, setEvents] = useState<IEvent[]>([]);
  
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const apiServicesEvent = new ApiServiceEvent();

  let userId = "";
  if (isAuth) {
    userId = localStorage.getItem("userId") || "";
  }

  useEffect(() => {
    const fetchEvents = async () => {
      const role = showCreatedEvents ? "host" : "guest";
      try {
        const fetchedEvents = await apiServicesEvent.getEventsByUser(userId, role);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (userId) {
      fetchEvents();
    }
  }, [showCreatedEvents, userId]);

  return (
    <>
      <NavBar />
      <ProfileContainer>
        <ProfileSection>
          <StyledAvatar
            alt="Profile picture"
            src={localStorage.getItem("userAvatar") || ""}
            sx={{ width: 200, height: 200 }}
          />
          <Name>{localStorage.getItem("userName") || "User"}</Name>
          <ButtonContainer>
            <CustomButton
              style={{ backgroundColor: showCreatedEvents ? colors.accent : colors.primary }}
              onClick={() => setShowCreatedEvents(true)}
            >
              Created
            </CustomButton>
            <CustomButton
              style={{ backgroundColor: !showCreatedEvents ? colors.accent : colors.primary }}
              onClick={() => setShowCreatedEvents(false)}
            >
              Joined
            </CustomButton>
          </ButtonContainer>
        </ProfileSection>

        <ProfileSection>
          <EventsTitle>
            {showCreatedEvents
              ? "Eventos Creados"
              : "Eventos en los que Participas"}
          </EventsTitle>
          <EventsGrid>
            {events.length > 0 ? (
              events.map((event, index) => (
                <EventCard key={index}>
                  <EventImage src={event.images[0]} alt={event.information.name} />
                  <EventName>{event.information.name}</EventName>
                  <EventDate>{event.startDate}</EventDate>
                </EventCard>
              ))
            ) : (
              <NoEventsMessage>No hay eventos disponibles.</NoEventsMessage>
            )}
          </EventsGrid>
        </ProfileSection>
      </ProfileContainer>
      <Footer />
    </>
  );
};

// Paleta de colores
const colors = {
  primary: "#165252",
  secondary: "#D2DEEC",
  accent: "#78882D",
  dark: "#3C4556",
  white: "#ffffff",
};

// Estilos de la sección de eventos
const EventCard = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  text-align: center;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const EventName = styled.h3`
  font-size: 1.2rem;
  color: ${colors.primary};
`;

const EventCategory = styled.p`
  font-size: 0.9rem;
  color: ${colors.dark};
`;

const EventDate = styled.p`
  font-size: 0.9rem;
  color: ${colors.secondary};
`;

const NoEventsMessage = styled.p`
  font-size: 1rem;
  color: ${colors.dark};
  text-align: center;
  padding: 20px;
`;

// Contenedor principal del perfil
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 100px;
  background-color: ${colors.white};
  min-height: 100vh;
`;

// Sección del perfil
const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(210, 222, 236, 0.1);
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px;
  margin-bottom: 20px;
`;

// Avatar estilizado
const StyledAvatar = styled(Avatar)`
  width: 150px;
  height: 150px;
  margin-top: 50px;
`;

// Nombre y nombre de usuario estilizados
const Name = styled.h1`
  font-size: 28px;
  color: ${colors.primary};
  margin: 10px 0;
`;

// Contenedor de botones
const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

// Botón personalizado
const CustomButton = styled.button`
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.accent};
  }
`;

// Título de eventos
const EventsTitle = styled.h2`
  font-size: 1.5rem;
  color: ${colors.primary};
  margin-bottom: 10px;
  font-weight: bold;
`;

// Contenedor de tarjetas de eventos
const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
`;

export default ProfilePage;
