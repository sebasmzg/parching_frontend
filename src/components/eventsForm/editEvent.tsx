import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IEventUpdate } from "@/services/models";
import { ApiServiceEvent } from "@/services/actions";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh; 
  background-color: #013b58;
`;

const ImageContainer = styled.div<{ imageUrl: string }>`
  flex: 1; 
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
`;

const FormContainer = styled.div`
  flex: 1; 
  padding: 20px;
  background: linear-gradient(135deg, #013b58 0%, #165252 50%, #fff 100%);
  display: flex;
  flex-direction: column;
  justify-content: center; 
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #ffffff;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.2s;
  color: #013b58;

  &:focus {
    border-color: #ffffff;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.2s;
  color: #013b58;
  &:focus {
    border-color: #ffffff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  color: #013b58;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #013b58; 
    color: #ffffff;
  }
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #ffffff;
`;

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
  const [imageUrl, setImageUrl] = useState<string>(""); // Nueva variable para almacenar la URL de la imagen
  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEvent(id);
      if (event) {
        setEventId(event.id);
        setImageUrl(event.images[0].image);
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
        router.push("/profile");
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
  };

  if (loading) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <ImageContainer imageUrl={imageUrl} /> {/* Pasamos la URL de la imagen */}
      <FormContainer>
        <Title>Edit Event</Title>
        {formData ? (
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Start Date:</Label>
              <Input
                type="datetime-local"
                name="startDate"
                value={new Date(formData.startDate).toISOString().slice(0, 16)} // Asegúrate de que el formato sea correcto
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>End Date:</Label>
              <Input
                type="datetime-local"
                name="endDate"
                value={new Date(formData.endDate).toISOString().slice(0, 16)} // Asegúrate de que el formato sea correcto
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Capacity:</Label>
              <Input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                min="1"
              />
            </FormGroup>
            <FormGroup>
              <Label>Location:</Label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>State:</Label>
              <Select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </FormGroup>
            <Button type="submit">Update Event</Button>
          </form>
        ) : (
          <Loading>Loading...</Loading>
        )}
      </FormContainer>
    </Container>
  );
};

export default EditEventPage;
