const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    moderationId: {type: String, default: "", required: true},
    user: { type: String, default: "" }, //id of user moderated
    guild: { type: String, default: ""},
    reason: { type: String, default: "No reason provided" }, //reason of moderation
    action: { type: String, default: "" }, //action of moderation taken
    mod: { type: String, default: "" }, //moderator
    date: { type: Date, default: Date.now }, //date of moderation
    active: {type: Boolean, default: false},
    expiration: { type: Number, default: 0},
    previousroles: { type: Array, default: [] }
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}/`).pop().split(`.`).shift()}`, schema)