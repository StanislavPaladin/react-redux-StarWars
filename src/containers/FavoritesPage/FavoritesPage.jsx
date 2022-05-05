import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getApiResource, ChangeHTTP } from "@utils/network";
import { API_FAVORTES } from "@constants/api";
import PeopleList from "@components/PeoplePage/PeopleList"
import {
	getPeopleId,
	getPeopleImage,
	getPeoplePageId,
} from "@services/getPeopleData";
import { favoritesSelector } from "@store/constants/selectors";

import styles from "./FavoritesPage.module.css";

const FavoritesPage = ({setErrorApi}) => {
	const storeData = useSelector(favoritesSelector);
	const [people, setPeople] = useState([]);
	

	useEffect (() => {
		const arr = Object.entries(storeData);
		if (arr.length) {
			const res = arr.map(item => {
				return {
					id: item[0],
					...item[1]
				}
				
			});
			setPeople(res);
		}
	}, [])

	return (
		<>
		<h1 className="header__text">Your favorite characters list :</h1>
		{people.length ? <PeopleList people={people}/> : <h2 className={styles.comment}>No Data</h2>}
		</>
	)
};



export default FavoritesPage;
