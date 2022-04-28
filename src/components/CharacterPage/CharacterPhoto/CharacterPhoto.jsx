import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {setPersonToFavorite, removePersonFromFavorite} from "@store/actions"

import styles from "./CharacterPhoto.module.css";

const CharacterPhoto = ({ characterPhoto, characterName, characterId }) => {
	const dispatch = useDispatch();

	const add = () => {
		dispatch(setPersonToFavorite({
			[characterId]: {
				name: characterName,
				img: characterPhoto
			}
		}));
	}
	const remove = () => {
		dispatch(removePersonFromFavorite(characterId));
	}

	return (
		<>
		<div className={styles.container}>
			<img className={styles.photo} src={characterPhoto} alt={characterName} />
		</div>
		<button onClick={add}>add to favorites</button>
		<button onClick={remove}>remove from favorites</button>
		</>
	);
};

CharacterPhoto.propTypes = {
	characterPhoto: PropTypes.string,
	characterName: PropTypes.string,
	characterId: PropTypes.string
};

export default CharacterPhoto;

