const mongoose = require("mongoose")
const fs = require("fs")

mongoose.connect(process.env.MONGODB)

module.exports = {}
const routeFiles = fs.readdirSync(__dirname + "/schemas").filter((files) => files.endsWith(".js"))
for (const file of routeFiles) {
    const route = require(`./schemas/${file}`)
    module.exports[`${file.split(".").shift()}`] = route
}


Object.filter = (obj, predicate) =>
    Object.keys(obj)
        .filter((key) => predicate(obj[key]))
        .reduce((res, key) => ((res[key] = obj[key]), res), {})