import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IEvent, EventCategory } from "@/services/models"; // Ajusta la ruta según tu estructura de carpetas
import { ApiServiceCategory } from "@/services/actions"; // Asegúrate de tener esta importación definida correctamente

// Estilos para la tarjeta del evento
const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Content = styled.div`
  padding: 15px;
`;

const Title = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin: 0 0 10px;
`;

const Description = styled.p`
  font-size: 1em;
  color: #666;
  margin: 0 0 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #78882d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #6a7c25;
  }
`;

const CategoryList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

interface EventCardProps extends IEvent {
  onJoin: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  images,
  information,
  capacity,
  location,
  startDate,
  endDate,
  eventCategories,
  onJoin,
}) => {
  const [categories, setCategories] = useState<string[]>([]); // Para almacenar los nombres de las categorías
  const apiServiceCategory = new ApiServiceCategory();

  // Efecto para obtener las categorías de eventos
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryPromises = eventCategories.map(
          async (ec: EventCategory) => {
            if (ec.categoryId) {
              const category = await apiServiceCategory.getCategoryById(
                ec.categoryId
              );
              return category.name; // Ajusta según la estructura del objeto de categoría
            }
            return null;
          }
        );

        const fetchedCategories = await Promise.all(categoryPromises);
        setCategories(
          fetchedCategories.filter(
            (category): category is string => category !== null
          )
        ); // Filtra valores nulos
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [eventCategories]);

  const mainImage = images && images.length > 0 ? images[0].image : "";

  return (
    <CardContainer>
      {mainImage && <Image src={mainImage} alt={information.name} />}
      <Content>
        <Title>{information ? information.name : "No Name"}</Title>
        <Info>
          <div>{`Capacity: ${capacity}`}</div>
          <div>{`Location: ${information.location}`}</div>
          <div>{`Start: ${startDate ? new Date(startDate).toLocaleString() : "No date found"}`}</div>
          <div>{`End: ${ endDate ? new Date(endDate).toLocaleString() : "No date found"}`}</div>
          <div>
            <strong>Categories:</strong>
            {categories.length > 0 ? (
              <CategoryList>
                {categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </CategoryList>
            ) : (
              <span>No categories found for this event.</span>
            )}
          </div>
        </Info>
        <Button onClick={onJoin}>Join Event</Button>
      </Content>
    </CardContainer>
  );
};

export default EventCard;
