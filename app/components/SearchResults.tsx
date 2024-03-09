import React from 'react';
import Link from 'next/link';

interface SearchResultsProps {
  results: any[]; 
  searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, searchTerm }) => {
  return (
    <div className="absolute top-16 left-0 bg-white shadow-md w-full">
      {searchTerm && results.length > 0 ? (
        <ul>
          {results.map((post) => (
            <li key={post._id}>
              <Link href={`/blog/${post.slug.current}`}>
                <span className="block px-4 py-2 hover:bg-gray-100">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        searchTerm && <p className="p-4">No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
