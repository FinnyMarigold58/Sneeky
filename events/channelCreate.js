const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("channelCreate", async (channel) => {
    const embed = new MessageEmbed()
    .setColor('#09dc0b')
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setTitle('Channel Created')
        .addField('Channel', `${channel}`)
        .addField('Type', `${channel.type}`)
        .setFooter(`ID: ${channel.guild.id}`, channel.guild.iconURL)
        .setTimestamp();
  channel.guild.channels.resolve("917259857822879764")?.send({embeds: [embed]})
  })
}