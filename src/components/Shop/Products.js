import './Products.scss';
import { useEffect, useState, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';
import Product from './Product';
import Cart from './Cart/Cart';
import ToolBar from './ToolBar/ToolBar';
import SkeletonProduct from './SkeletonProduct';
import UserContext from '../../context/UserContext';

function Products() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [cartOpened, setCartOpened] = useState(false);
	const [searchedValue, setSearchedValue] = useState('');
	const [showSpinner, setShowSpinner] = useState(true);
	const [user, setUser] = useState({email: ''});

	useEffect(() => {
		const savedCart = localStorage.getItem('cartItems');
		Promise.all([
			new Promise(resolve => {
				fetch(`https://63fca7ba8ef914c5559c584f.mockapi.io/products`).then(data => data.json()).then(data => {
					resolve(data);
				})
			}),
			new Promise(resolve => {
				fetch(`https://63fca7ba8ef914c5559c584f.mockapi.io/categories`).then(data => data.json()).then(data => {
					resolve(data);
				})
			}),
			new Promise(resolve => {
				fetch(`https://fakestoreapi.com/users/1`).then(data => data.json()).then(data => {
					resolve(data);
				})
			})
		]).then(data => {
			if (savedCart) {
				let savedItems = JSON.parse(savedCart);
				for (let product of data[0]) {
					const savedProduct = savedItems.filter(savedItem => product.id === savedItem.id);
					product.addedToCart = savedProduct.length;
					product.count = savedProduct.length ? savedProduct[0].count : 1;
				}
				setProducts(data[0])
			} else {
				setProducts(data[0].map(product => ({ ...product, addedToCart: false, count: 1 })));
			}
			setCategories(data[1]);
			setUser(data[2]);
			setShowSpinner(false);
		});
	}, [])

	function saveProducts(updatedProducts) {
		const productsToSave = updatedProducts.filter(product => product.addedToCart).map(product => ({ id: product.id, count: product.count }));
		localStorage.setItem('cartItems', JSON.stringify(productsToSave));
	}

	function changeCount(id, newCount) {
		const newProducts = products.map(product => ({ ...product, count: id === product.id ? newCount : product.count }))
		setProducts(newProducts);
		saveProducts(newProducts);
	}

	function addToCart(id) {
		const newProducts = products.map(product => ({ ...product, addedToCart: id === product.id ? true : product.addedToCart }))
		setProducts(newProducts);
		saveProducts(newProducts);
	}

	function removeFromCart(id) {
		const newProducts = products.map(product => ({ ...product, count: id === product.id ? 1 : product.count, addedToCart: id === product.id ? false : product.addedToCart }))
		setProducts(newProducts);
		saveProducts(newProducts);
	}

	function changeCategories(categoryName) {
		setSelectedCategory(categoryName);
	}

	function filterProducts(searchValue) {
		setSearchedValue(searchValue);
	}

	return <Row>
		{cartOpened && <Col xs={12}>
			<UserContext.Provider value={{user}}>
				<Cart products={products.filter(product => product.addedToCart)} removeFromCart={removeFromCart}
				changeCount={changeCount} onClickCloseIcon={() => setCartOpened(false)} />
			</UserContext.Provider>
			</Col>}
		<ToolBar categories={categories} changeCategories={changeCategories} filterProducts={filterProducts}
			onClickCartIcon={() => setCartOpened(true)} searchedValue={searchedValue} onClickClearIcon={() => setSearchedValue('')} />
		{products.filter(product => product.title.toLowerCase().includes(searchedValue))
			.filter(product => product.category === selectedCategory || !selectedCategory)
			.map(product => <Product key={product.id} product={product} addToCart={addToCart} removeFromCart={removeFromCart} />)}
		{showSpinner && <>
			{[...Array(20)].map((index) => <SkeletonProduct key={index} />)}
			<div className={"shadow text-center"}>
				<div className={"spinner-block w-100"}>
					<Spinner className='spinner' animation="border" variant="info" />
				</div>
			</div>
		</>}
	</Row>
}

export default Products;