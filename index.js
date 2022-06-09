const {BotAccount} = require("./bcs/botbc");
const {accbc} = require("./bcs/accbc");
const {createBot} = require('./bcs/createBots');
const {userAccount} = require("./bcs/auto")
module.exports = {accbc, BotAccount, createBot, userAccount};