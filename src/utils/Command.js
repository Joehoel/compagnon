/* eslint-disable */
const { Client, Message } = require("discord.js");

/**
 * @typedef {(client: Client, message: Message, args: string[]) => void} Execute
 */

/**
 * Default structure of a discord command
 * @class
 */
module.exports = class Command {
	/**
	 * Creates an instance of Command.
	 * @param {CommandArgs}
	 */
	constructor({ name, usage, admin, args, description, execute }) {
		this.name = name;
		this.usage = usage || null;
		this.admin = admin || false;
		this.args = args || false;
		this.description = description;
		this.execute = execute;
	}
};

/**
 * @typedef {Object} CommandArgs
 * @property {string} name
 * @property {string} usage
 * @property {string} description
 * @property {?boolean} admin
 * @property {?boolean} args
 * @property {Execute} execute
 */
