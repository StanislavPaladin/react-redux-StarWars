import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import UILoading from "@components/UI/UILoading/UILoading";
import FilteredPeople from "@components/FilteredPeople";
import { withErorrApi } from "@hoc-helpers/withErorrApi";
import { fetchAllData } from "@utils/network";
import { API_GET_ALL_PEOPLE } from "@constants/api";
import { getPeopleId, getPeopleImage } from "@services/getPeopleData";
import { themeSelector } from "@store/constants/selectors";

import styles from "./FilterPage.module.css";

const FilterPage = ({ setErrorApi }) => {
	const theme = useSelector(themeSelector);

	return (
		<div className={styles.container}>
			<FilteredPeople theme={theme}/>
		</div>
	);
};

FilterPage.propTypes = {
	setErrorApi: PropTypes.func,
};

export default withErorrApi(FilterPage);
