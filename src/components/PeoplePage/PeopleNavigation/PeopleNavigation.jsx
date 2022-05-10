import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import UIButton from "@ui/UIButton/UIButton";

import styles from "./PeopleNavigation.module.css";

const PeopleNavigation = ({ getResource, prevPage, nextPage, counterPage, loading=false }) => {
	const handleChangePrev = () => {
		getResource(prevPage);
	};

	const handleChangeNext = () => {
		getResource(nextPage);
	};

	return (
		<div className={styles.container}>
			<Link className={styles.link} to={`/people/?page=${counterPage - 1}`}>
				<UIButton text="Previous" disabled={!prevPage||loading} handleClick={handleChangePrev} />
			</Link>
			<Link className={styles.link} to={`/people/?page=${counterPage + 1}`}>
				<UIButton text="Next" disabled={!nextPage||loading} handleClick={handleChangeNext} />
			</Link>
		</div>
	);
};

PeopleNavigation.propTypes = {
	getResource: PropTypes.func,
	prevPage: PropTypes.string,
	nextPage: PropTypes.string,
	counterPage: PropTypes.number,
	loading: PropTypes.bool
};

export default PeopleNavigation;
