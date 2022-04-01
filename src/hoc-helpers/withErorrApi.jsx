import { useState } from "react";
import ErrorMessage from "@components/PeoplePage/PeopleList/ErrorMessage";
export const withErorrApi = (View) => {
    return (props) => {
        const [errorApi, setErrorApi] = useState(false);
		return (
			<>
				<div >
					{errorApi ? (
						<h2><ErrorMessage/></h2>
					) : (
							<View setErrorApi={setErrorApi}
                            {...props}
                            />
					)}
				</div>
			</>
		);
	};
};
