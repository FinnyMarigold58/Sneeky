const { moderations } = require("../../db.js")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  userPermissions: ["KICK_MEMBERS"],
  botPermissions: ["KICK_MEMBERS"],
  command: {
    name: "kick",
    description: "Kick a member",
    options: [
      {
        type: "USER",
        name: "user",
        description: "User to kick",
        required: true
      },
      {
        type: "STRING",
        name: "reason",
        description: "Reason for kick",
        required: true
      }
    ]
  },
  run: async (interaction, client) => {
    let user = interaction.options.getUser("user")
    let reason = interaction.options.getString("reason")
    let target = interaction.guild.members.resolve(user.id)

    if (target.roles.highest.position >= interaction.member.roles.highest.position && target.roles.highest.position >= interaction.guild.me.roles.highest.position || target.id === interaction.guild.ownerId) return interaction.reply({ content: "You or I can not kick this person.", ephemeral: true})

    await moderations.create({
      moderationId: makeId(9),
      user: target.id,
      reason: reason,
      action: "Kick",
      mod: interaction.user.id,
      guild: interaction.guild.id,
    })

    target.kick(reason)
    interaction.reply({
      content: `Kicked ${user.tag}`,
      ephemeral: true
    })
  },
}