import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "@store/actions";
import cn from "classnames";
import {
	THEME_LIGHT,
	THEME_DARK,
	THEME_ROBO,
} from "@store/constants/actionTypes";

import jedi from "./img/jedi.svg";
import dark from "./img/dark-side.svg";
import light from "./img/light-side.svg";
import check from "./img/check.svg"

import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";

const HomePage = () => {
	const dispatch = useDispatch();
	const dispatchTheme = (themeName) => {
		dispatch(changeTheme(themeName));
	};
	const storeData = useSelector((state) => state.themeReducer);
	const [activeTheme, setActiveTheme] = useState(null);
	
	useEffect(()=> {
		setActiveTheme(storeData);
	},[])

	useEffect(()=> {
		switch (storeData) {
			case "dark":
				setActiveTheme("dark");
				break;
			case "light":
				setActiveTheme("light");
				break;
			case "robo":
				setActiveTheme("robo");
				break;
			default:
				setActiveTheme("robo");
				break;
		}
	}, [storeData])
	return (
		<>
			<h1 className="header__text">choose app theme</h1>
			<button
				onClick={() => dispatchTheme(THEME_LIGHT)}
				className={cn(styles.light, styles.theme__btn, activeTheme==="light"&&styles.theme__active)}
			>
				<img src={light} alt="" />
				{activeTheme === "light" ? <img src={check} className={styles.theme__checked}/> : ''}
				I'm from light side
			</button>
			<button
				onClick={() => dispatchTheme(THEME_DARK)}
				className={cn(styles.dark, styles.theme__btn, activeTheme==="dark"&&styles.theme__active)}
			>
				<img src={dark} alt="" />
				{activeTheme === "dark" ? <img src={check} className={styles.theme__checked}/> : ''}
				I'm from dark side
			</button>
			<button
				onClick={() => dispatchTheme(THEME_ROBO)}
				className={cn(styles.robo, styles.theme__btn, activeTheme==="robo"&&styles.theme__active)}
			>
				<img src={jedi} alt="" />
				{activeTheme === "robo" ? <img src={check} className={styles.theme__checked}/> : ''}
				I'm Jedi
			</button>
		</>
	);
};

export default HomePage;
