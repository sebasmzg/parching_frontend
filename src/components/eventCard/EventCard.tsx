import React, { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Tooltip,
  IconButton,
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

// Paleta de colores similar al ejemplo CustomCard
const colors = {
  primary: "#165252",
  accent: "#78882D",
  secondary: "#D2DEEC",
  white: "#ffffff",
};

// Contenedor de la tarjeta de evento
const CardContainer = styled.div`
  width: 500px;
  height: 600px;
  margin: 1rem;
  padding: 0 0 1.5rem 0;
  text-align: center;
  background-color: ${colors.primary};
  color: ${colors.white};
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column; /* Asegura que los elementos internos se apilen verticalmente */

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto; /* Permite que la tarjeta se ajuste al ancho en pantallas pequeñas */
  }
`;

// Imagen del evento
const ImageContainer = styled.div`
  overflow: hidden;
  border-bottom: 4px solid ${colors.accent};
  border-radius: 15px 15px 0 0;
  height: 60%;
`;

const EventImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 15px 15px 0 0;
  object-fit: cover;
  object-position: center;
`;

// Contenedor de la información del evento
const EventDetails = styled.div`
  padding: 16px;
  flex: 1; /* Permite que el contenedor de detalles ocupe el espacio restante */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Espacia los elementos internos */
`;

// Títulos y texto
const TitleContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.white};
  margin-top: 1rem;
  margin-bottom: 0; /* Elimina el margen inferior para alinearse con el botón */
`;

const Text = styled.p`
  font-size: 16px;
  color: ${colors.secondary};
  margin: 0.5rem 0; /* Añade un pequeño margen para separar los textos */
`;

// Botón para unirse
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
`;

// Estilos personalizados para el Dialog
const Dialog = styled(MuiDialog)`
  .MuiPaper-root {
    background-color: ${colors.primary};
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const DialogTitle = styled(MuiDialogTitle)`
  display: flex;
  align-items: center;
  color: ${colors.white};
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 16px;

  .MuiTypography-root {
    flex: 1;
  }
`;

const DialogContent = styled(MuiDialogContent)`
  color: ${colors.secondary};
`;

// Props del componente de tarjeta de evento
interface EventCardProps {
  imageSrc: string;
  name: string;
  description: string;
  spots: number | undefined;
  creator: string | undefined;
  date: string | undefined;
  price: string | undefined;
  onJoin: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  imageSrc,
  name,
  description,
  spots,
  creator,
  date,
  price,
  onJoin,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CardContainer>
        <ImageContainer>
          <EventImage src={imageSrc} alt={name} />
        </ImageContainer>
        <EventDetails>
          <TitleContainer>
            <Title>{name}</Title>
            <Tooltip title="More Info">
              <IconButton onClick={handleClickOpen}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </TitleContainer>
          <Text>
            <strong>Spots Available:</strong> {spots}
          </Text>
          <Text>
            <strong>Date:</strong> {date}
          </Text>
          <Text>
            <strong>Price:</strong> {price}
          </Text>
          <ButtonContainer>
            <Button
              variant="contained"
              style={{
                backgroundColor: colors.accent,
                color: colors.white,
                width: '100%', // Ajusta el botón al ancho del contenedor
              }}
              onClick={onJoin}
            >
              Join
            </Button>
          </ButtonContainer>
        </EventDetails>
      </CardContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Event Details
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            style={{ marginLeft: 'auto' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ImageContainer>
            <EventImage src={imageSrc} alt={name} />
          </ImageContainer>
          <EventDetails>
            <Title>{name}</Title>
            <Text>
              <strong>Description:</strong> {description}
            </Text>
            <Text>
              <strong>Creator:</strong> {creator}
            </Text>
            <Text>
              <strong>Date:</strong> {date}
            </Text>
            <Text>
              <strong>Price:</strong> {price}
            </Text>
            <ButtonContainer>
              <Button
                variant="contained"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.white,
                  width: '100%',
                }}
                onClick={onJoin}
              >
                Join
              </Button>
            </ButtonContainer>
          </EventDetails>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventCard;
