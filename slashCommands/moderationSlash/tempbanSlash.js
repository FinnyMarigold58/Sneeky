const { moderations } = require("../../db.js")
const ms = require("ms")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  userPermissions: ["BAN_MEMBERS"],
  botPermissions: ["BAN_MEMBERS"],
  command: {
    name: "tempban",
    description: "Temp ban a member in your server",
    options: [
      {
        type: "USER",
        name: "user",
        description: "User to tempban",
        required: true
      },
      {
        type: "STRING",
        name: "time",
        description: "How long to tempban for",
        required: true
      },
      {
        type: "STRING",
        name: "reason",
        description: "Reason for tempban",
        required: true
      }
    ],
  },
  run: async (interaction, client) => {
        let ntime = interaction.options.getString("time")
        let user = interaction.options.getUser("user")
        let reason = interaction.options.getString("reason")
        let target = interaction.guild.members.resolve(user.id)

        const contime = ms(ntime)
        if (isNaN(contime)) return interaction.reply({ content: "Please put a valid time.", ephemeral: true})

        await moderations.create({
            moderationId: makeId(9),
            user: target.id,
            reason: reason,
            action: "tempban",
            mod: interaction.user.id,
            guild: interaction.guild.id,
            experation: Date.now()+contime,
            active: true
        })

        user.send({ content: `You have been banned from ${interaction.guild.name} for ${ntime} for ${reason}` }).catch(console.log)

        target.ban({ reason: reason })
        interaction.reply({ content: `**${target.user.tag}** has been banned.`, ephemeral: true})
  }
}