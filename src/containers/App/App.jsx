import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import routesConfig from "@routes/routesConfig";
import Header from "@components/Header";
import { getLocalStorage } from "@utils/localStorage";
import { changeCSSVariables } from "@services/changeCSSVariables";
import { REPO_NAME } from "@constants/repo";

import "../../styles/index.css";
import styles from "./App.module.css";

function App() {
	const theme = getLocalStorage("theme");
	useEffect(() => {
		changeCSSVariables(theme);
	}, []);

	return (
		<>
			<BrowserRouter basename={`/${REPO_NAME}/`}>
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
