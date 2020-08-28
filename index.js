const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });
require("dotenv").config();
//WA-BOT
//GitHub: https://github.com/WilliamAnderssonDev/DiscordBot-JavaScript
//Discord: Willeexd#2958
//
//Bot Invite link
//https://discord.com/oauth2/authorize?client_id=689830249281749103&scope=bot&permissions=2146958847

console.clear();
console.log("STARTING BOT...");
bot.on("ready", async () => {
	console.clear();
	console.log(`\x1b[32m`, `___       ________       _______________________`);
	console.log(`\x1b[32m`, `__ |     / /__    |      ___  __ )_  __ \__  __/`);
	console.log(`\x1b[32m`, `__ | /| / /__  /| |________  __  |  / / /_  /   `);
	console.log(`\x1b[32m`, `__ |/ |/ / _  ___ |/_____/  /_/ // /_/ /_  /    `);
	console.log(`\x1b[32m`, `____/|__/  /_/  |_|      /_____/ \____/ /_/     `);
	console.log(`\x1b[32m`, `IS NOW ONLINE`);

	bot.user.setActivity("Prefix: '" + botconfig.prefix + "'", {
		type: "PLAYING",
	});
});

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if (err) console.log(err);

	let jsfile = files.filter((f) => f.split(".").pop() === "js");
	if (jsfile.length <= 0) {
		console.log("\x1b[31m", "[LOGS] Couldn't Find Commands!");
	}

	jsfile.forEach((f, i) => {
		let pull = require(`./commands/${f}`);
		bot.commands.set(pull.config.name, pull);
		pull.config.aliases.forEach((alias) => {
			bot.aliases.set(alias, pull.config.name);
		});
	});
});

bot.on("message", async (message) => {
	if (message.author.bot || message.channel.type === "dm") return;

	let prefix = botconfig.prefix;
	let messageArray = message.content.split(" ");
	let cmd = messageArray[0].toLowerCase();
	let args = messageArray.slice(1);

	if (!message.content.startsWith(prefix)) return;
	let commandFile =
		bot.commands.get(cmd.slice(prefix.length)) ||
		bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)));
	if (commandFile) commandFile.run(bot, message, args);
});

//Login the bot
bot.login(process.env.BOT_TOKEN);
