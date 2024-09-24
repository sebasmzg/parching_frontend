'use client';

import React, { useState, useEffect } from "react";
import EventCard from "@/components/eventCard/EventCard";
import styled from "styled-components";
import NavBar from "@/components/common/navbar/navBar";
import Footer from "@/components/common/footer/footer";
import { IEvent, IEventID } from "@/services/models";
import { ApiServiceEvent, ApiServiceCategory } from "@/services/actions";
import CategoryButton from "@/components/categories/buttons";

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
  const [events, setEvents] = useState<IEvent[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<IEventID | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // Estado para la categoría activa
  const apiServiceEvent = new ApiServiceEvent();
  const apiServiceCategory = new ApiServiceCategory();

  // Llamada a la API para obtener todos los eventos y las categorías
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, categoriesData] = await Promise.all([
          apiServiceEvent.getAllEvents(),
          apiServiceCategory.getAllCategories(), // Obtener todas las categorías
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
    setActiveCategory(categoryId); // Actualiza la categoría activa

    try {
      const filteredEvents = await apiServiceEvent.getEventsByCategory(categoryId);
      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching filtered events:", error);
    }
  };

  // Manejar el clic para mostrar todos los eventos (sin filtros)
  const handleShowAll = async () => {
    setActiveCategory(null); // Restablecer la categoría activa al mostrar todos los eventos

    try {
      const allEvents = await apiServiceEvent.getAllEvents();
      setEvents(allEvents);
    } catch (error) {
      console.error("Error fetching all events:", error);
    }
  };

  // Obtener evento por id
  const handleInfoClick = async (event: IEventID) => {
    if (selectedEvent?.id !== event.id) {
      setSelectedEvent(event);
      localStorage.setItem("eventId", event.id);

      // Fetch event details if necessary
      try {
        const eventData = await apiServiceEvent.getEventById(event.id);
        setSelectedEvent(eventData);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    }
  };

  const handleJoin = () => {
    const userId = localStorage.getItem("userId");
    const eventId = localStorage.getItem("eventId");
    if (userId && eventId) {
      apiServiceEvent.suscribeEvent(eventId, userId)
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

  if (loading) {
    return <div>Cargando eventos...</div>;
  }

  return (
    <>
      <NavBar />
      <HomeContainer>
        <h1 style={{ color: colors.dark }}>Upcoming Events</h1>

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
          {events.map((event) => (
            <EventCard
              key={event.id}
              images={event.images}
              information={{
                name: event.information.name,
                location: event.information.location,
                email: event.information.email,
              }}
              capacity={event.capacity}
              score={event.score}
              state={event.state}
              startDate={event.startDate}
              endDate={event.endDate}
              onInfo={() => handleInfoClick(event)}
              createdAt={new Date()}
              updatedAt={new Date()}
              id={""}
              location={""}
              hostId={""}
            />
          ))}
          {selectedEvent && (
            <div>
              <h3>Selected Event</h3>
              <div>
                <strong>Images:</strong>
                {selectedEvent?.images && selectedEvent.images.length > 0 ? (
                  <div>
                    {selectedEvent.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.image}
                        alt={`${selectedEvent.information.name} image ${index + 1}`}
                        style={{
                          width: "100px",
                          height: "100px",
                          margin: "5px",
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <span>No images available for this event.</span>
                )}
              </div>
              <div>
                <strong>Name:</strong>{" "}
                {selectedEvent?.information?.name || "No Name"}
              </div>
              <div>
                <strong>Location:</strong>{" "}
                {selectedEvent?.information?.location || "No Location"}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {`${new Date(selectedEvent?.startDate).toLocaleString() ||
                  "No start date"} to ${new Date(selectedEvent?.endDate).toLocaleString() ||
                  "No end date"}`}
              </div>
              <div>
                <strong>Capacity:</strong> {selectedEvent?.capacity || "No capacity"}
              </div>
              <div>
                <strong>Categories:</strong>
                {selectedEvent?.eventCategories && selectedEvent.eventCategories.length > 0 ? (
                  <ul>
                    {selectedEvent.eventCategories.map((ec) => (
                      <li key={ec.categoryId}>{categories.find(c => c.id === ec.categoryId)?.name}</li>
                    ))}
                  </ul>
                ) : (
                  <span>No categories found for this event.</span>
                )}
              </div>
              <button onClick={handleJoin}>Join Event</button>
            </div>
          )}
        </CardContainer>
      </HomeContainer>
      <Footer />
    </>
  );
};

export default PostPage;