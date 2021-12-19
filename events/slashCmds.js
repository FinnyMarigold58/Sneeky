module.exports = (client) => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return
    let commandFile = client.slashCommands.get(interaction.commandName)
    if (!interaction.member.permissions.has(commandFile.userPermissions || [])) return interaction.reply({ content: `You do not have permission to use this command`, ephemeral: true})
    if (!interaction.guild.me.permissions.has(commandFile.botPermissions || [])) return interaction.reply({ content: `I do not have permission to use this command please contact a admin`, ephemeral: true})

    await commandFile.run(interaction, client).catch((error) => {
      console.error(error)
      interaction.reply({ content: `An error occured when trying to execute this command. The developers have been notified.`, ephemeral: true})
    })
  })
}