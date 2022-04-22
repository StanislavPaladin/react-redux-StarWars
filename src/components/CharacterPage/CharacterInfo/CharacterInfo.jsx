import PropTypes from "prop-types";
import styles from "./CharacterInfo.module.css";

const CharacterInfo = ({ characterInfo }) => {
	return (
		<div className={styles.wrapper}>
			<ul className={styles.list__container}>
				{characterInfo.map(
					({ title, data }) =>
						data && (
							<li className={styles.list__item} key={title}>
								<span className={styles.item__title}>{title}</span>:{data}
							</li>
						)
				)}
			</ul>
		</div>
	);
};

CharacterInfo.propTypes = {
	characterInfo: PropTypes.array,
};

export default CharacterInfo;
