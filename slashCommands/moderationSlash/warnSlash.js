const { moderations } = require("../../db.js")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
    command: {
      name: "warn",
      description: "Warn a user",
      options: [
        {
          type: "USER",
          name: "user",
          description: "User to warn",
          required: true
        },
        {
          type: "STRING",
          name: "reason",
          description: "Reason to warn",
          required: true
        },
      ],
    },
    userPermissions: ["MANAGE_MESSAGES"],
    run: async (interaction, client) => {
      let user = interaction.options.getUser("user")
      let reason = interaction.options.getString("reason")
      let target = interaction.guild.members.resolve(user.id)

      if (target.roles.highest.position >= interaction.member.roles.highest.position || target.id === interaction.guild.ownerId) return interaction.reply({ content: "You can not warn this person.", ephemeral: true})

      await moderations.create({
          moderationId: makeId(9),
          user: target.id,
          reason: reason,
          action: "Warn",
          mod: interaction.user.id,
          guild: interaction.guild.id
      })
      
      target.send(`You have been warned in \`${interaction.guild.name}\` for \`${reason}\``).catch(console.log)

      interaction.reply({ content: `**${user.tag}** has been warned!`, ephemeral: true})
    }
}