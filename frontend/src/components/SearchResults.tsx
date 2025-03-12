import React from 'react';

interface SearchResultsProps {
    results: any[];
    onDelete: (id: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onDelete }) => {
    return (
        <div>
            {results.map((result) => {
                console.log(result);
                return (
                    <div key={result._id} className="result-item">
                        <p>שם ראשי: {result.שם_ראשי}</p>
                        <p>שכונה: {result.שכונה}</p>
                        <p>קוד: {result.קוד}</p>
                        <p>סוג: {result.סוג}</p>
                        <p>תיאור: {result.תיאור}</p>
                        <button onClick={() => onDelete(result._id)}>🗑️ מחק</button>
                    </div>
                );
            })}
        </div>
    );
};

export default SearchResults;
