import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { makeCurrentRequest, ChangeHTTP } from "@utils/network";

import styles from "./CharacterFilms.module.css";

const CharacterFilms = ({ characterFilms }) => {
	const [filmsName, setFilmsName] = useState([]);
	useEffect(() => {
		(async () => {
			const filmsHTTPS = characterFilms.map((url) => ChangeHTTP(url));
			console.log('filmsHTTPS', filmsHTTPS)
			const response = await makeCurrentRequest(filmsHTTPS);
            const sortedFilmsByEpisodeId = response.sort((a, b) => a.episode_id > b.episode_id ? 1 : -1);
			setFilmsName(sortedFilmsByEpisodeId);
		})();
	}, []);

	return (
		<div className={styles.wrapper}>
			<ul className={styles.list__container}>
				{filmsName.map(({ title, episode_id }) => (
					<li key={episode_id} className={styles.list__item}>
						<span className={styles.item__episode}>Episode {episode_id}</span>
						<span className={styles.item__colon}>:</span>
						<span className={styles.item__title}>{title}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

CharacterFilms.propTypes = {
	characterFilms: PropTypes.array,
};

export default CharacterFilms;
