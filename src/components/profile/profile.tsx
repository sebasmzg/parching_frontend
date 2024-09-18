"use client"

import React from 'react';
import styled from 'styled-components';
import ProfileCard from './profileCard';
import EventSlider from './eventSlider';
import NavBar from '../common/navbar/navBar';

const PageContainer = styled.div`
  padding: 20px;
`;

const ProfilePage: React.FC = () => {
  return (
    <>
      <NavBar /> 
      <PageContainer>
        <ProfileCard />
      </PageContainer>
    </>
  );
};

export default ProfilePage;