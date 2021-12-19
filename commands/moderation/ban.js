const { moderations } = require("../../db.js")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  name: "ban",
  description: "Ban a guild member.",
  usage: `${process.env.PREFIX}ban [user] <reason>`,
  userPermissions: ["BAN_MEMBERS"],
  botPermissions: ["BAN_MEMBERS"],
  run: async (message, args, client) => {
      let target = message.guild.members.resolve(message.mentions.users.first())
            if (!args[0]) return message.reply({ content: `Please specify user`})
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
        if (!target) return message.reply({ content: `Target not found`})
        if (target.roles.highest.position >= message.member.roles.highest.position || target.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply({ content: "You or I can not ban this person."})
        const reason = args.splice(1).join(" ") || "Not provided"
        await moderations.create({
          moderationId: makeId(9),
            user: target.id,
            reason: reason,
            action: "Ban",
            mod: message.author.id,
            guild: message.guild.id,
        })

        target.send({ content: `You have been banned from ${message.guild.name} for ${reason}` }).catch(console.log)

        target.ban({ reason: reason })
        message.reply({ content: `**${target.user.tag}** has been banned.` })
  }
}