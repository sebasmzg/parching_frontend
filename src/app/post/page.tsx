"use client";

import React, { useState, useEffect } from "react";
import EventCard from "@/components/eventCard/EventCard";
import styled from "styled-components";
import NavBar from "@/components/common/navbar/navBar";
import Footer from "@/components/common/footer/footer";
import { IEvent } from "@/services/models"; // Asegúrate de que la ruta sea correcta
import { ApiServiceEvent } from "@/services/actions";

// Paleta de colores
const colors = {
  secondary: "#D2DEEC",
  dark: "#3C4556",
  accent: "#78882D",
  white: "#ffffff",
};

// Contenedor principal
const HomeContainer = styled.div`
  background-color: ${colors.white};
  padding: 20px;
  min-height: 100vh;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  box-sizing: border-box;
`;

// Contenedor de las tarjetas
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 80%;
  box-sizing: border-box;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PostPage: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]); // Estado para almacenar eventos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const apiServiceEvent = new ApiServiceEvent(); // Instancia del servicio de eventos

  // Llamada a la API para obtener eventos
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await apiServiceEvent.getAllEvents(); // Asegúrate de que esto devuelva el array directamente
        console.log(events);
        
        setEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Cargando eventos...</div>;
  }

  return (
    <>
      <NavBar />
      <HomeContainer>
        <h1 style={{ color: colors.dark }}>Upcoming Events</h1>
        <CardContainer>
          {events.map((event) => (
            <EventCard
              key={event.id}
              images={event.images} // Asegúrate de que EventCard acepte esta propiedad
              information={{
                name: event.information.name, // Ajusta según la propiedad correcta
                location: event.information.location,
                email: event.information.email, // Verifica si este campo existe
              }} // Asegúrate de que EventCard acepte esta propiedad
              capacity={event.capacity}
              score={event.score}
              state={event.state}
              startDate={event.startDate}
              endDate={event.endDate}
              eventCategories={event.eventCategories}
              onJoin={() => alert(`Joined ${event.information.name}`)} // Ajusta si es necesario
            />
          ))}
        </CardContainer>
      </HomeContainer>
      <Footer />
    </>
  );
};

export default PostPage;
