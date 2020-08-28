const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	var timeToDel = 3000;

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

	if (args[0] >= 1 && args[0] <= 100) {
		if (args[0] == 100) {
			var msgToDel = parseInt(args[0]);
			message.channel.bulkDelete(msgToDel).then(() => {
				message.channel
					.send(`:white_check_mark: Cleared: **${args[0]}** messages!`)
					.then((msg) => {
						msg.delete({ timeout: timeToDel });
					})
					.catch();
			});
		} else {
			var msgToDel = parseInt(args[0]);
			msgToDel += 1;
			message.channel.bulkDelete(msgToDel).then(() => {
				message.channel
					.send(`:white_check_mark: Cleared: **${args[0]}** messages!`)
					.then((msg) => {
						msg.delete({ timeout: timeToDel });
					})
					.catch();
			});
		}
	} else {
		message.delete({ timeout: timeToDel });
		message.channel
			.send(":x: Please specify an amount between 2-100! :x:")
			.then((msg) => {
				msg.delete({ timeout: timeToDel });
			})
			.catch();
	}
};

module.exports.config = {
	name: "purge", //command
	aliases: ["clearchat", "clear", "cc"], //command aliases
};
