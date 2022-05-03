import { useParams } from "react-router";
import PropTypes from "prop-types";
import React, { useEffect, useState, Suspense } from "react";
import { useSelector } from "react-redux";

import CharacterInfo from "@components/CharacterPage/CharacterInfo/CharacterInfo";
import CharacterPhoto from "@components/CharacterPage/CharacterPhoto";
import CharacterLinkBack from "@components/CharacterPage/CharacterLinkBack";
import UILoading from "@components/UI/UILoading/UILoading";

import { getApiResource } from "@utils/network";
import { API_CHARACTER } from "@constants/api";
import { withErorrApi } from "@hoc-helpers/withErorrApi";
import { getPeopleImage } from "@services/getPeopleData";

import styles from "./CharacterPage.module.css";

const CharacterFilms = React.lazy(() =>
	import("@components/CharacterPage/CharacterFilms/CharacterFilms")
);

const CharacterPage = ({ setErrorApi }) => {
	const storeData = useSelector((state) => state.favoriteReducer);
	const [characterId, setCharacterId] = useState(null);
	const [characterInfo, setCharacterInfo] = useState(null);
	const [characterName, setCharacterName] = useState(null);
	const [characterPhoto, setCharacterPhoto] = useState(null);
	const [characterFilms, setCharacterFilms] = useState(null);
	const [characterFavorite, setCharacterFavorite] = useState(null);
	const id = useParams().id;
	
	useEffect(() => {
		(async () => {
			const res = await getApiResource(API_CHARACTER + id + "/");
			setCharacterId(id);
			storeData[id] ? setCharacterFavorite(true) : setCharacterFavorite(false);
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
				res.films.length && setCharacterFilms(res.films);
				setErrorApi(false);
			} else {
				setErrorApi(true);
			}
		})();
	}, []);
	return (
		<>
			<CharacterLinkBack />
			<div className={styles.wrapper}>
				<span className={styles.person__name}>{characterName}</span>
				<div className={styles.container}>
					{characterPhoto && characterName && (
						<Suspense fallback={<UILoading isShadow={true} classes={""} />}>
							<CharacterPhoto
								characterPhoto={characterPhoto}
								characterName={characterName}
								characterId={characterId}
								characterFavorite={characterFavorite}
								setCharacterFavorite={setCharacterFavorite}
							/>
						</Suspense>
					)}
					{characterInfo && (
						<Suspense fallback={<UILoading isShadow={true} classes={""} />}>
							<CharacterInfo characterInfo={characterInfo} />
						</Suspense>
					)}
					{characterFilms && (
						<Suspense fallback={<UILoading isShadow={true} classes={""} />}>
							<CharacterFilms characterFilms={characterFilms} />
						</Suspense>
					)}
				</div>
			</div>
		</>
	);
};

CharacterPage.propTypes = {
	setErrorApi: PropTypes.func,
};

export default withErorrApi(CharacterPage);
