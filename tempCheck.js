const { moderations } = require("./db.js")

module.exports = (client) => {
  const check = async () => {
    let tempmutes = await moderations.find({action: "tempmute", active: true})
    let tempbans = await moderations.find({action: "tempban", active: true})
    tempmutes.forEach(mute => {
      console.log(`Now checking ${mute.moderationId}. Expiration: ${mute.expiration}. Current time: ${Date.now()}`)
      console.log(mute.expiration <= Date.now())
      if (mute.expiration <= Date.now()) {
        let target = client.guilds.resolve(mute.guild).members.resolve(mute.user)
        mute.active = false
        const returnroles = mute.previousroles
    for (i=0; i<returnroles.length;i++){
      target.roles.add(returnroles[i],"Tempmute end")
    }
      }
      mute.save()
    })
    tempbans.forEach(ban => {
      console.log(`Now checking ${ban.moderationId}. Expiration: ${ban.expiration}. Current time: ${Date.now()}`)
      console.log(ban.expiration <= Date.now())
      if (ban.expiration <= Date.now()) {
        client.guilds.resolve(ban.guild).bans.remove(ban.user).catch(console.log)
        ban.active = false
      }
      ban.save()
    })
  }

  setInterval(check, 60000)
  check()
}