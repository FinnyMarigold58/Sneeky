const { moderations } = require("../../db.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
  command: {
    name: "warnings",
    description: "Display warnings",
    options: [
      {
        type: "USER",
        name: "user",
        description: "User to get warnings from",
        required: false
      }
    ],
  },
  run: async (interaction, client) => {
    let user = interaction.options.getUser("user") || interaction.user
    let target = interaction.guild.members.resolve(user.id)

    if (target != interaction.member && !interaction.member.permissions.has("MANAGE_MESSAGES")) return interaction.reply({content: `You do not have permissions to view other's warnings`, ephemeral: true})

    let data = await moderations.find({ 
        user: target.id,
        action: "Warn",
        guild: interaction.guild.id
    })

    if (!data?.length) return interaction.reply({content: `\`${target.user.username}\` has no warnings.`, ephemeral: true})

    const embedDescription = data.map((warn) => {
      const moderator = interaction.guild.members.resolve(warn.mod)

      return [
        `Id: ${warn.id}`,
        `Moderator: ${moderator || "Moderator has left"}`,
        `Reason: ${warn.reason}`,
        `Date: ${warn.date}`,
        `-------------------------`
      ].join("\n")
    })
    const embed = new MessageEmbed()
    .setTitle(`${target.user.username}'s warnings`)
    .setDescription(embedDescription.join("\n"))
    .setColor("RANDOM")

    interaction.reply({ embeds: [embed], ephemeral: true})
  }
}