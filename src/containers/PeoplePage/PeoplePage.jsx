import styles from "./PeoplePage.module.css";
import { getApiResource } from "../../utils/network";
import { API_PEOPLE } from "../../constants/api";
import { useEffect, useState } from "react";
import { getPeopleId, getPeopleImage } from "../../services/getPeopleData";
import PeopleList from "../../components/PeoplePage/PeopleList/PeopleList";

const PeoplePage = () => {
	const [people, setPeople] = useState(null);

	const getResource = async (url) => {
		const res = await getApiResource(API_PEOPLE);
		const peopleList = res.results.map(({ name, url }) => {
            const id = getPeopleId(url);
            const img = getPeopleImage(id);
            console.log(img);
			return {
                id,
				name,
                img
			};
		});
		setPeople(peopleList);
	};
	useEffect(() => {
		getResource(API_PEOPLE);
	}, []);
	return (
		<div>
			{people && 
				<PeopleList people={people}/>
			}
		</div>
	);
};

export default PeoplePage;
