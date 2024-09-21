"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";
import EventCardProfile from "@/components/eventCard/EventCardProfile";
import NavBar from "@/components/common/navbar/navBar";
import Footer from "@/components/common/footer/footer";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

// Componente principal del perfil
const ProfilePage: React.FC = () => {
  const [showCreatedEvents, setShowCreatedEvents] = useState(true);

  /* Obtener estado de autenticación desde Redux */
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  let user = { name: "", avatar: "" };

  if (isAuth) {
    user = {
      name: localStorage.getItem("userName") || "",
      avatar: localStorage.getItem("userAvatar") || "",
    };
  }

  return (
    <>
      <NavBar />
      <ProfileContainer>
        <ProfileSection>
          <StyledAvatar
            alt={`${user.name} profile picture`}
            src={user.avatar ?? undefined}
            sx={{ width: 200, height: 200 }}
          />
          <Name>{user.name}</Name>
          <ButtonContainer>
            <CustomButton
              active={showCreatedEvents}
              onClick={() => setShowCreatedEvents(true)}
            >
              Created
            </CustomButton>
            <CustomButton
              active={!showCreatedEvents}
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
            {(showCreatedEvents ? createdEvents : participatingEvents).map(
              (event, index) => (
                <EventCardProfile
                  key={index}
                  imageSrc={event.imageSrc}
                  name={event.name}
                  category={event.category}
                  date={event.date}
                  onEdit={() => alert("Edit event")}
                  onDelete={() => alert("Delete event")}
                />
              )
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

// Contenedor principal del perfil
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 100px;
  background-color: ${colors.white};
  min-height: 100vh;
`;

// Sección del perfil
const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.secondary};
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
const CustomButton = styled.button<{ active: boolean }>`
  background-color: ${({ active }) =>
    active ? colors.accent : colors.primary};
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

// Datos de prueba para los eventos
const createdEvents = [
  {
    imageSrc: "https://via.placeholder.com/250",
    name: "Created Event 1",
    category: "Music",
    date: "2024-10-01",
  },
  {
    imageSrc: "https://via.placeholder.com/250",
    name: "Created Event 2",
    category: "Art",
    date: "2024-10-15",
  },
];

const participatingEvents = [
  {
    imageSrc: "https://via.placeholder.com/250",
    name: "Participating Event 1",
    category: "Sports",
    date: "2024-09-25",
  },
  {
    imageSrc: "https://via.placeholder.com/250",
    name: "Participating Event 2",
    category: "Technology",
    date: "2024-10-05",
  },
];

export default ProfilePage;
