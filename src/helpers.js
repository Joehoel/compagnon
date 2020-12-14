const fetch = require("node-fetch");

/**
 * Fetches a random dab gif from the giphy api
 * @param {string} tag
 * @return {string} GIF url
 */
const gif = async tag => {
	const url = "https://api.giphy.com/v1/gifs/random?";
	const params = new URLSearchParams({
		api_key: process.env.API_KEY,
		tag,
	});
	const res = await fetch(`${url}${params}`);
	const { data } = await res.json();
	return data;
};

module.exports = { gif };
