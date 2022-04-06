import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./PeopleNavigation.module.css";

const PeopleNavigation = ({ getResource, prevPage, nextPage, counterPage }) => {
	const handleChangePrev = () => {
		getResource(prevPage);
	};

	const handleChangeNext = () => {
		getResource(nextPage);
	};

	return (
		<div>
			<Link className={styles.link} to={`/people/?page=${counterPage - 1}`}>
				<button disabled={!prevPage} onClick={handleChangePrev} className={styles.buttons}>
					Previous
				</button>
			</Link>
			<Link className={styles.link} to={`/people/?page=${counterPage + 1}`}>
				<button disabled={!nextPage} onClick={handleChangeNext} className={styles.buttons}>
					Next
				</button>
			</Link>
		</div>
	);
};

PeopleNavigation.propTypes = {
	getResource: PropTypes.func,
	prevPage: PropTypes.string,
	nextPage: PropTypes.string,
	counterPage: PropTypes.number,
};

export default PeopleNavigation;
