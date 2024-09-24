import React from 'react';
import { Edit } from '@styled-icons/boxicons-regular';
import { IEvent } from '@/services/models';
import EventCardProfile from './EventCardProfile'; // Asegúrate de importar el componente base
import { useRouter } from 'next/navigation';

interface EventCardProfileHostProps {
  event: IEvent;
}

const EventCardProfileHost: React.FC<EventCardProfileHostProps> = ({ event }) => {
  const router = useRouter();
  
  const handleEdit = () => {
    localStorage.setItem("eventToEdit", JSON.stringify(event));
    router.push(`/events/edit/${event?.id}`);
  };

  return (
    <div>
      <EventCardProfile 
        event={event} 
        icon={<Edit style={{ width: '24px', height: '24px'}} onClick={handleEdit} />}
      />
    </div>
  );
};

export default EventCardProfileHost;
