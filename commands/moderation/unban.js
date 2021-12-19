const { moderations } = require("../../db.js")
const { makeId } = require("../../helper/functions/generateId.js")

module.exports = {
  name: "unban",
  description: "Unban a guild member",
  usage: `${process.env.PREFIX}unban [user]`,
  userPermissions: ["BAN_MEMBERS"],
  botPermissions: ["BAN_MEMBERS"],
  run: async (message, args, client) => {
    let bans = message.guild.bans.cache

    if (!bans.has(args[0])) return message.reply({ content: `User is not banned`})

    const ban = bans.get(args[0])

    await moderations.create({
    moderationId: makeId(9),
    user: ban.user.id,
    action: "Unban",
    mod: message.author.id,
    guild: message.guild.id,
    })

    message.guild.bans.remove(args[0])

    message.reply(`Unbanned **${ban.user.tag}**.`)
  }
}