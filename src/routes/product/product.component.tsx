import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/button.component';
import Spinner from '../../components/spinner/spinner.component';

import {
  selectCategoriesMap,
  selectIsLoading,
} from '../../store/categories/category.selector';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { CategoryItem } from '../../store/categories/category.types';

import {
  ProductContainer,
  ProductImageContainer,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  AddToCartButton,
  BackButton,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbCurrent,
} from './product.styles';

type ProductRouteParams = {
  category: string;
  productId: string;
};

const Product = () => {
  const { category, productId } = useParams<
    keyof ProductRouteParams
  >() as ProductRouteParams;
  
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<CategoryItem | null>(null);

  useEffect(() => {
    if (categoriesMap[category]) {
      const foundProduct = categoriesMap[category].find(
        (item) => item.id.toString() === productId
      );
      setProduct(foundProduct || null);
    }
  }, [category, productId, categoriesMap]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItemToCart(cartItems, product));
    }
  };

  const handleGoBack = () => {
    navigate(`/shop/${category}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!product) {
    return (
      <Fragment>
        <BackButton onClick={handleGoBack}>← Back to {category}</BackButton>
        <h2>Product not found</h2>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Breadcrumb>
        <BreadcrumbLink to="/shop">Shop</BreadcrumbLink>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbLink to={`/shop/${category}`}>{category}</BreadcrumbLink>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbCurrent>{product.name}</BreadcrumbCurrent>
      </Breadcrumb>

      <ProductContainer>
        <ProductImageContainer>
          <ProductImage src={product.imageUrl} alt={product.name} />
        </ProductImageContainer>
        
        <ProductDetails>
          <ProductTitle>{product.name}</ProductTitle>
          <ProductPrice>${product.price}</ProductPrice>
          
          <ProductDescription>
            Experience premium quality with our {product.name}. 
            This exceptional piece from our {category} collection combines 
            style, comfort, and durability. Perfect for any occasion, 
            this item is crafted with attention to detail and designed 
            to exceed your expectations.
          </ProductDescription>

          <AddToCartButton
            buttonType={BUTTON_TYPE_CLASSES.base}
            onClick={handleAddToCart}
          >
            Add to Cart
          </AddToCartButton>

          <BackButton onClick={handleGoBack}>
            ← Continue Shopping in {category}
          </BackButton>
        </ProductDetails>
      </ProductContainer>
    </Fragment>
  );
};

export default Product;
