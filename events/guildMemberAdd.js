const { MessageEmbed, MessageAttachment } = require("discord.js")
const captchaGen = require("captchagen")
const { moderations } = require("../db.js")

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    //Verification
    /*
    let captcha = captchaGen.create()
    captcha.generate()

    const captchaAttachment = new MessageAttachment(
      await captcha.buffer(),
      "captcha.png"
    )

    console.log(captcha.text())
    const captchaEmbed = new MessageEmbed()
      .setDescription("Please complete this captcha")
      .setImage("attachment://captcha.png")

    const msg = await member.send({
      files: [captchaAttachment],
      embeds: [captchaEmbed],
    })

    const filter = (message) => {
      if (message.author.id !== member.id) return
      if (message.content.toLowerCase() === captcha.text().toLowerCase()) return true
      else return member.send("Incorrect captcha.")
    }
    try {
      const response = await msg.channel.awaitMessages({ filter, max: 1, time: 60000, errors: ["time"]})

      if (response) {
        let verified = member.guild.roles.cache.filter((roless) => roless.name == "verified").first()
        member.roles.add(verified,"Verification")
        member.send(`You have been verified in ${member.guild.name}`)
      }
    } catch (err) {
      await member.send("You have not answered in time, so you have been kicked")
      member.kick("Failed to answer captcha in time")
    }
    */
    // Mute evasion check
    const data = await moderations.findOne({user: member.id, action: "Mute", active: true}) || await moderations.findOne({ user: member.id, action: "tempmute", active: true})
    let muterole = member.guild.roles.cache.filter((roless) => roless.name == "Muted").first()
    if(data) {
      member.roles.cache.forEach((role) => member.roles.remove(role,"Mute join bypass"))
      member.roles.add(muterole,"Mute join bypass")
    }

    // Logging
    var embed = new MessageEmbed()
        .setColor('GREEN')
        .setAuthor(member.user.tag, member.user.avatarURL)
        .setDescription(`:inbox_tray: ${member.user.tag} **joined the server**`)
        .addField('Account creation', `${member.user.createdAt}`)
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp();
    member.guild.channels.resolve("917259857822879764")?.send({embeds: [embed]})
  })
}