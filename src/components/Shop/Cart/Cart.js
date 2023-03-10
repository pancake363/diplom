import { ListGroup } from "react-bootstrap";
import CartItem from "./CartItem"
import Total from "./Total";
import './Cart.scss';

function Cart({ products, removeFromCart, changeCount, onClickCloseIcon }) {
	return <div className='overlay'>
		<div className='cart-block p-3'>
			<div className="cart-top d-flex align-items-center justify-content-between">
				<h4>Cart</h4>
				<img className="mb-2 close" role='button' onClick={onClickCloseIcon} src="/images/icons/x-square.svg" alt="close" />
			</div>
			<ListGroup className={'my-1'}>
				{products.map(product => <CartItem key={product.id} product={product} removeFromCart={removeFromCart} changeCount={changeCount} />)}
				<Total products={products} />
			</ListGroup>
		</div>
	</div>
}

export default Cart;