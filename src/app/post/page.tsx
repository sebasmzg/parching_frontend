"use client";

import React from "react";
import EventCard from "@/components/eventCard/EventCard";
import styled from "styled-components";
import NavBar from "@/components/common/navbar/navBar";
import Footer from "@/components/common/footer/footer";

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
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const mockEvents = [
  {
    imageSrc:
      "https://images.pexels.com/photos/26616689/pexels-photo-26616689/free-photo-of-paisaje-naturaleza-gente-colina.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Mountain Hike",
    description: "Join us for a hike up the mountain!",
    spots: 10,
    creator: "John Doe",
    date: "2024-09-30",
    price: "$25",
    onJoin: () => alert("Joined Mountain Hike"),
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/1192671/pexels-photo-1192671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Beach Clean-Up",
    description: "Help us clean up the beach!",
    spots: 20,
    creator: "Jane Smith",
    date: "2024-10-05",
    price: "Free",
    onJoin: () => alert("Joined Beach Clean-Up"),
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/1957019/pexels-photo-1957019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Community Picnic",
    description: "Join us for a community picnic!",
    spots: 50,
    creator: "Alice Johnson",
    date: "2024-10-10",
    price: "$10",
    onJoin: () => alert("Joined Community Picnic"),
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/17971052/pexels-photo-17971052/free-photo-of-gafas-de-sol-piernas-patas-calle.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Dog Walk",
    description: "Join us for a walk with our furry friends!",
    spots: 15,
    creator: "Bob Brown",
    date: "2024-10-15",
    price: "$5",
    onJoin: () => alert("Joined Dog Walk"),
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Food Drive",
    description: "Help us collect food for those in need!",
    spots: 30,
    creator: "Eve Wilson",
    date: "2024-10-20",
    price: "Free",
    onJoin: () => alert("Joined Food Drive"),
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/2035066/pexels-photo-2035066.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Yoga in the Park",
    description: "Join us for a relaxing yoga session in the park!",
    spots: 25,
    creator: "Sam Green",
    date: "2024-10-25",
    price: "$15",
    onJoin: () => alert("Joined Yoga in the Park"),
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Bike Ride",
    description: "Join us for a bike ride around the city!",
    spots: 20,
    creator: "Alex White",
    date: "2024-10-30",
    price: "$10",
    onJoin: () => alert("Joined Bike Ride"),
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Art Workshop",
    description: "Join us for a creative art workshop!",
    spots: 15,
    creator: "Lisa Black",
    date: "2024-11-05",
    price: "$20",
    onJoin: () => alert("Joined Art Workshop"),
  },
  {
    imageSrc:
      "https://images.pexels.com/photos/2890387/pexels-photo-2890387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Cooking Class",
    description: "Join us for a fun cooking class!",
    spots: 10,
    creator: "Chef Gordon",
    date: "2024-11-10",
    price: "$30",
    onJoin: () => alert("Joined Cooking Class"),
  },
];

const PostPage: React.FC = () => {
  return (
    <>
      <NavBar />
      <HomeContainer>
        <h1 style={{ color: colors.dark }}>Upcoming Events</h1>
        <CardContainer>
          {mockEvents.map((event, index) => (
            <EventCard
              key={index}
              imageSrc={event.imageSrc}
              name={event.name}
              description={event.description}
              spots={event.spots}
              creator={event.creator}
              date={event.date}
              price={event.price}
              onJoin={event.onJoin || (() => {})}
            />
          ))}
        </CardContainer>
      </HomeContainer>
      <Footer />
    </>
  );
};

export default PostPage;
