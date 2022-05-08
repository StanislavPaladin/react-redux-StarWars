import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPersonToFavorite, removePersonFromFavorite } from "@store/actions";
import { favoritesSelector } from "@store/constants/selectors";
import favoriteIcon from './img/star-fill.svg';
import notFavoriteIcon from './img/star.svg'

import styles from "./PeopleList.module.css";
const PeopleList = ({ people, getResource }) => {
	const dispatch = useDispatch();
	const favoritePeople = useSelector(favoritesSelector);
	const favoriteCharacters = Object.entries(favoritePeople);

	const dispatchFavorites = (e, id, name, img, isFavorite) => {
		e.preventDefault();
		if(!isFavorite) {
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
			<ul className={styles.list__container}>
				{people.map(({ name, id, img }) => (
					<li key={id} className={styles.list__item}>
						<Link to={`/people/${id}`}>
							<img src={img} alt={name} className={styles.person__photo} />
							<p>{name}</p>
							{!!favoriteCharacters.find((item) => item[0] === id) ? (
										<img
											onClick={(e) => dispatchFavorites(e,id, name, img, true)}
											className={styles.person__favorite}
											src={favoriteIcon}
											alt="favorite"
										/>
									) : (
										<img
											onClick={(e) => dispatchFavorites(e,id, name, img, false)}
											className={styles.person__favorite}
											src={notFavoriteIcon}
											alt="not favorite"
										/>
									)}
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
