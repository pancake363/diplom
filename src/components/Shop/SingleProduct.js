import "./SingleProduct.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

function SingleProduct () {
	const {productId} = useParams();
	const [product, setProduct] = useState({});

	useEffect(() => {
		if(productId) {
			fetch(`https://fakestoreapi.com/products/${productId}`).then(data => data.json()).then(data => {
				setProduct(data);
			})
		}
	}, [])

	return <Card className="single flex-row justify-content-between">
	<Card.Img className="single-image" variant="top" src={product.image} style={{maxHeight: '35rem', maxWidth: '35rem'}} />
	<Card.Body className="ml-5">
		<Card.Title><h2>{product.title}</h2></Card.Title>
		<Card.Text><b>Price:</b> <span className="single-price">{product.price} &#8372;</span></Card.Text>
		<Card.Text><b>Category:</b> {product.category}</Card.Text>
		<Card.Text className="single-text">{product.description}</Card.Text>
	</Card.Body>
	</Card>
}

export default SingleProduct;