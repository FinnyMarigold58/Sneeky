const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("guildMemberUpdate", async (oldMember, newMember) => {
    //Role Change
    if (oldMember.roles.cache.difference(newMember.roles.cache).size !== 0) {
      const differences = oldMember.roles.cache.difference(newMember.roles.cache)

      let roles = []
      differences.forEach((role) => roles.push(role))

      for (i=0;i<roles.length;i++) {
        if (!oldMember.roles.cache.has(roles[i].id)) {
          const embed = new MessageEmbed()
            .setAuthor("Role added to member")
            .setDescription(`${roles[i]} (\`${roles[i].id}\`) has been added to ${newMember} (\`${newMember.id}\`)`)
          return oldMember.guild.channels.resolve(`917259857822879764`).send({embeds: [embed]})
        } else {
          const embed = new MessageEmbed()
            .setAuthor("Role removed from member")
            .setDescription(`${roles[i]} (\`${roles[i].id}\`) has been removed from ${newMember} (\`${newMember.id}\`)`)
            return oldMember.guild.channels.resolve(`917259857822879764`)?.send({embeds: [embed]})
        }
      }
    }
  })
}