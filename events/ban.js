const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("guildBanAdd", async (ban) => {
    const embed = new MessageEmbed()
    .setColor('#FF0000')
        .setAuthor(ban.user.tag, ban.user.avatarURL)
        .setDescription(`:police_officer: :lock: ${ban.user.tag} (${ban.user.id}) **was banned** `)
        .setFooter(`ID: ${ban.guild.id}`, ban.guild.iconURL)
        .setTimestamp();

    ban.guild.channels.resolve("917259857822879764")?.send({embeds: [embed]})
  })
}