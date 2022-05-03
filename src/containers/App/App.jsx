import { Route, BrowserRouter, Routes } from "react-router-dom";
import { useEffect } from "react";

import routesConfig from "@routes/routesConfig";
import Header from "@components/Header";
import { getLocalStorage } from "@utils/localStorage";
import { changeCSSVariables } from "@services/changeCSSVariables";

import "../../styles/index.css"
import styles from "./App.module.css";

function App() {
	const theme = getLocalStorage("theme");
	useEffect(() => {
		changeCSSVariables(theme);
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
