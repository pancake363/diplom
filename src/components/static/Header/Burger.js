import './Burger.scss';
import { Link } from "react-router-dom";

function Burger ({items, active,}) {
	return <div className='side'>
		<div className={active ? 'side-content active' : 'side-content'}>
			<ul className="side-content__list">
				{items.map(item => 
					<li key={item.value} className="side-content__item">
						<Link to={item.href} className="side-content__link list-inline-item text-uppercase nav-link p-0">{item.value}</Link>
					</li>
					)}
			</ul>
			<div className="side-lang">
				<ul className="side-lang__list d-flex justify-content-around  mt-4">
					<li className="side-lang__item"><Link to={"/"} className="side-lang__link--active text-decoration-none">EN</Link></li>
					<li className="side-lang__item"><Link to={"/"} className="side-lang__link text-decoration-none">UA</Link></li>
				</ul>
			</div>
		</div>
	</div>
}

export default Burger; 