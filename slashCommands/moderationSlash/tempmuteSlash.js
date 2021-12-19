const { moderations } = require("../../db.js")
const ms = require("ms")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  command: {
    name: "tempmute",
    description: "Temp mute a user",
    options: [
      {
        type: "USER",
        name: "user",
        description: "User to temp mute",
        required: true
      },
      {
        type: "STRING",
        name: "time",
        description: "How long to temp mute for?",
        required: true
      },
      {
        type: "STRING",
        name: "reason",
        description: "Reason for temp mute.",
        required: true
      }
    ],
  },
  userPermissions: ["MANAGE_MESSAGES"],
  botPermissions: ["MANAGE_ROLES"],
  run: async (interaction, client) => {
    let user = interaction.options.getUser("user")
    let reason = interaction.options.getString("reason")
    let time = interaction.options.getString("time")
    let target = interaction.guild.members.resolve(user.id)

    if (target.roles.highest.position >= interaction.member.roles.highest.position || target.id === interaction.guild.ownerId) return interaction.reply({ content: "You can not mute this person.", ephemeral: true})
    if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({ content: `User has a higher role then me.`,ephemeral: true})
    let muted = await moderations.findOne({user: target.id, action: "Mute", active: true}) || await moderations.findOne({user: target.id, action: "tempmute", active: true})
    if (muted) return interaction.reply({ content: `User already is tempmuted/muted.`, ephemeral: true})
    const contime = ms(time)
    if (isNaN(contime)) return interaction.reply({content: "Please put a valid time.", ephemeral: true})
    const prevroles = []
    target.roles.cache.forEach((role) => prevroles.push(role))
    prevroles.splice(-1)
    for (i = 0; i < prevroles.length; i++) {
      target.roles.remove(prevroles[i], "Tempmute Command").catch(console.log)
    }

    await moderations.create({
      moderationId: makeId(9),
      user: target.id,
      reason: reason,
      action: "tempmute",
      mod: interaction.user.id,
      guild: interaction.guild.id,
      active: true,
      previousroles: prevroles,
      expiration: Date.now()+contime,
    })

    target.send({ content: `You have been tempmuted in ${interaction.guild.name} for ${time} for ${reason}` }).catch(console.log)

let muterole = interaction.guild.roles.cache.filter((roless) => roless.name == "Muted").first()
    target.roles.add(muterole, "Tempmute Command").catch(console.log)
    interaction.reply({ content: `**${target.user.tag}** has been tempmuted.`, ephemeral: true})
  }
}