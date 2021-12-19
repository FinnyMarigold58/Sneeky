const { moderations } = require("../../db.js")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  command: {
    name: "untempmute",
    description: "Untempmute a user.",
    options: [
      {
        type: "USER",
        name: "user",
        description: "User to untempmute",
        required: true
      },
      {
        type: "STRING",
        name: "reason",
        description: "Reason to untempmute",
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

    if (target.roles.highest.position >= interaction.member.roles.highest.position || target.id === interaction.guild.ownerId) return interaction.reply({ content: "You can not untempmute this person.", ephemeral: true})
    if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({ content: `User has a higher role then me.`, ephemeral: true})
        let muted = await moderations.findOne({user: target.id, action: "tempmute", active: true, guild: interaction.guild.id})
        if (!muted) return interaction.reply({ content: `User is not tempmuted.`, ephemeral: true})
    

    const data = await moderations.findOne({
      user: target.id,
      action: "tempmute",
      active: true,
      guild: interaction.guild.id
    })

    const returnroles = data.previousroles
    for (i=0; i<returnroles.length;i++){
      target.roles.add(returnroles[i],"untempmute command")
    }

    await moderations.create({
      moderationId: makeId(9),
      user: target.id,
      action: "untempmute",
      mod: interaction.user.id,
      guild: interaction.guild.id,
      reason: reason
    })
    await moderations.updateOne({
      user: target.id,
      action: "tempmute",
      active: true,
      guild: interaction.guild.id
    }, { active: false, })

    target.send({ content: `You have been untempmuted in ${interaction.guild.name}`, ephemeral: true}).catch(console.log)

let muterole = interaction.guild.roles.cache.filter((roless) => roless.name == "Muted").first()
    target.roles.remove(muterole, "Untempmute Command").catch(console.log)
    interaction.reply({ content: `**${target.user.tag}** has been untempmuted.`, ephemeral: true})
  }
}