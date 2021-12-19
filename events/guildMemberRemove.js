const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("guildMemberRemove", async (member) => {
  var embed = new MessageEmbed()
    .setColor('RED')
    .setAuthor(member.user.tag, member.user.avatarURL)
    .setDescription(`:outbox_tray: ${member.user.tag} **left the server**`)
    .setFooter(`ID: ${member.user.id}`)
    .setTimestamp();
  member.guild.channels.resolve("917259857822879764")?.send({ embeds: [embed] })
  })
}