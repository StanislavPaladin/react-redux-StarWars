import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { withErorrApi } from "@hoc-helpers/withErorrApi";
import {
	allPeopleSelector,
	checkedFilters,
	favoritesSelector,
} from "@store/constants/selectors";
import { saveCheckedFilters } from "@store/actions";
import { setPersonToFavorite, removePersonFromFavorite } from "@store/actions";
import { API_GET_ALL_PEOPLE } from "@constants/api";
import { getPeopleId, getPeopleImage } from "@services/getPeopleData";
import { fetchAllData } from "@utils/network";
import { fetchAllPersons } from "@store/actions";
import UILoading from "@components/UI/UILoading";
import starFilledImg from "./img/star-fill.svg";
import starEmptyImg from "./img/star.svg";

import styles from "./FilteredPeople.module.css";

const FilteredPeople = ({ theme, setErrorApi }) => {
	const allPeopleStoreData = useSelector(allPeopleSelector);
	const savedFiltersStoreData = useSelector(checkedFilters);
	const favoritePeople = useSelector(favoritesSelector);
	const favoriteCharacters = Object.entries(favoritePeople);

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
	const [loading, setLoading] = useState(false);


	const checkedObjectEntries = Object.entries(checkedFields);
	const findEpisodeNumbers = checkedObjectEntries.filter(
		(item) => item[1] === true
	);

	const dispatchFilteredPeople = (people) => {
		dispatch(fetchAllPersons(people));
	};

	const getResource = async (url) => {
		setLoading(true);
		try {
			const res = await fetchAllData(url);
			const peopleList = res.map(({ name, url, films }) => {
				const id = getPeopleId(url);
				const img = getPeopleImage(id);
				return {
					id,
					name,
					img,
					films,
				};
			});
			dispatchFilteredPeople(peopleList);
			setErrorApi(false);
		} catch (err) {
			setErrorApi(true);
			console.error("error", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		!findEpisodeNumbers.length && getResource(API_GET_ALL_PEOPLE);
	}, []);

	useEffect(() => {
		// sorting by name
		// people && setPeople(people?.sort((a, b) => (a.name > b.name ? 1 : -1)));
		filterPeopleByEpisodes();
		setPeople(allPeopleStoreData);
		setFiltered(allPeopleStoreData);
	}, [allPeopleStoreData]);

	useEffect(() => {
		filterPeopleByEpisodes();
		dispatchFiltered();
	}, [checkedFields]);

	const filterPeopleByEpisodes = () => {

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
					if (personEpisodes.indexOf(checkedEpisodes[i]) === -1) return null;
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
		const value = target.checked;
		const { name } = target;
		setCheckedFields((fields) => ({ ...fields, [name]: value }));
	};

	const dispatchFavorites = (e, id, name, img, isFavorite) => {
		e.preventDefault();
		if (!isFavorite) {
			dispatch(
				setPersonToFavorite({
					[id]: {
						name: name,
						img: img,
					},
				})
			);
		} else {
			dispatch(removePersonFromFavorite(id));
		}
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
									{!!favoriteCharacters.find((item) => item[0] === id) ? (
										<img
											onClick={(e) => dispatchFavorites(e, id, name, img, true)}
											className={styles.person__favorite}
											src={starFilledImg}
											alt="favorite"
										/>
									) : (
										<img
											onClick={(e) => dispatchFavorites(e, id, name, img, false)}
											className={styles.person__favorite}
											src={starEmptyImg}
											alt="not favorite"
										/>
									)}
								</Link>
							</li>
						))}
				</ul>
			) : (
				<div className={styles.loader__wrapper}>
					<UILoading theme={theme} isShadow={true} />
					<h1 className="header__text">Please wait a bit. We fetching all characters data</h1>
				</div>
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

export default withErorrApi(FilteredPeople);
