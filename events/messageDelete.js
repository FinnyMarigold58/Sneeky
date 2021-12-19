const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("messageDelete", async (message) => {
    const embed = new MessageEmbed()
    .setColor('#FF0000')
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setDescription(`**Message deleted from** ${message.author} **in channel** ${message.channel} \n${message.content}`)
            .setFooter(`ID: ${message.guild.id}`, message.guild.iconURL)
            .setTimestamp();
    message.guild.channels.resolve("917259857822879764")?.send({embeds: [embed]})
  })
}