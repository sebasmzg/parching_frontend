"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import NavBar from "@/components/common/navbar/navBar";
import Footer from "@/components/common/footer/footer";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ApiServiceEvent } from "@/services/actions"; 
import { IEvent } from "@/services/models"; 
import EventCardProfileHost from "@/components/eventCard/EventCardProfileHost"; 
import EventCardProfileGuest from "@/components/eventCard/EventCardProfileGuest"; 

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
        console.log("userid: ", userId, "role: ", role);
        
        console.log("Fetched events:", fetchedEvents);
        
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
              ? "Events created by you"
              : "Events you have joined"}
          </EventsTitle>
          <EventsGrid>
            {events.length > 0 ? (
              events.map((event, index) => (
                showCreatedEvents ? (
                  <EventCardProfileHost 
                    key={index} 
                    event={event} 
                  />
                ) : (
                  <EventCardProfileGuest 
                    key={index} 
                    event={event} 
                  />
                )
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
  primary: "#013b58",
  secondary: "#D2DEEC",
  accent: "#165252",
  dark: "#3C4556",
  white: "#ffffff",
};

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
  margin: 20px 0;
`;

// Avatar estilizado
const StyledAvatar = styled(Avatar)`
  margin-bottom: 20px;
`;

// Nombre del usuario
const Name = styled.h1`
  color: ${colors.primary};
  font-size: 2.5rem;
`;

// Contenedor de botones
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  margin-top: 2rem;
`;

// Botón estilizado
const CustomButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.accent};
  }
`;

// Título de eventos
const EventsTitle = styled.h2`
  color: ${colors.primary};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

// Cuadrícula de eventos
const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
`;

// Mensaje cuando no hay eventos
const NoEventsMessage = styled.p`
  color: ${colors.dark};
  text-align: center;
`;

export default ProfilePage;