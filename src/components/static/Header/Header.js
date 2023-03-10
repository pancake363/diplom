import './Header.scss';
import { Link } from "react-router-dom";
import Burger from './Burger';
import { useState } from 'react';

function Header () {
	const items = [{value:"Shop", href:'/shop'}, {value:"Friends", href:'/friends'}, {value:"About us", href:'/about-us'}, {value:"Contacts", href:'/contacts'}];

	const [menuActive, setMenuActive] = useState(false);

	return<><header className="row justify-content-between align-items-center p-2" id="up">
	<div className="header-logo"><img src='/images/logo/logo.png' alt="logo"/></div>
	<nav className="header-menu w-50">
		<ul className="header-menu__list row justify-content-md-between justify-content-around align-items-center my-0">
			<li className="header-menu__item">
				<Link to={'/shop'} className="header-menu__link line-animation list-inline-item text-uppercase position-relative nav-link p-0">Shop</Link>
			</li>
			<li className="header-menu__item">
				<Link to={'/friends'} className="header-menu__link list-inline-item text-uppercase position-relative nav-link p-0">Friends</Link>
			</li>
			<li className="header-menu__item">
				<Link to={'/about-us'} className="header-menu__link list-inline-item text-uppercase position-relative nav-link p-0">About us</Link>
			</li>
			<li className="header-menu__item">
				<Link to={'/contacts'} className="header-menu__link list-inline-item text-uppercase position-relative nav-link p-0">Contacts</Link>
			</li>
		</ul>
	</nav>
	<div className='header-menu__burger' onClick={() => setMenuActive(!menuActive) }><span></span></div>
	<div className="header-lang">
		<ul className="header-lang__list row justify-content-between align-items-center m-0">
			<li className="header-lang__item"><Link to={"/"} className="header-lang__link--active text-white text-decoration-none">EN</Link></li>
			<li className="header-lang__item"><Link to={"/"} className="header-lang__link text-decoration-none">UA</Link></li>
		</ul>
	</div>
</header>
<Burger active={menuActive} items={items} />
	</>
}

export default Header;