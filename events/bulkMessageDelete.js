const { MessageEmbed } = require("discord.js")
const fs = require("fs")

module.exports = (client) => {
  client.on("messageDeleteBulk", async (messages) => {
    const x = messages.random().guild.channels.resolve("917259857822879764")
    const embed = new MessageEmbed()
    .setColor('#FFD700')
        .setAuthor(messages.random().guild.name, messages.random().guild.iconURL)
        .setDescription(`**${Array.from(messages.keys()).length} messages got deleted in** ${messages.random().channel}`)
        .setFooter(`ID: ${messages.random().guild.id}`)
        .setTimestamp();
        await x?.send({embeds: [embed]}).catch();
  })
}