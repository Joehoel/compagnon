const Command = require("../utils/Command");
const fetch = require("node-fetch");

const randomDab = async () => {
	const url = "https://api.giphy.com/v1/gifs/random?";
	const params = new URLSearchParams({
		api_key: process.env.API_KEY,
		tag: "dab",
	});
	const res = await fetch(`${url}${params}`);
	const { data } = await res.json();
	return data;
};

module.exports = new Command({
	name: "dab",
	description: "Sends a random dab gif in chat",
	async execute(client, message) {
		const { url } = await randomDab();
		message.channel.send(url);
	},
});
