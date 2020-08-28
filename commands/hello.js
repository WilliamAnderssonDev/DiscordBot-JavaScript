const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	message.channel.send(`Hello ${message.member.user}! :smile:`);
};

module.exports.config = {
	name: "hello", //command
	aliases: ["hi"], //command aliases
};
