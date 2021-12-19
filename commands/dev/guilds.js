const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "guilds",
  aliases: ["servers","serverlist","guildlist"],
  description: "View all the guilds the bot is in.",
  usage: `${process.env.PREFIX}guilds`,
  run: async (message, args, client) => {
    if (!client.botAdmin(message.author.id)) return
    let msg = ""
    let guildids = client.guilds.cache.map(guild => guild.id)
    for (i=0;i<guildids.length;i++) {
      msg += `${client.guilds.resolve(guildids[i]).name} - ${guildids[i]}\n`
    }
    message.reply(msg)
  },
}