import styles from "./PeoplePage.module.css";
import { useEffect, useState } from "react";
import { withErorrApi } from "../../hoc-helpers/withErorrApi";
import { getApiResource } from "../../utils/network";
import { API_PEOPLE } from "../../constants/api";
import { getPeopleId, getPeopleImage } from "../../services/getPeopleData";
import PeopleList from "../../components/PeoplePage/PeopleList/PeopleList";

const PeoplePage = ({setErrorApi}) => {
	const [people, setPeople] = useState(null);
	

	const getResource = async (url) => { 
		const res = await getApiResource(url+1);
		if (res) {
			const peopleList = res.results.map(({ name, url }) => {
				const id = getPeopleId(url);
				const img = getPeopleImage(id);
				console.log(img);
				return {
					id,
					name,
					img,
				};
			});
			setPeople(peopleList);
			setErrorApi(false);
		} else {
			setErrorApi(true);
		}
	};
	useEffect(() => {
		getResource(API_PEOPLE);
	}, []);
	return (
		<>
        <h1>Navigation</h1>
        {people && <PeopleList people={people}/>}
        </>
	);
};

export default withErorrApi(PeoplePage) ;

