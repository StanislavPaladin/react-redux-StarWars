import { useLocation } from "react-router";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
    let location = useLocation();

	return (
		<>
			<div className={styles.container}>
				<h1 className="header__text">Page not found</h1>
                <p className={styles.text}>no match for <u>{location.pathname}</u></p>
			</div>
		</>
	);
};

export default NotFoundPage;
