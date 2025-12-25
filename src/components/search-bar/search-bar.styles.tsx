import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 300px;
  margin: 0 20px;

  @media screen and (max-width: 800px) {
    width: 200px;
    margin: 0 10px;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  color: #6c757d;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 14px;
  font-family: 'Open Sans Condensed', sans-serif;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

export const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 8px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const ResultImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
`;

export const ResultInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ResultName = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
`;

export const ResultCategory = styled.span`
  font-size: 12px;
  color: #6c757d;
  text-transform: capitalize;
  margin-bottom: 4px;
`;

export const ResultPrice = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: #000;
`;

export const NoResults = styled.div`
  padding: 20px;
  text-align: center;
  color: #6c757d;
  font-size: 14px;
`;
