const { moderations } = require("../../db.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
  userPermissions: ["BAN_MEMBERS"],
  botPermissions: ["BAN_MEMBERS", "KICK_MEMBERS"],
  command: {
    name: "modlogs",
    description: "View your or someone elses moderation logs.",
    options: [
      {
        type: "USER",
        name: "user",
        description: "User to check",
        required: false
      },
      {
        type: "STRING",
        name: "userid",
        description: "Id of user to check (Overwrites user option)",
        required: false
      }
    ]
  },
  run: async (interaction, client) => {
    let user = interaction.options.getUser("user") || interaction.user
    let userId = interaction.options.getString("userid")

    if (userId) {
      user.id = userId
      user.tag = userId
    }

    let data = await moderations.find({ 
        user: user.id,
        guild: interaction.guild.id
    })

    if (!data?.length) return interaction.reply({content: `\`${user.tag}\` has no logs.`, ephemeral: true}).catch(console.error)

    const embedDescription = data.map((warn) => {
        const moderator = interaction.guild.members.resolve(warn.mod)

        return [
            `Id: ${warn.moderationId}`,
            `Action: ${warn.action}`,
            `Moderator: ${moderator || "Moderator has left"}`,
            `Reason: ${warn.reason}`,
            `Date: ${warn.date}`,
            `Active: ${warn.active}`,
            `-------------------------`
        ].join("\n")
    })
    const embed = new MessageEmbed()
    .setTitle(`${user.tag}'s Logs`)
    .setDescription(embedDescription.join("\n"))
    .setColor("RANDOM")

    interaction.reply({ embeds: [embed], ephemeral: true})
  }
}