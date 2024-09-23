"use client";

import React, { useEffect, useState } from "react";
import { ApiServiceEvent, ApiServiceCategory, ApiService } from "../actions"; // Asegúrate de tener estas importaciones definidas correctamente
import { IEvent } from "../models"; // Modelo del evento
import { IEventUpdate } from "../models/IEventUpdate"; // Modelo de actualización del evento
import { useRouter } from "next/navigation";

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    color: "black",
  },
  header: {
    marginBottom: "20px",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
  },
  eventInfo: {
    margin: "10px 0",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#165252",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  form: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

const EventDetails: React.FC = () => {
  const [events, setEvents] = useState<IEvent[]>([]); // Lista de eventos
  const [eventId, setEventId] = useState<string | null>(null); // ID del evento seleccionado
  const [event, setEvent] = useState<IEvent | null>(null); // Evento actual
  const [categories, setCategories] = useState<any[]>([]); // Categorías del evento
  const [isEditing, setIsEditing] = useState<boolean>(false); // Estado de edición
  const [formData, setFormData] = useState<IEventUpdate | null>(null); // Datos del formulario
  const [hostName, setHostName] = useState<string | null>(null); // Nombre del host

  const apiServiceEvent = new ApiServiceEvent();
  const apiServiceCategory = new ApiServiceCategory();
  const apiService = new ApiService();
  const router = useRouter();

  // Efecto para obtener todos los eventos
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await apiServiceEvent.getAllEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  // Efecto para obtener un evento por su ID
  useEffect(() => {
    const fetchEventById = async () => {
      if (eventId) {
        try {
          const eventData = await apiServiceEvent.getEventById(eventId);
          const defaultEventData: IEventUpdate = {
            startDate: eventData.startDate || "",
            endDate: eventData.endDate || "",
            capacity: eventData.capacity || 1,
            location: eventData.location || "",
            state: eventData.state || "active",
          };

          setEvent(eventData);
          setFormData(defaultEventData);

          // Obtener categorías relacionadas
          const categoryIds = eventData.eventCategories?.map((ec: any) => ec.categoryId) || [];
          const categoryPromises = categoryIds.map((id) => apiServiceCategory.getCategoryById(id));
          const fetchedCategories = await Promise.all(categoryPromises);
          setCategories(fetchedCategories);

          // Obtener nombre del host
          const hostName = await apiService.getUserById(eventData.hostId);
          setHostName(hostName.name);
        } catch (error) {
          console.error("Error fetching event by ID:", error);
        }
      }
    };
    fetchEventById();
  }, [eventId]);

  // Manejador del cambio de input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Formatear la fecha en formato ISO
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Formato "yyyy-MM-ddThh:mm"
  };

  // Enviar el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && eventId) {
      try {
        const { startDate, endDate, capacity, location, state } = formData;
        const validatedCapacity = Math.max(1, Math.floor(capacity)); // Valida que la capacidad sea al menos 1
        const updatedData: IEventUpdate = {
          startDate,
          endDate,
          capacity: validatedCapacity,
          location,
          state: state || "active",
        };

        const updatedEvent = await apiServiceEvent.updateEvent(eventId, updatedData);
        setEvent(updatedEvent);
        setIsEditing(false);
        console.log("Event updated:", updatedEvent);
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
  };

  const handleEdit = () => {
    console.log("to edit event:");
    localStorage.setItem("eventToEdit", JSON.stringify(event));
    router.push(`/events/edit/${event?.id}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>List of Events</h2>
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul style={styles.list}>
          {events.map((event) => (
            <li key={event.id} style={styles.listItem}>
              <div style={styles.eventInfo}>
                <strong>Name:</strong> {event.information.name}
              </div>
              <div style={styles.eventInfo}>
                <strong>Location:</strong> {event.information.location}
              </div>
              <div style={styles.eventInfo}>
                <strong>Date:</strong> {`${event.startDate} to ${event.endDate}`}
              </div>
              <div style={styles.eventInfo}>
                <strong>Host:</strong> {hostName}
              </div>
              <button
                style={styles.button}
                onClick={() => {
                  setEventId(event.id);
                  setIsEditing(false);
                }}
              >
                Get Event By ID
              </button>
            </li>
          ))}
        </ul>
      )}

      {event && !isEditing && (
        <div style={styles.eventInfo}>
          <h3 style={styles.header}>Selected Event</h3>
          <div>
            <strong>Name:</strong> {event.information.name}
          </div>
          <div>
            <strong>Location:</strong> {event.information.location}
          </div>
          <div>
            <strong>Date:</strong> {`${event.startDate} to ${event.endDate}`}
          </div>
          <div>
            <strong>Capacity:</strong> {event.capacity}
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
          <button onClick={handleEdit}>Edit Event</button>
        </div>
      )}

      {isEditing && (
        <div style={styles.form}>
          <h3>Edit Event</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Start Date:</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData?.startDate || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData?.endDate || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Capacity:</label>
              <input
                type="number"
                name="capacity"
                value={formData?.capacity || ""}
                onChange={handleInputChange}
                min="1"
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData?.location || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>State:</label>
              <select name="state" value={formData?.state || ""} onChange={handleInputChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button type="submit" style={styles.button}>
              Update Event
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventDetails;