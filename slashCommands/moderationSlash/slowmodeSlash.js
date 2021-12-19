module.exports = {
  userPermissions: ["MANAGE_CHANNELS"],
  botPermissions: ["MANAGE_CHANNELS"],
  command: {
    name: "slowmode",
    description: "Set the slowmode of a channel.",
    options: [
      {
        type: "NUMBER",
        name: "time",
        description: "Time to set the slowmode to. (in secs) 0 to turn off",
        required: true,
      },
      {
        type: "CHANNEL",
        name: "channel",
        description: "Channel to set slowmode of",
        required: false,
        channel_types: [0],
      },
      {
        type: "STRING",
        name: "reason",
        description: "Reason for slowmode change",
        required: false
      }
    ]
  },
  run: async (interaction, client) => {
    let time = interaction.options.getNumber("time")
    let channel = interaction.options.getChannel("channel")
    let reason = interaction.options.getString("reason") ? interaction.options.getString("reason") : "No reason provided"

    if (time < 0 || time > 21600) return interaction.reply({content: `Time can not be greater then 21600 or less then 0`, ephemeral: true})

    if (channel) {
      channel.setRateLimitPerUser(time,reason)
      return interaction.reply({content: `Slowmode set to ${time}s`})
    }
    interaction.channel.setRateLimitPerUser(time,reason)
    return interaction.reply({content: `Slowmode set to ${time}s`})
  }
}