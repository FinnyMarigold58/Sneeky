const Discord = require("discord.js")

module.exports = {
  name: "help",
  description: "Get a list of commands or info on a command.",
  aliases: ["commands"],
  usage: `${process.env.PREFIX}help <command>`,
  run: async (message, args, client) => {
    if (args[0]) {
      let givencommand = client.commands.get(args[0].toLowerCase()) || client.commands.find((a) => a.aliases && a.aliases.includes(args[0].toLowerCase()))
      if (!givencommand) return message.reply({content:  `Invalid command! Run \`${process.env.PREFIX}help\` for a full list of commands.`})

console.log(givencommand)
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
        commandHelpEmbed.setFooter(`[] = Required and <> = optional | Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
        commandHelpEmbed.setTimestamp()
        return message.reply({ embeds: [commandHelpEmbed]})
    }
    const embed = new Discord.MessageEmbed()
      .setTitle("Help Menu")
      .setColor('#7289da')
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`Bot made by Finny#6420 for Sponged#2532. This bot is usually used by only a discord server's moderation staff. \n\n**__Commands:__**\n\nIf you'd like more detailed information about a command, run \`${process.env.PREFIX}help [command name]\`.\n\nHere is a full list of all commands that this bot has:`)
      .addField("Bot:", Array.from(client.commands.filter(c => c.category === "bot").keys()).map(cmd => `\`${process.env.PREFIX}${cmd}\``).join(", ") || "Failed to gather data.")
      .addField("Moderation:", Array.from(client.commands.filter(c => c.category === "moderation").keys()).map(cmd => `\`${process.env.PREFIX}${cmd}\``).join(", ") || "Failed to gather data.")
      .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
      .setTimestamp()
    return message.reply({ embeds: [embed]})
  },
}