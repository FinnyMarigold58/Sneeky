const { moderations } = require("../../db.js")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  command: {
    name: "unban",
    description: "Unban a member",
    options: [
      {
        type: "STRING",
        name: "userid",
        description: "Userid to unban",
        required: true
      },
      {
        type: "STRING",
        name: "reason",
        description: "Reason for the unban",
        required: false
      }
    ],
  },
  userPermissions: ["BAN_MEMBERS"],
  botPermissions: ["BAN_MEMBERS"],
  run: async (interaction, client) => {
    let userId = interaction.options.getString("userid")
    let reason = interaction.options.getString("reason")
    let bans = interaction.guild.bans.cache

    if (!bans.has(userId)) return interaction.reply({ content: `User is not banned`, ephemeral: true})

    const ban = bans.get(userId)

    await moderations.create({
    moderationId: makeId(9),
    user: ban.user.id,
    action: "Unban",
    mod: interaction.user.id,
    guild: interaction.guild.id,
    reason: reason
    })

    interaction.guild.bans.remove(userId)

    interaction.reply({ content: `Unbanned **${ban.user.tag}**.`, ephemeral: true})
  }
}