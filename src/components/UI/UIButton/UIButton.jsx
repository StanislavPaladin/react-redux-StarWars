import PropTypes from "prop-types";
import cn from 'classnames';

import '../index.css'
import styles from "./UIButton.module.css";

const UIButton = ({ disabled, handleClick, text, theme="dark", classes }) => {
	return (
		<>
			<button disabled={disabled} onClick={handleClick} className={cn(styles.button, styles[theme], classes)}>
				{text}
			</button>
		</>
	);
};

UIButton.propTypes = {
	page: PropTypes.bool,
	handleClick: PropTypes.func,
	text: PropTypes.string,
	theme: PropTypes.string,
	classes: PropTypes.string,
};

export default UIButton;
