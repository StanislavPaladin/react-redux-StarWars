import { useParams } from "react-router";
import PropTypes from "prop-types";

import CharacterInfo from "@components/CharacterPage/CharacterInfo/CharacterInfo";
import CharacterPhoto from "@components/CharacterPage/CharacterPhoto/CharacterPhoto";

import { getApiResource } from "@utils/network";
import { API_CHARACTER } from "@constants/api";
import { withErorrApi } from "@hoc-helpers/withErorrApi";
import { getPeopleImage } from "@services/getPeopleData";
import { useEffect, useState } from "react";

import styles from "./CharacterPage.module.css";

const CharacterPage = ({ setErrorApi }) => {
	const id = useParams().id;
	const [characterInfo, setCharacterInfo] = useState(null);
	const [characterName, setCharacterName] = useState(null);
	const [characterPhoto, setCharacterPhoto] = useState(null);

	useEffect(() => {
		(async () => {
			const res = await getApiResource(API_CHARACTER + id + "/");
			if (res) {
				setCharacterInfo([
					{ title: "Height", data: res.height },
					{ title: "Mass", data: res.mass },
					{ title: "Hari Color", data: res.mair_Color },
					{ title: "Skin color", data: res.skin_color },
					{ title: "Eye color", data: res.eye_color },
					{ title: "Birth year", data: res.birth_year },
					{ title: "Gender", data: res.gender },
				]);
				setCharacterName(res.name);
				setCharacterPhoto(getPeopleImage(id));
				console.log(characterPhoto);
				setErrorApi(false);
			} else {
				setErrorApi(true);
			}
		})();
	}, []);
	return (
		<>
			<div className={styles.wrapper}>
				<span className={styles.person__name}>{characterName}</span>
				<div className={styles.container}>
					<CharacterPhoto characterPhoto={characterPhoto} characterName={characterName} />
					{characterInfo && <CharacterInfo characterInfo={characterInfo} />}
				</div>
			</div>
		</>
	);
};

CharacterPage.propTypes = {
	setErrorApi: PropTypes.func,
};

export default withErorrApi(CharacterPage);
