const { moderations } = require("../../db.js")

module.exports = {
  userPermissions: ["MANAGE_MESSAGES"],
  command: {
    name: "setreason",
    description: "Set a reason for a modlog",
    options: [
      {
        type: "STRING",
        name: "logid",
        required: true,
        description: "Log id to change reason of."
      },
      {
        type: "STRING",
        name: "newreason",
        required: true,
        description: "New reason for log."
      }
    ],
  },
  run: async (interaction, client) => {
    let modlogid = interaction.options.getString("logid")
    let reason = interaction.options.getString("newreason")

    const exists = await moderations.findOne({
      moderationId: modlogid
    })

    if (!exists) return interaction.reply({ content: `No moderation logs found.`, ephemeral: true})

    exists.reason = reason
    exists.save()
    interaction.reply({ content: `Reason set to \`${reason}\``, ephemeral: true})
  }
}