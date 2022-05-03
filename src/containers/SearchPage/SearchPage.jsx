import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

import SearchPageInfo from "@components/SearchPage/SearchPageInfo";
import UIInput from "@components/UI/UIInput";
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
		getResponse("");
	}, []);

	const debouncedResponse = useCallback(
		debounce((value) => getResponse(value), 300),
		[]
	);

	const handleChange = (value) => {
		setInputValue(value);
		debouncedResponse(value);
	};
	return (
		<>
			<h1 className="header__text">Search</h1>
			<UIInput
				placeholder="search characters"
				value={inputValue}
				handleChange={handleChange}
				classes={styles.input__search}
			/>
			<SearchPageInfo people={people} />
		</>
	);
};

SearchPage.propTypes = {
	setErrorApi: PropTypes.func,
};

export default withErorrApi(SearchPage);
