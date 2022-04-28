import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import cn from "classnames";

import loaderViolet from "./img/loader-violet.svg";
import loaderWhite from "./img/loader-white.svg";
import loaderBlack from "./img/loader-black.svg";

import styles from "./UILoading.module.css";

const UILoading = ({ theme = "white", isShadow = false, classes }) => {
	const [loaderIcon, setLoaderIcon] = useState(null);
	useEffect(() => {
		switch (theme) {
			case "black":
				setLoaderIcon(loaderBlack);
				break;
			case "violet":
				setLoaderIcon(loaderViolet);
				break;
			case "white":
				setLoaderIcon(loaderWhite);
				break;
			default:
				setLoaderIcon('white');
				break;
		}
		
	}, [theme]);
	return (
		<>
			{isShadow ? (loaderIcon && (<img
					className={cn(styles.loader, styles.shadow)}
					src={loaderIcon}
					alt="loading..."
				/>)
				
			) : (
				loaderIcon && (<img className={styles.loader} src={loaderIcon} alt="loading..." />)
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
