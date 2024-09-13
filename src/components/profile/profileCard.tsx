import { Avatar } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledAvatar = styled(Avatar)`
  width: 200px;
  height: 200px;
  margin-bottom: 30px;
`;

const Name = styled.h1`
  font-size: 24px;
  margin: 20px;
  color: #000;
`;

const Username = styled.p`
  color: #0a0000;
  margin: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 300px;
  margin: 70px;
`;

const CustomButton = styled(Button)`
  background-color: ${(props) => props.bgColor || 'defaultColor'};
  color: white;
  &:hover {
    background-color: ${(props) => props.hoverColor || 'hoverColor'};
  }
`;

const ProfileCard: React.FC = () => {
  return (
    <ProfileContainer>
      <StyledAvatar alt="Profile Picture" src="/img/images.jpg"></StyledAvatar>
      <Name>Name</Name>
      <Username>User name</Username>
      <ButtonContainer>
        <CustomButton bgColor="#78882D" hoverColor="#5e6b20">Creados</CustomButton>
        <CustomButton bgColor="#3C4556" hoverColor="#2f3543">Participar</CustomButton>
      </ButtonContainer>
    </ProfileContainer>
  );
};

export default ProfileCard;