// EventList.tsx
import { FC, useEffect, useState } from 'react';
import SearchBar from '../search/searchBar';


interface Event {
  id: number;
  name: string;
  category: string;
 
}

const EventList: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  // cargar eventos
  useEffect(() => {
    // llamar a la API para traer los eventos.
    const fetchEvents = async () => {
      const response = await fetch(''); // API
      const data = await response.json();
      setEvents(data);
      setFilteredEvents(data);
    };

    fetchEvents().catch((error) => console.error('Error al cargar los eventos', error));
  }, []);

  const handleSearch = ({ searchTerm, category }: { searchTerm: string; category: string }) => {
    const filtered = events.filter(
      (event) =>
        (event.name.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
        (event.category === category || category === '')
    );
    setFilteredEvents(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div>
        {filteredEvents.map((event) => (
          <div key={event.id}>
            <h3>{event.name}</h3>
            <p>Categoría: {event.category}</p>
            {/* Mostrar más detalles del evento */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;

//tambien se podria fusionar para cargar los post(eventos)
