const { moderations } = require("../../db.js")

module.exports = {
  userPermissions: ["ADMINISTRATOR"],
  command: {
    name: "unwarn",
    description: "Remove a warn from a user.",
    options: [
      {
        type: "USER",
        name: "user",
        required: true,
        description: "User to remove warn from"
      },
      {
        type: "STRING",
        name: "warnid",
        required: true,
        description: "Warn ID to remove."
      },
    ],
  },
  run: async (interaction, client) => {
    let user = interaction.options.getUser("user")
    let warnId = interaction.options.getString("warnid")


    await moderations.findOneAndDelete({
      moderationId: warnId,
    })
    
    return interaction.reply({content: `Removed ${user.tag}'s warning`, ephemeral: true})

  }
}