const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("guildBanRemove", async (ban) => {
    const embed = new MessageEmbed()
    .setColor('GREEN')
        .setAuthor(ban.user.tag, ban.user.avatarURL)
        .setDescription(`:police_officer: :unlock: ${ban.user.tag} (${ban.user.id}) **was unbanned**`)
        .setFooter(`ID: ${ban.guild.id}`, ban.guild.iconURL)
        .setTimestamp();

  ban.guild.channels.resolve("917259857822879764")?.send({embeds: [embed]})
  })
}