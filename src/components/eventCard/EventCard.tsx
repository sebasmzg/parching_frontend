import React from "react";
import styled from "styled-components";
import { IEvent } from "@/services/models";
import { AiOutlineInfoCircle } from "react-icons/ai";

const CardContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  position: relative;
  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  color: #013b58;
  background: linear-gradient(135deg, #ffffff 0%, #165252 100%);
`;

const Title = styled.h2`
  font-size: 2rem;
  text-align: center;
  color: #013b58;
  margin: 0 0 10px;
  font-weight: bold;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  color: #013b58;
  div {
    color: #013b58;
  }
`;

const InfoIcon = styled(AiOutlineInfoCircle)`
  color: #013b58;
  font-size: 2.5em;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateX(-50%) scale(1.1);
  }
`;

interface EventCardProps extends IEvent {
  onInfo: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  images,
  information,
  capacity,
  startDate,
  endDate,
  onInfo,
}) => {
  const mainImage = images && images.length > 0 ? images[0].image : "";

  return (
    <CardContainer onClick={onInfo}>
      {mainImage ? (
        <Image src={mainImage} alt={information?.name || "No Name"} />
      ) : (
        <Image src="/path/a/imagen_por_defecto.jpg" alt="No Image" />
      )}
      <Content>
        <Title>{information?.name || "No Name"}</Title>
        <InfoIcon onClick={onInfo} />
      </Content>
    </CardContainer>
  );
};

export default EventCard;
