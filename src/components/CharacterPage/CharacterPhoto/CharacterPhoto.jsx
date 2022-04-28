import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setPersonToFavorite, removePersonFromFavorite } from "@store/actions";
import favoriteIcon from "./img/star.svg";
import favoriteIconFilled from "./img/star-fill.svg";

import styles from "./CharacterPhoto.module.css";

const CharacterPhoto = ({
	characterPhoto,
	characterName,
	characterId,
	setCharacterFavorite,
	characterFavorite,
}) => {
	const dispatch = useDispatch();

	const dispatchFavorites = () => {
		if (!characterFavorite) {
			dispatch(
				setPersonToFavorite({
					[characterId]: {
						name: characterName,
						img: characterPhoto,
					},
				})
			);
			setCharacterFavorite(true);
		} else {
			dispatch(removePersonFromFavorite(characterId));
			setCharacterFavorite(false);
		}
	};

	return (
		<>
			<div className={styles.container}>
				<img className={styles.photo} src={characterPhoto} alt={characterName} />
				<img
					src={characterFavorite ? favoriteIconFilled : favoriteIcon}
					alt="favorites"
					onClick={dispatchFavorites}
					className={styles.favorite}
				/>
			</div>
		</>
	);
};

CharacterPhoto.propTypes = {
	characterPhoto: PropTypes.string,
	characterName: PropTypes.string,
	characterId: PropTypes.string,
	setCharacterFavorite: PropTypes.func,
	characterFavorite: PropTypes.bool
};

export default CharacterPhoto;
