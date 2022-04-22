import PropTypes from "prop-types";
import styles from "./CharacterPhoto.module.css";

const CharacterPhoto = ({ characterPhoto, characterName }) => {
	return (
		<div className={styles.container}>
			<img className={styles.photo} src={characterPhoto} alt={characterName} />
		</div>
	);
};

CharacterPhoto.propTypes = {
	characterPhoto: PropTypes.string,
	characterName: PropTypes.string,
};

export default CharacterPhoto;
