import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
    return <div>
        <p className={styles.text}> 
            Error has occured. Couldn't fetch data
        </p>
    </div>;
}

export default ErrorMessage;
