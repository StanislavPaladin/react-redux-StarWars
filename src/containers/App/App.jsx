import { Route, BrowserRouter, Routes } from "react-router-dom";

import routesConfig from "@routes/routesConfig";
import Header from "@components/Header";

import styles from "./App.module.css";

function App() {
	return (
		<>
			<BrowserRouter>
				<div className={styles.wrapper}>
					<Header />
					<Routes>
						{routesConfig.map((route, index) => (
							<Route path={route.path} key={index} element={route.element} />
						))}
					</Routes>
				</div>
			</BrowserRouter>
		</>
	);
}

export default App;
