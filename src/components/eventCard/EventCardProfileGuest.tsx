import React, { useState } from 'react';
import { InfoCircle } from '@styled-icons/boxicons-regular'; 
import { IEvent, IEventID } from '@/services/models';
import EventCardProfile from './EventCardProfile'; 
import { Dialog, Button, Typography } from '@mui/material';
import styled from 'styled-components';

// Estilo del contenido del diálogo
const DialogContent = styled.div`
  display: flex;
  padding: 0;
  background-color: #D2DEEC; // Color secundario
  color: #3C4556; // Color oscuro
  border-radius: 8px;
  overflow: hidden;

  .event-image {
    flex: 1; /* Toma la mitad del ancho */
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .event-details {
    flex: 1;
    padding: 20px;

    h2 {
      margin: 0 0 10px;
      font-family: "Belleza", sans-serif; 
    }

    p {
      font-family: "Belleza", sans-serif; 
    }
  }
`;

interface EventCardProfileGuestProps {
  event: IEvent;
}

const EventCardProfileGuest: React.FC<EventCardProfileGuestProps> = ({ event }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<IEventID | null>(null);

  const handleViewDetails = async () => {
    setSelectedEvent(event as IEventID);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <EventCardProfile 
        event={event} 
        icon={<InfoCircle style={{ width: '24px', height: '24px'}} onClick={handleViewDetails} />}
      />

      {/* Diálogo para detalles del evento */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          {selectedEvent && (
            <>
              <div className="event-image">
                {selectedEvent.images && selectedEvent.images.length > 0 ? (
                  <img
                    src={selectedEvent.images[0].image}
                    alt={selectedEvent.information.name}
                  />
                ) : (
                  <span>No image available for this event.</span>
                )}
              </div>
              <div className="event-details">
                <Typography variant="h6" component="h2">
                  {selectedEvent.information.name || "No Name"}
                </Typography>
                <Typography variant="body1">
                  <strong>Location:</strong> {selectedEvent.information.location || "No Location"}
                </Typography>
                <Typography variant="body1">
                  <strong>Date:</strong> {`${new Date(selectedEvent.startDate).toLocaleString()} to ${new Date(selectedEvent.endDate).toLocaleString()}`}
                </Typography>
                <Typography variant="body1">
                  <strong>Capacity:</strong> {selectedEvent.capacity || "No Capacity"}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {selectedEvent.information.email || "No Email"}
                </Typography>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventCardProfileGuest;