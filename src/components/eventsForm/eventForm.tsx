"use client";

import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Button as MuiButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Snackbar,
  Alert,
  SelectChangeEvent,
} from "@mui/material";
import styled from "styled-components";
import { ApiServiceCategory, ApiServiceEvent } from "@/services/actions";
import { IEventCreation } from "@/services/models";
import { useRouter } from "next/navigation";

const CreateEventForm: React.FC = () => {
  const apiServiceCategory = new ApiServiceCategory();
  const apiService = new ApiServiceEvent();
  const router = useRouter();

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [eventData, setEventData] = useState<IEventCreation>({
    startDate: new Date(),
    endDate: new Date(),
    capacity: 1,
    location: "",
    information: {
      name: "",
      email: "",
      location: "",
    },
    categories: [],
    isAdmin: true,
    host: localStorage.getItem("userId") || "",
    images: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await apiServiceCategory.getAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        setError("Error fetching categories");
        console.error(error);
      }
    };

    fetchCategories();
  }, [apiServiceCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as string[];
    setSelectedCategories(value);
    setEventData((prevState) => ({
      ...prevState,
      categories: value,
    }));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      setEventData((prevState) => ({
        ...prevState,
        images: [url],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await apiService.createEvent(eventData);
      setSuccess(true);
      setTimeout(() => {
        router.push("/post");
      }, 2000);
    } catch (err) {
      setError("Error creating event");
      console.error("Error creating event:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Typography variant="h4" align="center" gutterBottom>
          Create New Event
        </Typography>

        {error && (
          <Snackbar open={!!error} autoHideDuration={6000}>
            <Alert severity="error">{error}</Alert>
          </Snackbar>
        )}

        {success && (
          <Snackbar open={success} autoHideDuration={6000}>
            <Alert severity="success">Event created successfully!</Alert>
          </Snackbar>
        )}

        <StyledForm onSubmit={handleSubmit}>
          <FormGroup>
            <TextField
              label="Start Date"
              name="startDate"
              type="datetime-local"
              fullWidth
              value={eventData.startDate.toISOString().slice(0, 16)}
              onChange={(e) =>
                setEventData({ ...eventData, startDate: new Date(e.target.value) })
              }
            />
          </FormGroup>

          <FormGroup>
            <TextField
              label="End Date"
              name="endDate"
              type="datetime-local"
              fullWidth
              value={eventData.endDate.toISOString().slice(0, 16)}
              onChange={(e) =>
                setEventData({ ...eventData, endDate: new Date(e.target.value) })
              }
            />
          </FormGroup>

          <FormGroup>
            <TextField
              label="Capacity"
              name="capacity"
              type="number"
              fullWidth
              value={eventData.capacity}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 1) {
                  setEventData({ ...eventData, capacity: value });
                }
              }}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </FormGroup>

          <FormGroup>
            <TextField
              label="Location"
              name="location"
              fullWidth
              value={eventData.location}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <TextField
              label="Information Name"
              name="informationName"
              fullWidth
              value={eventData.information.name}
              onChange={(e) =>
                setEventData({
                  ...eventData,
                  information: { ...eventData.information, name: e.target.value },
                })
              }
            />
          </FormGroup>

          <FormGroup>
            <TextField
              label="Information Email"
              name="informationEmail"
              fullWidth
              value={eventData.information.email}
              onChange={(e) =>
                setEventData({
                  ...eventData,
                  information: { ...eventData.information, email: e.target.value },
                })
              }
            />
          </FormGroup>

          <FormGroup>
            <TextField
              label="Information Location"
              name="informationLocation"
              fullWidth
              value={eventData.information.location}
              onChange={(e) =>
                setEventData({
                  ...eventData,
                  information: { ...eventData.information, location: e.target.value },
                })
              }
            />
          </FormGroup>

          <FormGroup>
            <FormControl fullWidth>
              <InputLabel>Categories</InputLabel>
              <Select
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                input={<OutlinedInput label="Categories" />}
                renderValue={(selected) =>
                  selected
                    .map((id) => categories.find((cat) => cat.id === id)?.name)
                    .join(", ")
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    <Checkbox checked={selectedCategories.indexOf(category.id) > -1} />
                    <ListItemText primary={category.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormGroup>

          <FormGroup>
            <TextField
              label="Image URL"
              fullWidth
              onChange={handleImageUrlChange}
              placeholder="Enter image URL"
            />
          </FormGroup>

          <StyledButton type="submit" disabled={loading}>
            {loading ? "Creating Event..." : "Create Event"}
          </StyledButton>
        </StyledForm>
      </FormContainer>
    </Container>
  );
};

// Estilos

const Container = styled.div`
  padding-top: 8rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  background-color: #f0f4f8;
`;

const FormContainer = styled.div`
  max-width: 800px;
  width: 100%;
  padding: 30px;
  background: #ffffff; /* Fondo blanco para el formulario */
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: fit-content;
  transition: transform 0.3s ease; /* Suave transición */
  &:hover {
    transform: scale(1.02); /* Efecto de hover */
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const StyledButton = styled(MuiButton)`
  background-color: #007acc; /* Color del botón */
  color: white;
  font-weight: bold; /* Texto en negrita */
  padding: 10px 20px; /* Espaciado en el botón */
  border-radius: 8px; /* Bordes redondeados */
  transition: background-color 0.3s ease; /* Transición de color */
  &:hover {
    background-color: #005f99; /* Color al pasar el ratón */
  }
`;

export default CreateEventForm;
