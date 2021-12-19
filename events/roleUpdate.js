const { MessageEmbed } = require("discord.js")

module.exports = (client) => {
  client.on("roleUpdate", async (oldRole, newRole) => {
    if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
      let oldRolePerms = oldRole.permissions.toArray()
      let newRolePerms = newRole.permissions.toArray()

      let addedPermissions = []
      for (i=0;i<newRolePerms.length;i++) {
        if (!oldRolePerms.includes(newRolePerms[i])) addedPermissions.push(newRolePerms[i])
      }
      let removedPermissions = []
      for (i=0;i<oldRolePerms.length;i++) {
        if (!newRolePerms.includes(oldRolePerms[i])) removedPermissions.push(oldRolePerms[i])
      }

      const embed = new MessageEmbed()
        .setAuthor("Role Permissions Updated")
        .setDescription("A role's permission has been changed")
        .addField("Added Permissions", `${addedPermissions.join(", ")}`)
        .addField("Removed Permissions", `${removedPermissions.join(", ")}`)
    newRole.guild.channels.resolve("915078192287588392").send({embeds: [embed]})
    } else if (oldRole.name !== newRole.name) {
      const embed = new MessageEmbed()
        .setAuthor("Role Name Updated")
        .setDescription("A role's name has been changed")
        .addField("Old Name", `${oldRole.name}`)
        .addField("New Name", `${newRole.name}`)
    newRole.guild.channels.resolve("917259857822879764")?.send({embeds: [embed]})
    }
  })
}