import {
	SWAPI_PEOPLE,
	HTTP,
	HTTPS,
	SWAPI_ROOT,
	GUIDE_IMG_EXTENTION,
	URL_IMG_PERSON,
} from "../constants/api";

const getId = (url, category) => {
	const id = url.replace(HTTPS + SWAPI_ROOT + category, "").replace(/\//g, "");
	return id;
};

export const getPeopleId = (url) => getId(url, SWAPI_PEOPLE);
export const getPeopleImage = (id) => `${URL_IMG_PERSON}/${id}${GUIDE_IMG_EXTENTION}`;
