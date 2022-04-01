import PropTypes from 'prop-types'; 

import styles from "./PeopleList.module.css";
const PeopleList = ({ people }) => {
	return (
		<div>
			<ul className={styles.list__container}>
				{people.map(({ name, id, img }) => (
					<li key={id} className={styles.list__item}>
						<a href="#">
							<img src={img} alt={name} className={styles.person__photo} />
							<p>{name}</p>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

PeopleList.propTypes = {
    people: PropTypes.array
}

export default PeopleList;



