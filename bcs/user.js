const { codeBlock } = require("@discordjs/builders");
const wait = require("node:timers/promises").setTimeout;
let types = "eng" || 'ar';
class userAccount {
  constructor({ token }) {
    this.token = token;
  }
  autoReaction({ channel, user }) {
    if (!channel) {
      console.error(new Error("No channel id were specified!"));
      return process.exit(1);
    }
    if(!user) {
      console.error(new Error("Please Provide a user"));
      return process.exit(1)
    }

    const Discord = require("discord.js-selfbot-v13");
    const client = new Discord.Client({ intents: 32767, checkUpdate: false });

    client.on("ready", () => {
      console.log("On for autoreaction");
    });

    client.on("messageCreate", async (message) => {
      if (message.author.id === "294882584201003009") {
        if (!message.embeds[0]) return;
        if (message.content.startsWith("Congratulations")) return;
        let mainChannel = await client.channels.fetch(channel);
        let mainUser = await client.users.fetch(user);
        await wait(2000);
        await message.react("🎉").then(async (m) => {
          mainChannel.send(`New Giveaway ${mainUser}`);
          await mainChannel.send({
            content: codeBlock(
              "md",
              `New Giveaway At: \n **${message.url}** \n\n Giveaway Created At: \n ${
                new Date(message.createdAt).getHours()
              }:${new Date(message.createdAt).getMinutes()}:${new Date(message.createdAt).getSeconds()} \n\n Giveaway Ends At : \n ${new Date(message.embeds[0].timestamp).getHours()}:${new Date(message.embeds[0].timestamp).getMinutes()}:${new Date(message.embeds[0].timestamp).getSeconds()}`
            ),
          });
        });
      }
      if (message.author.id === "396464677032427530") {
        if (!message.embeds[0]) return;
        if (message.content.startsWith("Congratulations")) return;
        let mainChannel = await client.channels.fetch(channel);
        let mainUser = await client.users.fetch(user);
        await wait(2000);
        await message.react("🎉").then(async (m) => {
          mainChannel.send(`New Giveaway ${mainUser}`);
          await mainChannel.send({
            content: codeBlock(
              "md",
              `New Giveaway At: \n **${message.url}** \n\n Giveaway Created At: \n ${
                new Date(message.createdAt).getHours()
              }:${new Date(message.createdAt).getMinutes()}:${new Date(message.createdAt).getSeconds()} \n\n Giveaway Ends At : \n ${new Date(message.embeds[0].timestamp).getHours()}:${new Date(message.embeds[0].timestamp).getMinutes()}:${new Date(message.embeds[0].timestamp).getSeconds()}`
            ),
          });
        });
      }
    });

    client.login(this.token);
  }
  
  
  leveling({ channel, randomLetters = true, time = 15000, type = 'eng' | 'ar' }) {
    if (!channel) {
      console.error(new Error("No channel id were specified!"));
      return process.exit(1);
    }
    
    if(type === 'eng') {
      function makeid(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      const Discord = require("discord.js-selfbot-v13");
      const client = new Discord.Client({ checkUpdate: false });
      let arrayOfMostUsedWords = require("../lanuages.json").eng;
      client.on("ready", async() => {
        console.log("Leveling class is ready!");
        let mainChannel = await client.channels.fetch(channel);
        let random = Math.floor(Math.random() * 15);
        if (random === 0) return;
        setInterval(async () => {
          let randomString = Math.floor(Math.random() * arrayOfMostUsedWords.length);
          await mainChannel.send(
            
            randomLetters ? makeid(random) : arrayOfMostUsedWords[randomString]
          );
        }, time);
      });
  
      client.login(this.token);
    }
    
   if(type === 'ar') {
    let ar = require("../lanuages.json").ar;
    function makeid(length) {
      var result = "";
      var characters =
        "ابتثجحخدذرزسشصضطظعغفقكلمنهوي0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    const Discord = require("discord.js-selfbot-v13");
    const client = new Discord.Client();

    client.on("ready", async() => {
      console.log("Leveling class is ready!");
      let mainChannel = await client.channels.fetch(channel);
      let random = Math.floor(Math.random() * 15);
      if (random === 0) return;
      setInterval(async () => {
        let randomString = Math.floor(Math.random() * ar.length);
        await mainChannel.send(randomLetters ? makeid(random) : ar[randomString]);
      }, time);
    });

    client.login(this.token);
   }

  }
  bc({ownerID = [], prefix, mention = true}) {
    const Discord = require("discord.js-selfbot-v13");
    const client = new Discord.Client({ intents: 32767, checkUpdate: false});
  
    client.on("ready", () => {
      console.log(`BroadCast is on for ${client.user.username}`);
    });
  
    if (!ownerID) {
      console.error(
        new Error("Second Argument is missing [ownerID], Array Argument")
      );
      return process.exit(0);
    }
    if (!Array.isArray(ownerID)) {
      console.error(new Error("Second Argument is not an array"));
      return process.exit(0);
    }
  
    client.on("messageCreate", async (message) => {
      if (!prefix) {
        return console.error(
          new Error("Third Argument is missing [prefix], String Argument")
        );
      }
      if (message.content.startsWith(prefix + "bc")) {
        if (ownerID) {
          if (!ownerID.includes(message.author.id))
            return message.channel.send("You're not the owner");
        }
        const args = message.content.slice(prefix.length).trim().split(" ");
        let words = args.slice(1).join(" ");
        if (!words) return;
        const realine = require("readline");
        const yesOrNo = realine.createInterface({
          input: process.stdin,
          output: process.stdout,
        });
  
        yesOrNo.question(
          `Are you sure you want send ${words} ? Type "yes" or "no": `,
          async(answer) => {
            if (answer === "yes") {
              let i = 0;
               (await message.guild.members.fetch()).forEach(async member => {
                if(member.presence?.status === 'online' || member.presence?.status === 'idle' || member.presence?.status === 'dnd') {
                  await wait(5000);
                  member.send(mention ? `${words} \n ${member}` : words).then(async m => {
                    console.log(`Sent to ${member.user.username}`);
                  }).catch(err => {
                    console.log(`Couldn't send to ${member.user.username}`)
                  })
                } else {
                  
                  console.log(`${member.user.username} is offline`)
                }
              })
          }
      })
      }
      if(message.content.startsWith(prefix + "checkC")) {
        message.channel.send("#credits")
      }
      if(message.content.startsWith(prefix + 'join')) {
        const args = message.content.slice(prefix.length).trim().split(" ");
        let server = args.slice(1).join(" ");

        client.fetchInvite(server).then(async invite => {
          invite.acceptInvite()
        });
      }
    
    
    });
  
    client.login(this.token);
  }
}


module.exports = { userAccount };
