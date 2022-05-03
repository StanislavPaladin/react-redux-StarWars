import PropTypes from "prop-types";
import cn from "classnames";
import icon from "./img/cancel.svg";

import styles from "./UIInput.module.css";

const UIInput = ({ value, handleChange, placeholder, classes }) => {
	return (
		<div className={cn(styles.container__input, classes)}>
			<input
				type="text"
				placeholder={placeholder}
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				className={styles.input}
			/>
			<img
				onClick={() => value && handleChange('')}
				src={icon}
				alt="clear"
				className={cn(styles.clear, !value && styles.clear__disabled)}
			/>
		</div>
	);
};

UIInput.propTypes = {
	value: PropTypes.string,
	handleChange: PropTypes.func,
	placeholder: PropTypes.string,
	classes: PropTypes.string,
};

export default UIInput;
