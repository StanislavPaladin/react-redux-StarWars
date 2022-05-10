import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import FilteredPeople from "@components/FilteredPeople";
import { withErorrApi } from "@hoc-helpers/withErorrApi";
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
