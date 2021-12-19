module.exports = {
  command: {
    name: "report",
    description: "Send developer a message of a bug",
    options: [
      {
        type: "STRING",
        name: "message",
        description: "Message to send.",
        required: true,
      }
    ],
    defaultPermission: true,
  },
  run: async (interaction, client) => {
    let message = interaction.options.getString("message")
    client.guilds.resolve("911173629427978311").channels.resolve("912171684990160916").fetchWebhooks().then(hooks => hooks.get('912171881581408326').send({content: `Report: ${message}\nGuild: ${interaction.guild.name} - ${interaction.guild.id}`, username: interaction.user.tag, avatarURL: interaction.user.avatarURL()}))
    interaction.reply({ content: `Reported to developer!`, ephemeral: true })
  },
}