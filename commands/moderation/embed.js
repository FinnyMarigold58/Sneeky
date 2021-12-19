const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "embed",
  description: "Create a embed",
  usage: `${process.env.PREFIX}embed [title] [description]`,
  userPermissions: ["ADMINISTRATOR"],
  run: async (message, args, client) => {
    let title = args[0]
    let description = args.splice(1).join(" ")
    if (!title || !description) return message.reply({content: "Some args not specified please use the help command to see required arguments."})
    const embed = new MessageEmbed()
      .setTitle(title)
      .setDescription(description)
    message.channel.send({embeds: [embed]})
  }
}