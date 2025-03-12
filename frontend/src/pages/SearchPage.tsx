import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const API_URL = 'http://localhost:5000';

const SearchPage: React.FC = () => {
    const [results, setResults] = useState<any[]>([]);

    const search = async (query: string, searchType: string) => {
        try {
            const response = await axios.get(`${API_URL}/search`, {
                params: { query, searchType },
            });
            setResults(response.data);
        } catch (error) {
            console.error("❌ Error searching:", error);
            alert("שגיאה בחיפוש");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.put(`${API_URL}/delete/${id}`);
            alert("🚀 הפריט סומן כמחוק");
            search('', 'free'); // Refresh results after delete
        } catch (error) {
            console.error("❌ Error deleting:", error);
            alert("שגיאה במחיקה");
        }
    };

    return (
        <div>
            <h1>🔎 חיפוש רחובות</h1>
            <SearchBar onSearch={search} />
            <SearchResults results={results} onDelete={handleDelete} />
        </div>
    );
};

export default SearchPage;
