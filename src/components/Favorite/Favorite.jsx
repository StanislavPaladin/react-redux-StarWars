import { Link } from "react-router-dom";
import icon from "./img/bookmark.svg";

import { useSelector } from "react-redux";

import styles from "./Favorite.module.css";
import { useEffect, useState } from "react";
import { favoritesSelector } from "@store/constants/selectors";

const Favorite = () => {
	const [counter, setCounter] = useState();
	const storeData = useSelector(favoritesSelector);
	useEffect(() => {
		const length = Object.keys(storeData).length;
		length.toString().length > 2 ? setCounter("...") : setCounter(length);
	}, [storeData]);
	return (
		<div className={styles.container}>
			<Link to="/favorites">
				<span className={styles.counter}>{counter}</span>
				<img src={icon} alt="favorites" className={styles.icon} />
			</Link>
		</div>
	);
};

export default Favorite;
