import {useNavigate } from "react-router-dom"
import iconBack from "./img/left_arrow.svg"
import styles from "./CharacterLinkBack.module.css";

const CharacterLinkBack = () => {
    const navigate = useNavigate();

	const handleGoBack = (e) => {
        e.preventDefault();
        navigate(-1);
    };

	return (
		<a href="#" onClick={handleGoBack} className={styles.link}>
            <img className={styles.link__img} src={iconBack} alt="Go back" />
			<span>Go back</span>
		</a>
	);
};



export default CharacterLinkBack;
