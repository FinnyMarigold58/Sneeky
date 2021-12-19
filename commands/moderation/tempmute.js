const { moderations } = require("../../db.js")
const ms = require("ms")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  name: "tempmute",
  description: "Temporarly mute a guild member.",
  usage: `${process.env.PREFIX}tempmute [user] <time> <reason>`,
  userPermissions: ["MANAGE_MESSAGES"],
  botPermissions: ["MANAGE_ROLES"],
  run: async (message, args, client) => {
    if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply(`I do not have the required permissions to run this command.`)
    let target = message.guild.members.resolve(message.mentions.users.first())
    if (!args[0]) return message.reply({ content: `Please specify user` })
    if (!args[1]) return message.reply({ content: `Please specify time` })
    args[0].replace(/([<@!>])+/g, "")
    if (target == null) {
      target = message.guild.members.cache.get(args[0])
    }
    if (target == null) {
      target = message.guild.members.cache.find((member) => member.user.tag === args[0] || member.user.id === args[0] || member.user.username === args[0] || (member.nickname !== null && member.nickname === args[0]))
    }
    if (target == null) {
      target = message.guild.members.cache.find((member) => member.user.username.toLowerCase() + "#" + member.user.discriminator === args[0].toLowerCase() || member.user.username.toLowerCase() === args[0].toLowerCase() || (member.nickname !== null && member.nickname.toLowerCase() === args[0].toLowerCase()))
    }
    if (target == null) {
      target = message.guild.members.cache.find((member) => member.user.username.startsWith(args[0]) || member.user.username.toLowerCase().startsWith(args[0].toLowerCase()))
    }
    if (target == null) {
      target = message.guild.members.cache.find((member) => (member.nickname !== null && member.nickname.startsWith(args[0])) || (member.nickname !== null && member.nickname.toLowerCase().startsWith(args[0].toLowerCase())))
    }
    if (target == null) {
      target = message.guild.members.cache.find((member) => member.user.username.toLowerCase().includes(args[0].toLowerCase()) || (member.nickname !== null && member.nickname.toLowerCase().includes(args[0].toLowerCase())))
    }
    if (!target) return message.reply({ content: `Target not found` })
    if (target.roles.highest.position >= message.member.roles.highest.position || target.id === message.guild.ownerId) return message.reply({ content: "You can not mute this person." })
    if (target.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(`User has a higher role then me.`)
        let muted = await moderations.findOne({user: target.id, action: "Mute", active: true}) || await moderations.findOne({user: target.id, action: "tempmute", active: true})
        if (muted) return message.reply(`User already is tempmuted/muted.`)
        const time = ms(args[1])
        if (isNaN(time)) return message.reply("Please put a valid time.")
    const reason = args.splice(2).join(" ")
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
      mod: message.author.id,
      guild: message.guild.id,
      active: true,
      previousroles: prevroles,
      expiration: Date.now()+time,
    })

    target.send({ content: `You have been tempmuted in ${message.guild.name} for ${ms(time)} for ${reason}` }).catch(console.log)

let muterole = message.guild.roles.cache.filter((roless) => roless.name == "Muted").first()
    target.roles.add(muterole, "Tempmute Command").catch(console.log)
    message.reply({ content: `**${target.user.tag}** has been tempmuted.` })
  }
}