import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import routesConfig from "@routes/routesConfig";
import Header from "@components/Header";
import { getLocalStorage } from "@utils/localStorage";
import { changeCSSVariables } from "@services/changeCSSVariables";
import { API_GET_ALL_PEOPLE } from "@constants/api";
import { getPeopleId, getPeopleImage } from "@services/getPeopleData";
import { fetchAllData } from "@utils/network";
import { fetchAllPersons } from "@store/actions";

import "../../styles/index.css";
import styles from "./App.module.css";

function App() {
	const [flagState, setFlagState] = useState(false);

	const dispatch = useDispatch();

	const dispatchFiltered = (people) => {
			dispatch(
				fetchAllPersons(people)
			);
	};

	const getResource = async (url) => {
		if (!flagState) {
			const res = await fetchAllData(url);
			const peopleList = res.map(({ name, url, films }) => {
				const id = getPeopleId(url);
				const img = getPeopleImage(id);
				return {
					id,
					name,
					img,
					films,
				};
			});
			dispatchFiltered(peopleList)
		}
	};

	const theme = getLocalStorage("theme");
	useEffect(() => {
		getResource(API_GET_ALL_PEOPLE);
		console.log('render in App.jsx')
		changeCSSVariables(theme);
		return () => {
			setFlagState(true);
		};
	}, []);

	return (
		<>
			<BrowserRouter>
				<div className={styles.wrapper}>
					<Header />
					<Routes>
						{routesConfig.map((route, index) => (
							<Route
								path={route.path}
								key={index}
								element={route.element}
								exact={route.exact}
							/>
						))}
					</Routes>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
