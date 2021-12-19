const { moderations } = require("../../db.js")

module.exports = {
  name: "setreason",
  description: "Sets a reason for a moderation",
  userPermissions: ["MANAGE_MESSAGES"],
  usage: `${process.env.PREFIX}setreason [id] [reason]`,
  run: async (message, args, client) => {
    if (!args[0]) return message.reply({ content:  `Invalid moderation id`})
    if (!args[1]) return message.reply({ content:  `Invalid reason`})

    const data = await moderations.findOneAndUpdate({
      moderationId: args[0]
    }, {
      reason: args[1]
    })
    message.reply({ content: `Reason set to \`${args[1]}\``})
  }
}