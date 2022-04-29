import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import loaderViolet from "./img/loader-violet.svg";
import loaderWhite from "./img/loader-white.svg";
import loaderBlack from "./img/loader-black.svg";

import styles from "./UILoading.module.css";

const UILoading = ({ isShadow = false, classes }) => {
	const [loaderIcon, setLoaderIcon] = useState(null);
	const storeData = useSelector((state) => state.themeReducer);
	useEffect(() => {
		switch (storeData) {
			case "dark":
				setLoaderIcon(loaderBlack);
				break;
			case "light":
				setLoaderIcon(loaderViolet);
				break;
			case "robo":
				setLoaderIcon(loaderWhite);
				break;
			default:
				setLoaderIcon(loaderWhite);
				break;
		}
	}, []);
	return (
		<>
			{isShadow
				? loaderIcon && (
						<img
							className={cn(styles.loader, styles.shadow)}
							src={loaderIcon}
							alt="loading..."
						/>
				  )
				: loaderIcon && (
						<img className={styles.loader} src={loaderIcon} alt="loading..." />
				  )}
		</>
	);
};

UILoading.propTypes = {
	theme: PropTypes.string,
	isShadow: PropTypes.bool,
	classes: PropTypes.string,
};

export default UILoading;
