import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string, searchType: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('free');  // ✅ Default selection

    const handleSearch = () => {
        onSearch(query, searchType);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="🔍 חפש רחוב"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <div>
                <label>
                    <input
                        type="radio"
                        name="searchType"  // ✅ Ensure all radios share the same name
                        value="free"
                        checked={searchType === 'free'}
                        onChange={() => setSearchType('free')}
                    />
                    חיפוש חופשי
                </label>
                <label>
                    <input
                        type="radio"
                        name="searchType"
                        value="exact"
                        checked={searchType === 'exact'}
                        onChange={() => setSearchType('exact')}
                    />
                    חיפוש מדויק
                </label>
                <label>
                    <input
                        type="radio"
                        name="searchType"
                        value="full"
                        checked={searchType === 'full'}
                        onChange={() => setSearchType('full')}
                    />
                    חיפוש ביטוי מלא
                </label>
            </div>
            <button onClick={handleSearch}>🔍 חפש</button>
        </div>
    );
};

export default SearchBar;
