import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";

import SearchPageInfo from "@components/SearchPage/SearchPageInfo";
import UIInput from "@components/UI/UIInput";
import UILoading from "@components/UI/UILoading";
import { saveSearchResults } from "@store/actions";
import {
	searchResultsSelector,
	themeSelector,
} from "@store/constants/selectors";
import { withErorrApi } from "@hoc-helpers/withErorrApi";
import { getApiResource } from "@utils/network";
import { API_SEARCH } from "@constants/api";
import { getPeopleImage, getPeopleId } from "@services/getPeopleData";

import styles from "./SearchPage.module.css";

const SearchPage = ({ setErrorApi }) => {
	const dispatch = useDispatch();
	const dispatchSearchResults = (themeName) => {
		dispatch(saveSearchResults(themeName));
	};
	const storeData = useSelector(searchResultsSelector);
	const theme = useSelector(themeSelector);

	const [loading, setLoading] = useState(false);
	const [flagState, setFlagState] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [people, setPeople] = useState([]);

	const getResponse = async (param) => {
		if (!flagState) {
			setLoading(true);
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
				setLoading(false);
			} else {
				setErrorApi(true);
				setLoading(false);
			}
		}
		return;
	};

	useEffect(() => {
		typeof(storeData) === 'string' ? getResponse(storeData) : getResponse("");
		typeof(storeData) === 'string' ? setInputValue(storeData) : setInputValue('');
		return () => {
			setFlagState(true);
		};
	}, []);

	const debouncedResponse = useCallback(
		debounce((value) => getResponse(value), 300),
		[]
	);

	const handleChange = (value) => {
		setInputValue(value);
		debouncedResponse(value);
		dispatchSearchResults(value);
	};

	return (
		<div className={styles.container}>
			<h1 className="header__text">Search</h1>
			<UIInput
				placeholder="search characters"
				value={inputValue}
				handleChange={handleChange}
				classes={styles.input__search}
			/>
			<div className={styles.search__results}>
				{loading ? (
					<UILoading theme={theme} isShadow={true} classes={"center"} />
				) : (
					<SearchPageInfo people={people} />
				)}
			</div>
		</div>
	);
};

SearchPage.propTypes = {
	setErrorApi: PropTypes.func,
};

export default withErorrApi(SearchPage);
