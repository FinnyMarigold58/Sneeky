const { moderations } = require("../../db.js")

module.exports = {
  userPermissions: ["ADMINISTRATOR"],
  command: {
    name: "clearlogs",
    description: "Clear a users moderation logs",
    options: [
      {
        type: "USER",
        name: "user",
        description: "User to clear logs from (checked second)",
        required: false,
      },
      {
        type: "STRING",
        name: "userid",
        description: "Id of user to clear logs from (checked last)",
        required: false,
      },
      {
        type: "STRING",
        name: "logid",
        description: "Id of specific log to delete (checked first)",
        required: false,
      }
    ],
  },
  run: async (interaction, client) => {
    let user = interaction.options.getUser("user")
    let userId = interaction.options.getString("userid")
    let logid = interaction.options.getString("logid")

    if (logid) {
      await moderations.findOneAndDelete({
        guild: interaction.guild.id,
        moderationId: logid,
      })
      return interaction.reply({
        content: `Removed log if it exists`,
        ephemeral: true,
      })
    }
    if (user) {
      await moderations.deleteMany({
        guild: interaction.guild.id,
        user: user.id,
      })
      return interaction.reply({
        content: `Removed all logs from ${user.tag}`,
        ephemeral: true
      })
    }
    if (userId) {
      user = client.users.resolve(userId)
      if (!user) return interaction.reply({
        content: `Unable to find user from id provided`,
        ephemeral: true
      })
      await moderations.deleteMany({
        guild: interaction.guild.id,
        user: user.id,
      })
      return interaction.reply({
        content: `Removed all logs from ${user.tag}`,
        ephemeral: true
      })
    }
    return interaction.reply({
      content: `No options used.`,
      ephemeral: true
    })
  },
}