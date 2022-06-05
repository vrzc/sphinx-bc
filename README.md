# About The bot
- This bot was made for legal reasons and testing , i don't take responebilty about anything you do with it.
- There is a high chance your bot is getting banned if you use this package so please use discord bots that is over 3 months old.

# How to Use Discord bot version

```js
const sphinx = require("sphinx-bc") // First we require the package
sphinx.botbc("token", {ownerID: ["OWNER IDS"], prefix: "prefix", embedReply: "", mention: boolean}) 
```
- First Argument: Your bot token [String], Second Argument: People who will be able to use this bot [Array], Third Argument : The bot prefix .
- The `mention` property defines as weather the member who recieved the message should get pinged or no , default: true


# How to use SelfBots Version
```js
const sphinx = require("sphinx-bc");
sphinx.accbc("token", {ownerID: [""], prefix: "", mention: boolean})
```
- NOTE: THE SELFBOT IS NOT COMPLETE YOU WILL FACE SOME TROUBLES
- THERE IS NO CONFIRMATION ON THE SELFBOT TO AVOID BANS (you will eventually get banned )
