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

/**
 * function which handle arrays of urls and fetching data from that urls
 * @param {String} url  --query url (array of urls)
 * @returns {Promise} --result of Promise.all()
 */
export const makeCurrentRequest = async (url) => {
	const res = await Promise.all(
		url.map((res) => {
			return fetch(res).then((res) => res.json());
		})
	);
	return res;
};

const fetchNext = async (url, allData) => {
	try {
		const res = await fetch(url);
		if (!res.ok) {
			return false;
		}
		const data = await res.json();
		const results = data.results;
		allData.push(results);
		if (data.next) {
			await fetchNext(data.next, allData);
		} else {
			return {};
		}
		return results;
	} catch (err) {
		console.error(err);
		return false;
	}
};

export const fetchAllData = async (url) => {
	const allData = [];
	try {
		const res = await fetch(url);
		if (!res.ok) {
			return false;
		}
		const data = await res.json();
		data.next && (await fetchNext(data.next, allData));
		return await allData.flat();
	} catch (err) {
		console.error(err);
		return false;
	}
};
