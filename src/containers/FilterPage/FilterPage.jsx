import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import PeopleNavigation from "@components/PeoplePage/PeopleNavigation";
import UILoading from "@components/UI/UILoading/UILoading";
import FilteredPeople from "@components/FilteredPeople";
import { withErorrApi } from "@hoc-helpers/withErorrApi";
import { fetchAllData } from "@utils/network";
import { API_GET_ALL_PEOPLE } from "@constants/api";
import {
	getPeopleId,
	getPeopleImage,
} from "@services/getPeopleData";
import { themeSelector } from "@store/constants/selectors";

import styles from "./FilterPage.module.css";

const FilterPage = ({ setErrorApi }) => {
	const theme = useSelector(themeSelector);
	const [flagState, setFlagState] = useState(false);
	const [people, setPeople] = useState(null);


	const getResource = async (url) => {
		if (!flagState) {
			const res = await fetchAllData(url);
			if (res) {
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
				setPeople(peopleList);
				console.log('peopleList', peopleList)
				setErrorApi(false);
			} else {
				setErrorApi(true);
			}
		}
	};

	useEffect(() => {
		getResource(API_GET_ALL_PEOPLE);
		return () => {
			setFlagState(true);
		};
	}, []);

	return (
		<div className={styles.container}>
			{people ? (
				<>
					<FilteredPeople
						people={people}
						setPeople={setPeople}
						getResource={getResource}
					/>
				</>
			) : (
				<UILoading theme={theme} isShadow={true} classes={""} />
			)}
		</div>
	);
};

FilterPage.propTypes = {
	setErrorApi: PropTypes.func,
};

export default withErorrApi(FilterPage);
