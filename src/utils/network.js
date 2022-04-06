import { HTTP, HTTPS } from "@constants/api";

/**
 * this function changes url starts with 'http' to 'https'
 * @param {String} url - url to change
 * @returns {String} - url with https
 */
export const ChangeHTTP = (url) => {
	const result = url ? url.replace(HTTP, HTTPS) : url;

	return result;
};

/**
 * This function fetching data
 * @param {String} url  - query url
 * @returns {Promise} - Promise with query result
 */
export const getApiResource = async (url) => {
	try {
		const res = await fetch(url);
		if (!res.ok) {
			return false;
		}
		return await res.json();
	} catch (err) {
		console.error(err);
		return false;
	}
};
