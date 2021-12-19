const { moderations } = require("../../db.js")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  command : {
    name: "unmute",
    description: "Unmute a user who is muted",
    options: [
      {
        type: "USER",
        name: "user",
        description: "User to unmute.",
        required: true
      },
      {
        type: "STRING",
        name: "reason",
        description: "Reason for unmute",
        required: true
      }
    ],
  },
  userPermissions: ["MANAGE_MESSAGES"],
  botPermissions: ["MANAGE_ROLES"],
  run: async (interaction, client) => {
    let user = interaction.options.getUser("user")
    let reason = interaction.options.getString("reason")
    let target = interaction.guild.members.resolve(user.id)

    if (target.roles.highest.position >= interaction.member.roles.highest.position || target.id === interaction.guild.ownerId) return interaction.reply({ content: "You can not unmute this person.", ephemeral: true })
    if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({ content: `User has a higher role then me.`, ephemeral: true})
    
    let muted = await moderations.findOne({user: target.id, action: "Mute", active: true})
    if (!muted) return interaction.reply({ content: `User is not muted.`, ephemeral: true})
    
    const data = await moderations.findOne({
      user: target.id,
      action: "Mute",
      active: true,
      guild: interaction.guild.id
    })

    const returnroles = data.previousroles
    for (i=0; i<returnroles.length;i++){
      target.roles.add(returnroles[i],"Unmute command")
    }

    await moderations.create({
      moderationId: makeId(9),
      user: target.id,
      action: "Unmute",
      mod: interaction.user.id,
      guild: interaction.guild.id,
      reason: reason
    })
    await moderations.updateOne({
      user: target.id,
      action: "Mute",
      active: true,
    }, { active: false, })

    target.send({ content: `You have been unmuted in ${interaction.guild.name}` }).catch(console.log)

let muterole = interaction.guild.roles.cache.filter((roless) => roless.name == "Muted").first()
    target.roles.remove(muterole, "Mute Command").catch(console.log)
    interaction.reply({ content: `**${target.user.tag}** has been unmuted.`, ephemeral: true})
  }
}