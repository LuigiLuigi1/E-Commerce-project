import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCategoriesMap } from '../../store/categories/category.selector';
import { CategoryItem } from '../../store/categories/category.types';

import {
  SearchContainer,
  SearchInput,
  SearchIcon,
  SearchResults,
  SearchResultItem,
  ResultImage,
  ResultInfo,
  ResultName,
  ResultPrice,
  ResultCategory,
  NoResults
} from './search-bar.styles';

type SearchItem = CategoryItem & { category: string };

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const categoriesMap = useSelector(selectCategoriesMap);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const filteredResults: SearchItem[] = [];
    const lowerSearchTerm = searchTerm.toLowerCase();

    Object.entries(categoriesMap).forEach(([categoryName, items]) => {
      const matchingItems = items.filter(item =>
        item.name.toLowerCase().includes(lowerSearchTerm)
      );
      
      matchingItems.forEach(item => {
        filteredResults.push({
          ...item,
          category: categoryName
        });
      });
    });

    setSearchResults(filteredResults.slice(0, 8)); // Limit to 8 results
    setIsDropdownOpen(filteredResults.length > 0);
  }, [searchTerm, categoriesMap]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = (category: string, productId: number) => {
    navigate(`/shop/${category}/${productId}`);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  return (
    <SearchContainer ref={searchRef}>
      <SearchIcon>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => searchResults.length > 0 && setIsDropdownOpen(true)}
      />
      
      {isDropdownOpen && (
        <SearchResults>
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <SearchResultItem 
                key={`${item.category}-${item.id}`}
                onClick={() => handleResultClick(item.category, item.id)}
              >
                <ResultImage src={item.imageUrl} alt={item.name} />
                <ResultInfo>
                  <ResultName>{item.name}</ResultName>
                  <ResultCategory>in {item.category}</ResultCategory>
                  <ResultPrice>${item.price}</ResultPrice>
                </ResultInfo>
              </SearchResultItem>
            ))
          ) : (
            <NoResults>No products found</NoResults>
          )}
        </SearchResults>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
