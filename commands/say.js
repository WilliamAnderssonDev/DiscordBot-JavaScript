const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	var timeToDel = 3000;

	if (!args[0] && message.member.hasPermission("MANAGE_MESSAGES")) {
		message.delete({ timeout: timeToDel });
		message.channel
			.send(":x: Please specify an message for the bot to say! :x:")
			.then((msg) => {
				msg.delete({ timeout: timeToDel });
			})
			.catch();
	}

	if (!message.member.hasPermission("MANAGE_MESSAGES")) {
		message.delete({ timeout: timeToDel });
		message.channel
			.send(
				`:x: Sorry ${message.member.user}, you dont have permission to do that command! :x:`
			)
			.then((msg) => {
				msg.delete({ timeout: timeToDel });
			})
			.catch();
	}

	if (args[0] && message.member.hasPermission("MANAGE_MESSAGES")) {
		message.delete();
		message.channel.send(args.join(" "));
	}
};

module.exports.config = {
	name: "say", //command
	aliases: [""], //command aliases
};
