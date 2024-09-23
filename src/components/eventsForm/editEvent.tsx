import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IEventUpdate } from "@/services/models";
import { ApiServiceEvent } from "@/services/actions";

const getEvent = async (id: string) => {
  const apiServiceEvent = new ApiServiceEvent();
  return await apiServiceEvent.getEventById(id);
};

export const generateMetadata = async ({ params }: { params: any }) => {
  const { id } = params;
  const event = await getEvent(id);

  if (!event) {
    return {
      title: "Event not found",
      description: "The event you are looking for does not exist.",
    };
  }

  return {
    title: event.information.name || "Event Details",
    description: event.information.location || "Details about the event.",
  };
};

const EditEventPage = ({ params }: { params: any }) => {
  const { id } = params;
  const [formData, setFormData] = useState<IEventUpdate | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvent(id);
      if (event) {
        setEventId(event.id);
        setFormData({
          startDate: event.startDate || "",
          endDate: event.endDate || "",
          capacity: event.capacity || 1,
          location: event.information.location || "",
          state: event.state || "active",
        });
      }
      setLoading(false);
    };
    
    fetchEvent();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({
        ...formData,
        [name]: name === "capacity" ? parseInt(value, 10) : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData && eventId) {
      try {
        const apiServiceEvent = new ApiServiceEvent();
        await apiServiceEvent.updateEvent(eventId, formData);
        router.push("/events");
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Event</h2>
      {formData ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Start Date:</label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate.slice(0, 16)} // Asegúrate de que el formato sea correcto
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate.slice(0, 16)} // Asegúrate de que el formato sea correcto
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Capacity:</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleInputChange}
              min="1"
            />
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>State:</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <button type="submit">Update Event</button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EditEventPage;