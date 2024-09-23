'use client';

import React, { useState, useEffect } from "react";
import EventCard from "@/components/eventCard/EventCard";
import styled from "styled-components";
import NavBar from "@/components/common/navbar/navBar";
import Footer from "@/components/common/footer/footer";
import { IEvent, IEventID } from "@/services/models";
import { ApiServiceEvent, ApiServiceCategory } from "@/services/actions";

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
  const [selectedEvent, setSelectedEvent] = useState<IEventID | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any[]>([]);
  const apiServiceEvent = new ApiServiceEvent();
  const apiServiceCategory = new ApiServiceCategory();

  // Llamada a la API para obtener todos los eventos
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await apiServiceEvent.getAllEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Obtener evento y categorías por id
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (selectedEvent) {
        try {
          const eventData = await apiServiceEvent.getEventById(selectedEvent.id);
          setSelectedEvent(eventData);

          // Traer categorías
          const categoryIds =
            eventData.eventCategories?.map((ec: any) => ec.categoryId) || [];
          const categoryPromises = categoryIds.map((id) =>
            apiServiceCategory.getCategoryById(id)
          );
          const fetchedCategories = await Promise.all(categoryPromises);
          setCategories(fetchedCategories);
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      }
    };

    fetchEventDetails();
  }, [selectedEvent?.id]);

  const handleInfoClick = (event: IEventID) => {
    if (selectedEvent?.id !== event.id) {
      setSelectedEvent(event);
      localStorage.setItem("eventId", event.id);
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
              onInfo={() => handleInfoClick({
                id: event.id,
                createdAt: new Date(),
                updatedAt: new Date(),
                startDate: new Date(),
                endDate: new Date(),
                capacity: 0,
                location: "",
                information: {
                  name: "",
                  location: "",
                  email: "",
                },
                score: 0,
                state: "",
                hostId: "",
                guests: [],
                images: [],
                eventCategories: [],
              })} createdAt={new Date()} updatedAt={new Date()} id={""} location={""} hostId={""}            />
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
                        alt={`${selectedEvent.information.name} image ${
                          index + 1
                        }`}
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
                  "No start date"} to ${
                  new Date(selectedEvent?.endDate).toLocaleString() ||
                  "No end date"
                }`}
              </div>
              <div>
                <strong>Capacity:</strong> {selectedEvent?.capacity || "No capacity"}
              </div>
              <div>
                <strong>Categories:</strong>
                {categories.length > 0 ? (
                  <ul>
                    {categories.map((category) => (
                      <li key={category.id}>{category.name}</li>
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
