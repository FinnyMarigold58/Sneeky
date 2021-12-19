const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("roleCreate", async (role) => {
    const embed = new MessageEmbed()
    .setColor('#09dc0b')
        .setAuthor(role.guild.name, role.guild.iconURL)
        .setTitle(`Role ${role.name} Created`)
        .setDescription(`Name: ${role.name} \nColor: ${role.color} \nHoisted: ${role.hoist} \nMentionable: ${role.mentionable}`)
        .setFooter(`ID: ${role.id}`)
        .setTimestamp();
  role.guild.channels.resolve("917259857822879764")?.send({embeds: [embed]})
  })
}