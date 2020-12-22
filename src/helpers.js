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

/**
 * Fetches a random post from the subreddit provided;
 * @param {string} sub Subreddit name
 * @returns {Promise<string>} Post url
 */
const meme = async sub => {
	const url = `https://reddit.com/r/${sub}/random.json?`;
	const params = new URLSearchParams({
		limit: 1,
	});
	const res = await fetch(`${url}${params}`);
	const data = await res.json();

	return `https://reddit.com${data[0].data.children[0].data.permalink}`;
};

module.exports = { gif, meme };
