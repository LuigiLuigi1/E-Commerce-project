import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../../components/button/button.component';

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  font-size: 14px;
  color: #666;
`;

export const BreadcrumbLink = styled(Link)`
  color: #666;
  text-decoration: none;
  text-transform: capitalize;
  transition: color 0.2s ease;
  
  &:hover {
    color: #000;
    text-decoration: underline;
  }
`;

export const BreadcrumbSeparator = styled.span`
  margin: 0 10px;
  color: #999;
`;

export const BreadcrumbCurrent = styled.span`
  color: #000;
  font-weight: 500;
`;

export const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 0 20px;
  }
`;

export const ProductImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProductImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 0;
`;

export const ProductTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #000;
  
  @media screen and (max-width: 800px) {
    font-size: 28px;
  }
`;

export const ProductPrice = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #000;
  margin-bottom: 30px;
  
  @media screen and (max-width: 800px) {
    font-size: 24px;
  }
`;

export const ProductDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 40px;
  text-align: justify;
`;

export const AddToCartButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 10px 0;
  text-align: left;
  transition: color 0.2s ease;
  
  &:hover {
    color: #000;
    text-decoration: underline;
  }
`;
