# About The bot
- This bot was made for legal reasons and testing , i don't take responebilty about anything you do with it.
- There is a high chance your bot is getting banned if you use this package so please use discord bots that is over 3 months old.

# How to Use Discord bot version

```js
const sphinx = require("sphinx-bc"); // npm i sphinx-bc@latest - I Do updates everyday make sure you check .

new sphinx.BotAccount({
    token: "YourToken",
    ownerID: ["First Owner ID", "SECOND owner ID"],
    prefix: "yourPrefix",
    embedReply: "Optional Option.",
    mention: true || false,
    type: "off" || "all"
}).botbc()


```
- First Argument: Your bot token [String], Second Argument: People who will be able to use this bot [Array], Third Argument : The bot prefix .
- The `mention` property defines as weather the member who recieved the message should get pinged or no , default: true

- types : off = removes offline members from the people who are begin sent to broadcast
- types: all = sends to everyone


# How to use SelfBots Version
> Still in progress

- NOTE: THE SELFBOT IS NOT COMPLETE, YOU WILL FACE SOME TROUBLES
- THERE IS NO CONFIRMATION ON THE SELFBOT TO AVOID BANS (you will eventually get banned )

