module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isMessageComponent() && interaction.componentType !== "BUTTON") return
        if (interaction.customId.startsWith("notification")) {
            let roleid = interaction.customId.split("-")[1]
            let role = interaction.guild.roles.resolve(roleid)
            let member = interaction.member
            if (member.roles.cache.has(roleid)) {
                member.roles.remove(role, "Notification Button")
                interaction.reply({content: `${role.name} has been removed from you.`, ephemeral: true})
            } else {
                member.roles.add(role, "Notification button")
                interaction.reply({content: `${role.name} has been added to you.`, ephemeral: true})
            }
        }
    })
}