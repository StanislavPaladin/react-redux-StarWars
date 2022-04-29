import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./PeopleList.module.css";
const PeopleList = ({ people, getResource }) => {
	return (
		<div className={styles.container}>
			<ul className={styles.list__container}>
				{people.map(({ name, id, img }) => (
					<li key={id} className={styles.list__item}>
						<Link to={`/people/${id}`}>
							<img src={img} alt={name} className={styles.person__photo} />
							<p>{name}</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

PeopleList.propTypes = {
	people: PropTypes.array,
};

export default PeopleList;
