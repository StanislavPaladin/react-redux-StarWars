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
	getPeopleId,
	getPeopleImage,
	getPeoplePageId,
} from "@services/getPeopleData";
import { useQueryParams } from "@hooks/useQueryParams";

import styles from "./PeoplePage.module.css";

const PeoplePage = ({ setErrorApi }) => {
	const theme = useSelector((state) => state.themeReducer);

	const [people, setPeople] = useState(null);
	const [prevPage, setPrevPage] = useState(null);
	const [nextPage, setNextPage] = useState(null);
	const [counterPage, setCounterPage] = useState(1);

	const query = useQueryParams();
	const queryPage = query.get("page");

	const getResource = async (url) => {
		const res = await getApiResource(url);
		if (res) {
			const peopleList = res.results.map(({ name, url }) => {
				const id = getPeopleId(url);
				const img = getPeopleImage(id);
				return {
					id,
					name,
					img,
				};
			});
			setPeople(peopleList);
			setPrevPage(ChangeHTTP(res.previous));
			setNextPage(ChangeHTTP(res.next));
			setCounterPage(getPeoplePageId(url));
			setErrorApi(false);
		} else {
			setErrorApi(true);
		}
	};

	useEffect(() => {
		getResource(API_PEOPLE + queryPage);
	}, []);
	
	return (
		<div className={styles.container}>
			<PeopleNavigation
				getResource={getResource}
				prevPage={prevPage}
				nextPage={nextPage}
				counterPage={counterPage}
			/>
			{people ? <PeopleList people={people} getResource={getResource}/> : <UILoading theme={theme} isShadow={true} classes={""} />}
			{/* {people && 
				<Suspense
				fallback={<UILoading theme={"white"} isShadow={true} classes={""} />}
			>
				<PeopleList people={people} getResource={getResource}/>
			</Suspense>
				} */}
		</div>
	);
};

PeoplePage.propTypes = {
	setErrorApi: PropTypes.func,
};

export default withErorrApi(PeoplePage);
