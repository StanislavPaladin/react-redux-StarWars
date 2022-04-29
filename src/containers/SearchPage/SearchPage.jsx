import PropTypes from "prop-types";
import { useState } from "react";
import { withErorrApi } from "@hoc-helpers/withErorrApi";
import { getApiResource } from "@utils/network";
import { API_SEARCH } from "@constants/api";
import { getPeopleImage, getPeopleId } from "@services/getPeopleData";

import styles from "./SearchPage.module.css";

const SearchPage = ({ setErrorApi }) => {
	const [inputValue, setInputValue] = useState("");
	const [people, setPeople] = useState([]);

	const getResponse = async (param) => {
		const res = await getApiResource(API_SEARCH + param);
		if (res) {
			const peopleList = res.results.map(({ name, url }) => {
                const id = getPeopleId(url);
                const img = getPeopleImage(id);
				return {
                    id,
                    name,
                    img
                };
			});
            setPeople(peopleList);
			setErrorApi(false);
		} else {
			setErrorApi(true);
		}
	};

	const handleChange = (event) => {
		const value = event.target.value;
		setInputValue(value);
		getResponse(value);
	};
	return (
		<>
			<h1 className="header__text">Search</h1>
			<input
				type="text"
				placeholder="search characters"
				value={inputValue}
				onChange={handleChange}
			/>
		</>
	);
};

SearchPage.propTypes = {
	setErrorApi: PropTypes.func,
};

export default withErorrApi(SearchPage);
