import { useState } from "react";
import { NavLink } from "react-router-dom";

import Favorite from "@components/Favorite";

import styles from "./Header.module.css";

const Header = () => {
	const [link, setLink] = useState("/people");
	const handleMouseEnter = () => {
		setLink("/people/?page=1");
	};
	const handleMouseLeave = () => {
		setLink("/people");
	};
	return (
		<div className={styles.container}>
			<ul className={styles.list__container}>
				<li>
					<NavLink to="/" exact="true">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink
						to={link}
						exact="false"
						onMouseDown={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						People
					</NavLink>
				</li>
				<li>
					<NavLink to="/search" exact="true">
						Search
					</NavLink>
				</li>
				<li>
					<NavLink to="/filter" exact="false">
						Filter
					</NavLink>
				</li>
				<li>
					<NavLink to="/not-found" exact="true">
						Not Found
					</NavLink>
				</li>
				<li>
					<NavLink to="/fail" exact="true">
						Fail
					</NavLink>
				</li>
			</ul>
			<Favorite />
		</div>
	);
};

export default Header;
