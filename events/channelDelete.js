const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("channelDelete", async (channel) => {
    const embed = new MessageEmbed()
    .setColor('#FF0000')
        .setAuthor(channel.guild.name, channel.guild.iconURL)
        .setTitle('Channel Deleted')
        .addField('Name', `${channel.name}`)
        .addField('Type', `${channel.type}`)
        .setFooter(`ID: ${channel.guild.id}`, channel.guild.iconURL)
        .setTimestamp();

    channel.guild.channels.resolve("917259857822879764")?.send({embeds: [embed]})
  })
}