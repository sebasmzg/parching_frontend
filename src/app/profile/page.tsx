"use client";
import React from "react";
import styled from "styled-components";
import NavBar from "@/components/common/navbar/navBar";
import ProfileCard from "@/components/profile/profileCard";
import EventSlider from "@/components/profile/eventSlider";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
`;
export default function Home() {
  return (
    <div>
      <NavBar />
      <ProfileCard />
      <EventSlider />
    </div>
  );
}
