# About The bot
- This bot was made for legal reasons and testing , i don't take responebilty about anything you do with it.
- There is a high chance your bot is getting banned if you use this package so please use discord bots that is over 3 months old.

<details open>
<summary>Discord Bot broadcast </summary>
<br>

```js
const sphinx = require("sphinx-bc"); // npm i sphinx-bc@latest - I Do updates everyday make sure you check .

new sphinx.BotAccount({
    token: "YourToken",
}).botbc({
    ownerID: ["First Owner ID", "SECOND owner ID"],
    prefix: "yourPrefix",
    embedReply: "Optional Option.",
    mention: boolean
    type: types
})
```
- First Argument: Your bot token [String], Second Argument: People who will be able to use this bot [Array], Third Argument : The bot prefix .
- The `mention` property defines as weather the member who recieved the message should get pinged or no , default: true

- types : off = removes offline members from the people who are begin sent to broadcast
- types: all = sends to everyone
</details>

<details open>
<summary> User Account broadcast </summary>
<br>

```js
const sphinx = require("sphinx-bc");
new sphinx.userAccount({ token: "your account token"}).bc({ ownerID: ["Owner ID"], prefix: "your prefix", mention: boolean})
```

- THERE IS NO CONFIRMATION ON THE SELFBOT TO AVOID BANS (you will eventually get banned )
</details>

<details open>
<summary> Create Discord bots </summary>
<br>

```js
const sphinx = require("sphinx-bc"); // require our package , npm i sphinx-bc@latest
new sphinx.createBot({ token: "your user token", name: "bot name you want"}).create();
```
- Fetching the token automatically is still in progress, This code only creates the bot.
> Updated Everyday. Check for updates.
</details>

# User Account Class functions
autoReaction()
leveling()
bc()

# Auto Reaction options

```js
autoReaction({channel: 'string', user: 'string'})
// Channel = The channel you want the bot to tell you when you enter a giveaway
// user = Your id (Not the selfbot's id)
```

# leveling options

```js
leveling({channel: 'string', randomLetters: boolean, time: Number, type: types});
// channel = The channel you want the bot to keep sending messages in.
// randomLetters = if true will send random letters , if false will send random words
// time = The time you want the bot to wait to send the second text
// type = types ('ar', 'eng')
// ar = Sends random arabic words(doesn't support letters)
// eng = Sends random english words(support random letters)
```

# bc options

```js
bc({ownerID: [], prefix: 'string', mention: boolean});
//ownerID = Owner id (The only person who would be able to use the bot) [Array]
// prefix = The prefix of the bot
//mention = if true it sends the bc with a mention for the user, if false it doesn't mention the user

// The command for it is (prefix + bc)
```
