
import { FC, useState } from 'react';

interface SearchProps {
  onSearch: (filters: { searchTerm: string; category: string }) => void;
}

const SearchBar: FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  const handleSearch = () => {
    onSearch({ searchTerm, category });
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        placeholder="Buscar por nombre..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Todas las categorías</option>
        <option value="Arte">Arte y cultura</option>
        <option value="gastronomia">Gastronomía</option>
        <option value="deporte">Deporte</option>
        {/* Añadir más categorías */}
      </select>
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
