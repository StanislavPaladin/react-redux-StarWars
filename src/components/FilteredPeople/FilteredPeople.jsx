import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./FilteredPeople.module.css";

const FilteredPeople = ({ people, setPeople }) => {
	const [checkedFields, setCheckedFields] = useState({
		1: false,
		2: false,
		3: false,
		4: false,
		5: false,
		6: false,
	});


	const [filtered, setFiltered] = useState(null);

	useEffect(() => {
		setPeople(people.sort((a, b) => (a.name > b.name ? 1 : -1)));
	}, []);

	useEffect(() => {
		filterPeopleByEpisodes();
	}, [checkedFields]);

	const filterPeopleByEpisodes = () => {
		const checkedObjectEntries = Object.entries(checkedFields);
		const findEpisodeNumbers = checkedObjectEntries.filter(
			(item) => String(item[1]) == "true"
		);
		const checkedEpisodes = findEpisodeNumbers.map((ep) => ep[0]);
		if (checkedEpisodes.length > 0) {
			const filteredPersonsByEpisodes = people.map((person) => {
				const personEpisodes = person.films.map(film => film.slice(film.length -3 ,film.length).split('/').join(''))
				for (let i = 0; i < checkedEpisodes.length; i++) {
					if (personEpisodes.indexOf(checkedEpisodes[i]) == -1) return null;
				}
				return person;
			});
			setFiltered(
				filteredPersonsByEpisodes.filter(function (el) {
					return el != null;
				})
			);
		} else {
			setFiltered(people);
		}
	};

	const toggleCkeckBox = (e) => {
		const { target } = e;
		const value = target.checked;
		const { name } = target;
		setCheckedFields((fields) => ({ ...fields, [name]: value }));
	};

	return (
		<div className={styles.container}>
			<ul className={styles.list__container}>
				{filtered &&
					filtered.map(({ name, id, img }) => (
						<li key={id} className={styles.list__item}>
							<Link to={`/people/${id}`}>
								<img src={img} alt={name} className={styles.person__photo} />
								<p className={styles.person__name}>{name}</p>
							</Link>
						</li>
					))}
				{!filtered && (
					<div className="header__text">
						Select episode to show characters filtered by that episode
					</div>
				)}
			</ul>
			<div className={styles.filters__container}>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episodeOne}
						value={checkedFields.episodeOne}
						className={styles.filter__checkbox}
						type="checkbox"
						name="1"
					/>
					<label className={styles.filter__label} htmlFor="1">
						<span className={styles.filter__episode}>Episode</span> 1
					</label>
				</div>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episodeTwo}
						className={styles.filter__checkbox}
						type="checkbox"
						name="2"
					/>
					<label className={styles.filter__label} htmlFor="2">
						<span className={styles.filter__episode}>Episode</span> 2
					</label>
				</div>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episodeThree}
						value={checkedFields.episodeThree}
						className={styles.filter__checkbox}
						type="checkbox"
						name="3"
					/>
					<label className={styles.filter__label} htmlFor="3">
						<span className={styles.filter__episode}>Episode</span> 3
					</label>
				</div>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episodeFour}
						value={checkedFields.episodeFour}
						className={styles.filter__checkbox}
						type="checkbox"
						name="4"
					/>
					<label className={styles.filter__label} htmlFor="4">
						<span className={styles.filter__episode}>Episode</span> 4
					</label>
				</div>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episodeFive}
						value={checkedFields.episodeFive}
						className={styles.filter__checkbox}
						type="checkbox"
						name="5"
					/>
					<label className={styles.filter__label} htmlFor="5">
						<span className={styles.filter__episode}>Episode</span> 5
					</label>
				</div>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episodeSix}
						value={checkedFields.episodeSix}
						className={styles.filter__checkbox}
						type="checkbox"
						name="6"
					/>
					<label className={styles.filter__label} htmlFor="6">
						<span className={styles.filter__episode}>Episode</span> 6
					</label>
				</div>
			</div>
		</div>
	);
};

FilteredPeople.propTypes = {
	people: PropTypes.array,
	setPeople: PropTypes.func,
};

export default FilteredPeople;
