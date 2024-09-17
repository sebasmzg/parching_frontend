import React from "react";
import styled from "styled-components";
import { StyledIcon } from "@styled-icons/styled-icon";

const CardWrapper = styled.div`
  flex: 1;
  margin: 1rem;
  padding: 0 0 1.5rem 0;
  text-align: center;
  background-color: #165252;
  color: white;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const IconContainer = styled.div`
  font-size: 50px;
  color: #78882d;
  margin-bottom: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 15px 15px 0 0;
`;

const TitleContainer = styled.div`
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-top: 1rem;
  color: #ffffff;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #d2deec;
`;

// Interfaz para definir las propiedades del componente
interface CustomCardProps {
  imageSrc: string;
  icon: StyledIcon;
  title: string;
  description: string;
}

const CustomCard: React.FC<CustomCardProps> = ({
  imageSrc,
  icon: Icon,
  title,
  description,
}) => {
  return (
    <CardWrapper>
      <Image src={imageSrc} alt={title} />
      <TitleContainer>
        <IconContainer>
          <Icon size="50px" style={{ color: "#78882D" }} />
        </IconContainer>
        <CardTitle>{title}</CardTitle>
      </TitleContainer>
      <CardDescription>{description}</CardDescription>
    </CardWrapper>
  );
};

export default CustomCard;
