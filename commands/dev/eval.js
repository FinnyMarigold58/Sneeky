const Discord = require("discord.js")
const fs = require("fs")

module.exports = {
    name: "eval",
    description: "Run some code.",
    usage: `${process.env.PREFIX}val <code...>`,
    run: async (message, args, client) => {
        if (message.content.includes("TOKEN")) return await message.channel.send("Trying to get token, aren't you? 😏")
        if (!client.botAdmin(message.author.id)) return
        try {
            if (!args[0]) return message.channel.send("undefined")
            let codeArr = args.slice(0).join(" ").split("\n")
            if (!codeArr[codeArr.length - 1].startsWith("return")) codeArr[codeArr.length - 1] = `return ${codeArr[codeArr.length - 1]}`

            const code = `async () => { ${codeArr.join("\n")} }`

            let out = await eval(code)()
            if (typeof out !== "string") out = require("util").inspect(out)
            out = out.replace(process.env.TOKEN, "[TOKEN REDACTED]").replace(process.env.MONGODB, "[DB URI REDACTED]")

            message.channel.send(`Typeof output: **${typeof out}**`)
            message.channel.send({ content: out ? out : "null", split: true, code: "js" }).catch ((err) => {
              message.channel.send({content: "Output too long please check console for output"})
              console.log(err)
            })
        } catch (err) {
            message.channel.send("An error occurred when trying to execute this command.")
            console.log(err)
            return message.channel.send(`${err}`, { code: "js" })
        }
    }
}