"use client";

import React, { useState, useEffect } from "react";
import EventCard from "@/components/eventCard/EventCard";
import styled from "styled-components";
import NavBar from "@/components/common/navbar/navBar";
import Footer from "@/components/common/footer/footer";
import { IEvent, IEventID } from "@/services/models";
import { ApiServiceEvent, ApiServiceCategory } from "@/services/actions";
import CategoryButton from "@/components/categories/buttons";
import { Dialog, Button, Typography } from "@mui/material";

// Paleta de colores
const colors = {
  secondary: "#D2DEEC",
  dark: "#3C4556",
  accent: "#78882D",
  buttonColor: "#013b58", // Color del botón
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

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;

  h1 {
    font-size: 4rem;
    color: #013b58;
  }
  p {
    font-size: 1.5rem;
    color: #013b58;
  }
`;

// Contenedor de las tarjetas
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 80%;
  box-sizing: border-box;
  margin: 3rem auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Estilo del contenido del diálogo
const DialogContent = styled.div`
  display: flex;
  padding: 0;
  background-color: ${colors.secondary};
  color: ${colors.dark};
  border-radius: 8px;
  overflow: hidden; // Asegura que la imagen y el contenido no desborden

  .event-image {
    flex: 1; /* Toma la mitad del ancho */
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .event-details {
    flex: 1;
    padding: 20px;

    h2 {
      margin: 0 0 10px;
      font-family: "Belleza", sans-serif; /* Usar tipografía Belleza */
    }

    .join-button {
      margin-top: 20px;
      background-color: ${colors.buttonColor};
      color: ${colors.white};
      font-weight: bold;
      font-family: "Belleza", sans-serif; /* Usar tipografía Belleza */
      &:hover {
        background-color: ${colors.dark};
      }
    }

    // Estilo de texto
    p {
      font-family: "Belleza", sans-serif; /* Usar tipografía Belleza */
    }
  }
`;

const PostPage: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEventID | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false); // Estado para el modal

  const apiServiceEvent = new ApiServiceEvent();
  const apiServiceCategory = new ApiServiceCategory();

  // Llamada a la API para obtener todos los eventos y las categorías
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, categoriesData] = await Promise.all([
          apiServiceEvent.getAllEvents(),
          apiServiceCategory.getAllCategories(),
        ]);
        setEvents(eventsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Manejar el clic en un botón de categoría
  const handleCategoryClick = async (categoryId: string) => {
    setActiveCategory(categoryId);

    try {
      const filteredEvents = await apiServiceEvent.getEventsByCategory(
        categoryId
      );
      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching filtered events:", error);
    }
  };

  // Manejar el clic para mostrar todos los eventos (sin filtros)
  const handleShowAll = async () => {
    setActiveCategory(null);

    try {
      const allEvents = await apiServiceEvent.getAllEvents();
      setEvents(allEvents);
    } catch (error) {
      console.error("Error fetching all events:", error);
    }
  };

  // Manejar el clic para mostrar detalles en el modal
  const handleInfoClick = async (event: IEventID) => {
    if (selectedEvent?.id !== event.id) {
      setSelectedEvent(event);
      localStorage.setItem("eventId", event.id);

      try {
        const eventData = await apiServiceEvent.getEventById(event.id);
        setSelectedEvent(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    }
    setModalOpen(true); // Abrir el modal
  };

  const handleJoin = () => {
    const userId = localStorage.getItem("userId");
    const eventId = localStorage.getItem("eventId");
    if (userId && eventId) {
      apiServiceEvent
        .suscribeEvent(eventId, userId)
        .then(() => {
          console.log("Successfully joined the event");
        })
        .catch((error) => {
          console.error("Error joining event:", error);
        });
    } else {
      console.error("User ID or Event ID is missing");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Cerrar el modal
    setSelectedEvent(null); // Restablecer el evento seleccionado
  };

  if (loading) {
    return <div>Cargando eventos...</div>;
  }

  return (
    <>
      <NavBar />
      <HomeContainer>
        <HeaderContainer>
          <h1>Events</h1>
          <p>find and join</p>
        </HeaderContainer>

        {/* Botones de filtro por categoría */}
        <div>
          <CategoryButton
            category={{ id: "", name: "Show All Events" }}
            onClick={handleShowAll}
            isActive={activeCategory === null}
          />
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              onClick={handleCategoryClick}
              isActive={activeCategory === category.id}
            />
          ))}
        </div>

        <CardContainer>
          {events.length === 0 ? (
            <div>No events found.</div>
          ) : (
            events.map((event) => (
              <EventCard
                key={event.id}
                images={event.images}
                information={{
                  name: event.information.name || "No Name",
                  location: event.information.location || "No Location",
                  email: event.information.email || "No Email",
                }}
                capacity={event.capacity || 0}
                score={event.score}
                state={event.state}
                startDate={event.startDate}
                endDate={event.endDate}
                onInfo={() => handleInfoClick(event)}
              />
            ))
          )}
        </CardContainer>

        {/* Diálogo para detalles del evento */}
        <Dialog
          open={modalOpen}
          onClose={handleCloseModal}
          maxWidth="md"
          fullWidth
        >
          <DialogContent>
            {selectedEvent && (
              <>
                <div className="event-image">
                  {selectedEvent.images && selectedEvent.images.length > 0 ? (
                    <img
                      src={selectedEvent.images[0].image}
                      alt={selectedEvent.information.name}
                    />
                  ) : (
                    <span>No image available for this event.</span>
                  )}
                </div>
                <div className="event-details">
                  <Typography variant="h6" component="h2">
                    {selectedEvent.information.name || "No Name"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Location:</strong>{" "}
                    {selectedEvent.information.location || "No Location"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Date:</strong>{" "}
                    {`${new Date(
                      selectedEvent.startDate
                    ).toLocaleString()} to ${new Date(
                      selectedEvent.endDate
                    ).toLocaleString()}`}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Capacity:</strong>{" "}
                    {selectedEvent.capacity || "No Capacity"}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong>{" "}
                    {selectedEvent.information.email || "No Email"}
                  </Typography>
                  <Button
                    className="join-button"
                    variant="contained"
                    onClick={handleJoin}
                  >
                    Join
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </HomeContainer>
      <Footer />
    </>
  );
};

export default PostPage;
