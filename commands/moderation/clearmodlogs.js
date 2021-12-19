const { moderations } = require("../../db.js")

module.exports = {
  name: "clearmodlogs",
  description: "Remove any mod log or all mod logs from a user",
  usage: `${process.env.PREFIX}clearmodlogs <user>`,
  aliases: ["clearlogs","clearmoderations"],
  userPermissions: ["ADMINISTRATOR"],
  run: async (message, args, client) => {
    const warnId = args[1] || null
        let target = message.guild.members.resolve(message.mentions.users.first())
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
        if (!target) return message.reply({ content: `User not found` })
        if (warnId) {
            const data = await client.db.moderations.findByIdAndDelete(warnId)
               return  message.reply({content: `Removed ${target.user.tag}'s log`})
        }
        const data = await moderations.deleteMany({
            user: target.id,
            guild: message.guild.id,
        })
        message.reply({content: `Removed **${message.guild.members.resolve(target.id).user.username}**'s logs`})
  }
}