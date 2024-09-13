"use client"

import React from 'react';
import Navbar from '../profile/Navbar';
import ProfileCard from '../profile/ProfileCard';
import EventSlider from './EventSlider';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 20px;
`;

const ProfilePage: React.FC = () => {
  return (
    <>
      <Navbar /> 
      <PageContainer>
        <ProfileCard />
        <EventSlider />
      </PageContainer>
    </>
  );
};

export default ProfilePage;