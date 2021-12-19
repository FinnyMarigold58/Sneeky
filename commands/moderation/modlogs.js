const { moderations } = require("../../db.js")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "modlogs",
    aliases: ["moderations"],
    description: "View moderations of a player",
    usage: `${process.env.PREFIX}modlogs <user>`,
    run: async (message, args, client) => {
            let target = message.guild.members.resolve(message.mentions.users.first())
            if (!args[0]) target = message.member
                if (args[0]) args[0].replace(/([<@!>])+/g, "")
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

                let data = await moderations.find({ 
                    user: target.id,
                    guild: message.guild.id
                })

                if (!data?.length) return message.reply({content: `\`${target.user.tag}\` has no logs.`})

                const embedDescription = data.map((warn) => {
                    const moderator = message.guild.members.resolve(warn.mod)

                    return [
                        `Id: ${warn.moderationId}`,
                        `Action: ${warn.action}`,
                        `Moderator: ${moderator || "Moderator has left"}`,
                        `Reason: ${warn.reason}`,
                        `Date: ${warn.date}`,
                        `Active: ${warn.active}`,
                        `-------------------------`
                    ].join("\n")
                })
                const embed = new MessageEmbed()
                .setTitle(`${target.user.tag}'s Logs`)
                .setDescription(embedDescription.join("\n"))
                .setColor("RANDOM")

                message.reply({ embeds: [embed]})
    }
}