const { moderations } = require("../../db.js")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  botPermissions: ["MANAGE_ROLES"],
  userPermissions: ["MANAGE_MESSAGES"],
  command: {
    name: "mute",
    description: "Mute a guild member",
    options: [
      {
        type: "USER",
        name: "user",
        required: true,
        description: "User to mute."
      },
      {
        type: "STRING",
        name: "reason",
        required: true,
        description: "Reason for mute."
      }
    ],
  },
  run: async (interaction, client) => {
    let user = interaction.options.getUser("user")
    let reason = interaction.options.getString("reason")
    let target = interaction.guild.members.resolve(user.id)

    if (target.roles.highest.position >= interaction.member.roles.highest.position || target.id === interaction.guild.ownerId) return interaction.reply({ content: "You can not mute this person.", ephemeral: true})

    if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({ content: `User has a higher role then me.`, ephemeral: true})

    let muted = await moderations.findOne({user: target.id, action: "Mute", active: true, guild: interaction.guild.id})
    if (muted) return interaction.reply({ content: `User already is muted.`, ephemeral: true})
    const prevroles = []
    target.roles.cache.forEach((role) => prevroles.push(role))
    prevroles.splice(-1)
    for (i = 0; i < prevroles.length; i++) {
      target.roles.remove(prevroles[i], "Mute Command").catch(console.log)
    }

    await moderations.create({
      moderationId: makeId(9),
      user: target.id,
      reason: reason,
      action: "Mute",
      mod: interaction.user.id,
      guild: interaction.guild.id,
      active: true,
      previousroles: prevroles,
    })

    target.send({ content: `You have been muted in ${interaction.guild.name} for ${reason}` }).catch(console.log)

let muterole = interaction.guild.roles.cache.filter((roless) => roless.name == "Muted").first()
    target.roles.add(muterole, "Mute Command").catch(console.log)
    interaction.reply({ content: `**${target.user.tag}** has been muted.`, ephemeral: true})
  }
}