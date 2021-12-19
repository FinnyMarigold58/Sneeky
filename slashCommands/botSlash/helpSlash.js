const Discord = require("discord.js")

module.exports = {
  command: {
    name: "help",
    description: "Get a list of commands or info on a command.",
    options: [
      {
        type: "STRING",
        name: "command",
        description: "Name of command to get info of.",
        required: false,
      }
    ],
    defaultPermission: true,
  },
  run: async (interaction, client) => {
    let command = interaction.options.getString("command")
    if (command) {
      let givencommand = client.commands.get(command.toLowerCase()) || client.commands.find((a) => a.aliases && a.aliases.includes(command.toLowerCase()))
      if (!givencommand) return interaction.reply({content:  `Invalid command! Run \`/help\` for a full list of commands.`})

      const commandHelpEmbed = new Discord.MessageEmbed()
        .setTitle(`${process.env.PREFIX}${givencommand.name}`)
        .setColor('#7289da')
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(givencommand.description || "No description set")
        if (givencommand.usage) {
          commandHelpEmbed.addField("Usage:", givencommand.usage)
        } else {
          commandHelpEmbed.addField("Usage:", "No usage provided.")       
        }
        commandHelpEmbed.addField("Category:", givencommand.category)
        commandHelpEmbed.addField("Required Permissions:", `${givencommand.userPermissions?.join(", ") || "None"}`)
        commandHelpEmbed.setFooter(`[] = Required and <> = optional | Requested by ${interaction.user.tag} (${interaction.user.id})`, interaction.user.displayAvatarURL())
        commandHelpEmbed.setTimestamp()
        return interaction.reply({ embeds: [commandHelpEmbed], ephemeral: true})
    }
    const embed = new Discord.MessageEmbed()
      .setTitle("Help Menu")
      .setColor('#7289da')
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`Bot made by Finny#6420 for Sponged#2532. This bot is usually used by only a discord server's moderation staff.\n\n**__Commands:__**\n\nIf you'd like more detailed information about a command, run \`${process.env.PREFIX}help [command name]\`.\n\nHere is a full list of all commands that this bot has:`)
      .addField("Bot:", Array.from(client.commands.filter(c => c.category === "bot").keys()).map(cmd => `\`${process.env.PREFIX}${cmd}\``).join(", ") || "Failed to gather data.")
      .addField("Moderation:", Array.from(client.commands.filter(c => c.category === "moderation").keys()).map(cmd => `\`${process.env.PREFIX}${cmd}\``).join(", ") || "Failed to gather data.")
      .setFooter(`Requested by ${interaction.user.tag} (${interaction.user.id})`, interaction.user.displayAvatarURL())
      .setTimestamp()
    return interaction.reply({ embeds: [embed], ephemeral: true})
  },
}