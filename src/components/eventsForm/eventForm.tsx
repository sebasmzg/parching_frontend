"use client";

import React, { useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Snackbar,
  Alert,
} from "@mui/material";
import { ApiServiceCategory, ApiServiceEvent } from "@/services/actions";
import styled from "styled-components";
import { IEventCreation } from "@/services/models";
import { useRouter } from "next/navigation";

const CreateEventForm: React.FC = () => {
  const apiServiceCategory = new ApiServiceCategory();
  const apiService = new ApiServiceEvent();
  const router = useRouter();

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [eventData, setEventData] = useState<IEventCreation>({
    startDate: new Date(),
    endDate: new Date(),
    capacity: 1, // Inicializar con 1
    location: "",
    information: {
      name: "",
      email: "",
      location: "",
    },
    categories: [],
    isAdmin: false,
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
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string[];
    setSelectedCategories(value);
    setEventData((prevState) => ({
      ...prevState,
      categories: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setEventData((prevState) => ({
      ...prevState,
      images: files.map((file) => URL.createObjectURL(file)), // Guardar URLs de las imágenes
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const event = await apiService.createEvent(eventData);
      console.log("Event created:", event);
      setSuccess(true);
      setTimeout(() => {
        router.push("/post");
      }, 2000);
    } catch (err) {
      setError("Error creating event");
      console.log("event data: ", eventData);
      console.error("Error creating event:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContainer>
      <StyledForm onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          Create New Event
        </Typography>

        {error && (
          <Snackbar open={!!error} autoHideDuration={6000}>
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          </Snackbar>
        )}

        {success && (
          <Snackbar open={success} autoHideDuration={6000}>
            <Alert severity="success" sx={{ width: "100%" }}>
              Event created successfully!
            </Alert>
          </Snackbar>
        )}

        <TextField
          label="Start Date"
          name="startDate"
          type="datetime-local"
          fullWidth
          value={eventData.startDate.toISOString().slice(0, 16)}
          onChange={(e) =>
            setEventData({
              ...eventData,
              startDate: new Date(e.target.value),
            })
          }
        />

        <TextField
          label="End Date"
          name="endDate"
          type="datetime-local"
          fullWidth
          value={eventData.endDate.toISOString().slice(0, 16)}
          onChange={(e) =>
            setEventData({
              ...eventData,
              endDate: new Date(e.target.value),
            })
          }
        />

        <TextField
          label="Capacity"
          name="capacity"
          type="number"
          fullWidth
          value={eventData.capacity}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 1) {
              setEventData((prevState) => ({
                ...prevState,
                capacity: value,
              }));
            }
          }}
          InputProps={{ inputProps: { min: 1 } }} // Permitir solo valores mayores a 0
        />

        <TextField
          label="Location"
          name="location"
          fullWidth
          value={eventData.location}
          onChange={handleChange}
        />

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

        <TextField
          label="Information Location"
          name="informationLocation"
          fullWidth
          value={eventData.information.location}
          onChange={(e) =>
            setEventData({
              ...eventData,
              information: {
                ...eventData.information,
                location: e.target.value,
              },
            })
          }
        />

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
                <Checkbox
                  checked={selectedCategories.indexOf(category.id) > -1}
                />
                <ListItemText primary={category.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />

        <StyledButton type="submit" disabled={loading}>
          {loading ? "Creating Event..." : "Create Event"}
        </StyledButton>
      </StyledForm>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0 20px;
  background-color: white;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 500px;
`;

const StyledButton = styled(Button)`
  background-color: var(--blue);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 20px;

  &:hover {
    background-color: var(--blueSoft);
  }
`;

export default CreateEventForm;
