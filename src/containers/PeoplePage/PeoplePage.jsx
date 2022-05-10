import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { withErorrApi } from "@hoc-helpers/withErorrApi";
import PeopleList from "@components/PeoplePage/PeopleList/PeopleList";
import PeopleNavigation from "@components/PeoplePage/PeopleNavigation";
import UILoading from "@components/UI/UILoading/UILoading";
import { getApiResource, ChangeHTTP } from "@utils/network";
import { API_PEOPLE } from "@constants/api";
import {
	getPeoplePageId,
	returnFetchingResult,
} from "@services/getPeopleData";
import { useQueryParams } from "@hooks/useQueryParams";
import { themeSelector } from "@store/constants/selectors";

import styles from "./PeoplePage.module.css";

const PeoplePage = ({ setErrorApi }) => {
	const theme = useSelector(themeSelector);
	const [flagState, setFlagState] = useState(false);
	const [people, setPeople] = useState(null);
	const [prevPage, setPrevPage] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [counterPage, setCounterPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const query = useQueryParams();
	const queryPage = query.get("page");

	const getResource = async (url) => {
		if (!flagState) {
			setLoading(true);
			try {
				const res = await returnFetchingResult(url, getApiResource);
				res&&setLoading(false);
				setPeople(res.peopleList);
				setPrevPage(ChangeHTTP(res.allData.previous));
				setNextPage(ChangeHTTP(res.allData.next));
				setCounterPage(getPeoplePageId(url));
				setErrorApi(false);
			} catch (error) {
				setErrorApi(true);
				console.log("error", error);
			}
			finally {
				setLoading(false)
			}
		}
	};

	useEffect(() => {
		getResource(API_PEOPLE + queryPage);
		return () => {
			setFlagState(true);
		};
	}, []);

	return (
		<div className={styles.container}>
			<PeopleNavigation
				getResource={getResource}
				prevPage={prevPage}
				nextPage={nextPage}
				counterPage={counterPage}
				loading={loading}
			/>

			{people&&!loading ? (
				<PeopleList people={people} getResource={getResource} />
			) : (
				<UILoading theme={theme} isShadow={true} classes={""} />
			)}
		</div>
	);
};

PeoplePage.propTypes = {
	setErrorApi: PropTypes.func,
};

export default withErorrApi(PeoplePage);
