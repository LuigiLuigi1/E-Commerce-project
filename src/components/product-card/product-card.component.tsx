import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';
import { CategoryItem } from '../../store/categories/category.types';
import { selectCategoriesMap } from '../../store/categories/category.selector';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { 
    ProductCartContainer, 
    Footer,  
    Name,  
    Price,
    ProductImageLink,
} from './product-card.styles';

type ProductCardProps = {
    product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const { name, price, imageUrl, id } = product;
    const cartItems = useSelector(selectCartItems);
    const categoriesMap = useSelector(selectCategoriesMap);
    const dispatch = useDispatch();
    const params = useParams();
    
    // Get the category from URL params or find it from categoriesMap
    let category = params.category;
    if (!category) {
        // Find which category this product belongs to
        for (const [categoryName, products] of Object.entries(categoriesMap)) {
            if (products.find(p => p.id === id)) {
                category = categoryName;
                break;
            }
        }
    }

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCartContainer>
            <ProductImageLink to={category ? `/shop/${category}/${id}` : '#'}>
                <img src={imageUrl} alt={`${name}`}/>
            </ProductImageLink>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button 
                buttonType={BUTTON_TYPE_CLASSES.inverted} 
                onClick={addProductToCart}
            >
                Add to cart
            </Button>
        </ProductCartContainer>
    );
};

export default ProductCard;
