"use client";

import React, { useEffect, useState } from "react";
import { ApiServiceEvent, ApiServiceCategory, ApiService } from "../actions";
import { IEvent } from "../models";

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
  const [events, setEvents] = useState<IEvent[]>([]);
  const [eventId, setEventId] = useState<string | null>(null);
  const [event, setEvent] = useState<IEvent | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<IEvent | null>(null);
  const [hostName, setHostName] = useState<string | null>(null);

  const apiServiceEvent = new ApiServiceEvent();
  const apiServiceCategory = new ApiServiceCategory();
  const apiService = new ApiService();

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

  useEffect(() => {
    const fetchEventById = async () => {
      if (eventId) {
        try {
          const eventData = await apiServiceEvent.getEventById(eventId);
          setEvent(eventData);
          setFormData(eventData);

          // Cargar categorías
          const categoryIds = eventData.eventCategories.map((ec: any) => ec.categoryId);
          const categoryPromises = categoryIds.map((id) => apiServiceCategory.getCategoryById(id));
          const fetchedCategories = await Promise.all(categoryPromises);
          setCategories(fetchedCategories);

          // Obtener nombre del host
          const hostName = await apiService.getUserById(eventData.hostId);
          console.log("hostName", hostName);
            setHostName(hostName.name);
        } catch (error) {
          console.error("Error fetching event by ID:", error);
        }
      }
    };

    fetchEventById();
  }, [eventId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && eventId) {
      try {
        const { information, location, startDate, endDate, capacity } = formData;

        const updatedData = {
          information: {
            name: information.name,
          },
          location,
          startDate,
          endDate,
          capacity: capacity > 0 ? capacity : undefined,
          images: Array.isArray(formData.images) ? formData.images.map(image => String(image)) : [],
        };

        const cleanedData = Object.fromEntries(
          Object.entries(updatedData).filter(([key]) => {
            return !["createdAt", "updatedAt", "id", "score", "hostId", "eventCategories"].includes(key);
          })
        );

        const updatedEvent = await apiServiceEvent.updateEvent(eventId, cleanedData);
        setEvent(updatedEvent);
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
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
                <strong>Location:</strong> {event.location}
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
          <p>
            <strong>Name:</strong> {event.information.name}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Date:</strong> {`${event.startDate} to ${event.endDate}`}
          </p>
          <p>
            <strong>Capacity:</strong> {event.capacity}
          </p>
          <p>
            <strong>Categories:</strong>
            {categories.length > 0 ? (
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            ) : (
              <p>No categories found for this event.</p>
            )}
          </p>
          <button style={styles.button} onClick={() => setIsEditing(true)}>
            Edit Event
          </button>
        </div>
      )}

      {isEditing && formData && (
        <form style={styles.form} onSubmit={handleSubmit}>
          <h3>Edit Event</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.information.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="datetime-local"
              name="startDate"
              value={new Date(formData.startDate).toISOString().slice(0, 16)}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="datetime-local"
              name="endDate"
              value={new Date(formData.endDate).toISOString().slice(0, 16)}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Capacity:</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Update Event</button>
          <button type="button" style={styles.button} onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default EventDetails;
