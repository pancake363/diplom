import './Product.scss';
import {Button, Card, Col} from "react-bootstrap";
import { Link } from "react-router-dom";

function Product ({product, addToCart, removeFromCart}) {
	return <Col sm={6} md={4} lg={3} className={'d-flex my-3'}>
		<Card className={'product d-flex flex-column p-3 align-items-center'} >
		<div className="product__heart align-self-end"></div>
		<div className="product__image-wrapper text-center position-relative">
			<img src={product.image} alt="product"/>
		</div>
		<div className="product__info">
		<Link to={ `/product/${product.id}`}><p className="product__title">{product.title}</p></Link>
		<p className="product__category">Category: {product.category}</p>
		<p className="product__price">Price: {product.price} &#8372;</p>
		{product.addedToCart ? 
	  	<Button variant="danger" onClick = {() =>{removeFromCart(product.id)}}>Remove</Button> : 
	  	<Button variant="success" onClick = {() =>{addToCart(product.id)}}>Add to Cart</Button>}
		</div>
		</Card>
	</Col>
}

export default Product;