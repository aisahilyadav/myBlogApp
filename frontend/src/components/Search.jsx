import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    if (debouncedSearch) {
      onSearch(debouncedSearch);
    }
  }, [debouncedSearch, onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
} 