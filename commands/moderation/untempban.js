const { moderations } = require("../../db.js")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  name: "untempban",
  description: "Untemporarly ban a guild member",
  usage: `${process.env.PREFIX}untempban [user]`,
  userPermissions: ["BAN_MEMBERS"],
  botPermissions: ["BAN_MEMBERS"],
  run: async (message, args, client) => {
    let bans = message.guild.bans.cache

    if (!bans.has(args[0])) return message.reply({ content: `User is not banned`})

    const ban = bans.get(args[0])

    await moderations.create({
      moderationId: makeId(9),
    user: ban.user.id,
    action: "Untempban",
    mod: message.author.id,
    guild: message.guild.id,
    })

    await moderations.findOneAndUpdate({user: ban.user.id, action: "tempban", active: true}, {active: false})

    message.guild.bans.remove(args[0])

    message.reply(`Unbanned **${ban.user.tag}**.`)
  }
}