const { moderations } = require("../../db.js")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  userPermissions: ["BAN_MEMBERS"],
  botPermissions: ["BAN_MEMBERS"],
  command: {
    name: "ban",
    description: "Ban a guild member",
    options: [
      {
        type: "USER",
        name: "user",
        description: "User to ban",
        required: true
      },
      {
        type: "STRING",
        name: "reason",
        description: "Reason of the ban",
        required: true
      }
    ],
  },
  run: async (interaction, client) => {
    let user = interaction.options.getUser("user")
    let reason = interaction.options.getString("reason")
    let guildMember = interaction.guild.members.resolve(user.id)

    if (guildMember.roles.highest.position >= interaction.member.roles.highest.position || guildMember.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({ content: "You or I can not ban this person.", ephemeral: true})

    await moderations.create({
          moderationId: makeId(9),
            user: user.id,
            reason: reason,
            action: "Ban",
            mod: interaction.user.id,
            guild: interaction.guild.id,
        })

        user.send({ content: `You have been banned from ${interaction.guild.name} for ${reason}` }).catch(console.log)

        guildMember.ban({ reason: reason })
        interaction.reply({ content: `**${user.tag}** has been banned.`, ephemeral: true })
  }
}