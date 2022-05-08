import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { allPeopleSelector, checkedFilters } from "@store/constants/selectors";
import { saveCheckedFilters } from "@store/actions";
import UILoading from "@components/UI/UILoading";

import styles from "./FilteredPeople.module.css";

const FilteredPeople = ({ theme }) => {
	const allPeopleStoreData = useSelector(allPeopleSelector);
	const savedFiltersStoreData = useSelector(checkedFilters);
	const dispatch = useDispatch();
	const dispatchFiltered = () => {
		dispatch(saveCheckedFilters(checkedFields));
	};

	const [checkedFields, setCheckedFields] = useState(
		savedFiltersStoreData || {
			episode1: false,
			episode2: false,
			episode3: false,
			episode4: false,
			episode5: false,
			episode6: false,
		}
	);
	const [people, setPeople] = useState(allPeopleStoreData);
	const [filtered, setFiltered] = useState(null);

	useEffect(() => {
		people && setPeople(people?.sort((a, b) => (a.name > b.name ? 1 : -1)));
		filterPeopleByEpisodes();
		setPeople(allPeopleStoreData);
		setFiltered(allPeopleStoreData);
	}, [allPeopleStoreData]);

	useEffect(() => {
		filterPeopleByEpisodes();
		dispatchFiltered();
	}, [checkedFields]);

	const filterPeopleByEpisodes = () => {
		const checkedObjectEntries = Object.entries(checkedFields);
		const findEpisodeNumbers = checkedObjectEntries.filter(
			(item) => String(item[1]) == "true"
		);
		const checkedEpisodes = findEpisodeNumbers.map((ep) =>
			ep[0].split("episode").join("")
		);
		if (checkedEpisodes.length > 0) {
			const filteredPersonsByEpisodes = people?.map((person) => {
				const personEpisodes = person.films.map((film) =>
					film
						.slice(film.length - 3, film.length)
						.split("/")
						.join("")
				);
				for (let i = 0; i < checkedEpisodes.length; i++) {
					if (personEpisodes.indexOf(checkedEpisodes[i]) == -1) return null;
				}
				return person;
			});
			setFiltered(
				filteredPersonsByEpisodes?.filter(function (el) {
					return el != null;
				})
			);
		} else {
			setFiltered(people);
		}
	};

	const toggleCkeckBox = (e) => {
		const { target } = e;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;
		setCheckedFields((fields) => ({ ...fields, [name]: value }));
	};

	return (
		<div className={styles.container}>
			{people && people.length ? (
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
				</ul>
			) : (
				<UILoading theme={theme} />
			)}

			<div className={styles.filters__container}>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episode4}
						value={checkedFields.episode4}
						className={styles.filter__checkbox}
						type="checkbox"
						name="episode4"
					/>
					<label className={styles.filter__label} htmlFor="episode4">
						<span className={styles.filter__episode}>Episode</span> 1
					</label>
				</div>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episode5}
						value={checkedFields.episode5}
						className={styles.filter__checkbox}
						type="checkbox"
						name="episode5"
					/>
					<label className={styles.filter__label} htmlFor="episode5">
						<span className={styles.filter__episode}>Episode</span> 2
					</label>
				</div>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episode6}
						className={styles.filter__checkbox}
						type="checkbox"
						name="episode6"
					/>
					<label className={styles.filter__label} htmlFor="episode6">
						<span className={styles.filter__episode}>Episode</span> 3
					</label>
				</div>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episode1}
						value={checkedFields.episode1}
						className={styles.filter__checkbox}
						type="checkbox"
						name="episode1"
					/>
					<label className={styles.filter__label} htmlFor="episode1">
						<span className={styles.filter__episode}>Episode</span> 4
					</label>
				</div>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episode2}
						value={checkedFields.episode2}
						className={styles.filter__checkbox}
						type="checkbox"
						name="episode2"
					/>
					<label className={styles.filter__label} htmlFor="episode2">
						<span className={styles.filter__episode}>Episode</span> 5
					</label>
				</div>
				<div className={styles.filters__filter}>
					<input
						onChange={toggleCkeckBox}
						checked={checkedFields.episode3}
						value={checkedFields.episode3}
						className={styles.filter__checkbox}
						type="checkbox"
						name="episode3"
					/>
					<label className={styles.filter__label} htmlFor="episode3">
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
