import { useSelector } from "react-redux";

import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
	const storeData = useSelector(state => state)
	console.log('data', storeData)
	return <h1 className="header__text">fav</h1>;
};



export default FavoritesPage;
