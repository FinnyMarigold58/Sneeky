const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("messageUpdate", async (oldMsg, newMsg) => {
    if (newMsg.partial) await oldMsg.fetch();
    if (!newMsg.content || newMsg.author.bot || newMsg.channel.type === "DM") return
    if (!oldMsg.content || oldMsg.content == newMsg.content) return;

    const embed = new MessageEmbed()
    .setAuthor("Edited Message")
    .setColor("YELLOW")
    .setThumbnail(newMsg.author.displayAvatarURL())
    .setDescription(`A user's message was edited!`)
    .addField("Message Author:", `${newMsg.author} - \`${newMsg.author.tag}\` (user ID: ${newMsg.author.id})`)
    .addField("Edited In:", `${newMsg.channel} - #${newMsg.channel.name} (channel ID: ${newMsg.channel.id})`)
    .addField("Old Message:", `${oldMsg.content.slice(0, 1024)}`)
    .addField("New Message:", `${newMsg.content.slice(0, 1024)}`)
    .setTimestamp()

    oldMsg.guild.channels.resolve("917259857822879764")?.send({embeds: [embed]})
  })
}