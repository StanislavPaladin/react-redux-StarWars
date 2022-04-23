import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
	const [link, setLink] = useState('/people');
	const handleMouseEnter = () => {
		setLink('/people/?page=1')
	}
	const handleMouseLeave = () => {
		setLink('/people')
		
	}
	return (
		<div className={styles.container}>
			<ul className={styles.list__container}>
				<li>
					<NavLink to="/" exact="true">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to={link} exact="false" onMouseDown={handleMouseEnter} onMouseLeave={handleMouseLeave}>
						People
					</NavLink>
				</li>
				<li>
					<NavLink to="/not-found" exact="true">
						Not Found
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Header;
