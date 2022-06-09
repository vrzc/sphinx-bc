const { message } = require("prompt");

class userAccount {
  constructor({ token }) {
    this.token = token;
  }
  autoReaction({ channel, user }) {
    if (!channel) {
      console.error(new Error("No channel id were specified!"));
      return process.exit(1);
    }
    const Discord = require("discord.js-selfbot");
    const client = new Discord.Client();

    client.on("ready", () => {
      console.log("On for autoreaction");
    });

    client.on("message", async (message) => {
      if (message.author.id === "294882584201003009") {
        if (!message.embeds[0]) return;
        let mainChannel = client.guilds.channels.cache.find(
          (ch) => ch.id === channel
        );
        let mainUser = client.users.cache.find((u) => u.id === user);
        await message.react("🎉").then(async (m) => {
          mainChannel.send(`New Giveaway ${mainUser}`);
          await mainChannel.send(
            new Discord.MessageEmbed()
              .setTitle("You joined a giveaway!")
              .addFields(
                {
                  name: "Joined Giveaway at ",
                  value: `${new Date(message.createdAt)}`,
                },
                {
                  name: "Giveaway link",
                  value: `[Link](${message.url})`,
                }
              )
          );
        });
      }
      if (message.author.id === "396464677032427530") {
        if (!message.embeds[0]) return;
        let mainChannel = client.guilds.channels.cache.find(
          (ch) => ch.id === channel
        );
        let mainUser = client.users.cache.find((u) => u.id === user);
        await message.react("🎉").then(async (m) => {
          mainChannel.send(`New Giveaway ${mainUser}`);
          await mainChannel.send(
            new Discord.MessageEmbed()
              .setTitle("You joined a giveaway!")
              .addFields(
                {
                  name: "Joined Giveaway at ",
                  value: `${new Date(message.createdAt)}`,
                },
                {
                  name: "Giveaway link",
                  value: `[Link](${message.url})`,
                }
              )
          );
        });
      }
    });
    client.login(this.token)
  }
  leveling({ channel, randomLetters = true, time = 15000 }) {
    if (!channel) {
      console.error(new Error("No channel id were specified!"));
      return process.exit(1);
    }

    let arrayOfMostUsedWords = [
      "the",
      "of",
      "and",
      "a",
      "to",
      "in",
      "is",
      "you",
      "that",
      "it",
      "he",
      "was",
      "for",
      "on",
      "are",
      "as",
      "with",
      "his",
      "they",
      "I",
      "at",
      "be",
      "this",
      "have",
      "from",
      "or",
      "one",
      "had",
      "by",
      "word",
      "but",
      "not",
      "what",
      "all",
      "were",
      "we",
      "when",
      "your",
      "can",
      "said",
      "there",
      "use",
      "an",
      "each",
      "which",
      "she",
      "do",
      "how",
      "their",
      "if",
      "will",
      "up",
      "other",
      "about",
      "out",
      "many",
      "then",
      "them",
      "these",
      "so",
      "some",
      "her",
      "would",
      "make",
      "like",
      "him",
      "into",
      "time",
      "has",
      "look",
      "two",
      "more",
      "write",
      "go",
      "see",
      "number",
      "no",
      "way",
      "could",
      "people",
      "my",
      "than",
      "first",
      "water",
      "been",
      "call",
      "who",
      "oil",
      "its",
      "now",
      "find",
      "long",
      "down",
      "day",
      "did",
      "get",
      "come",
      "made",
      "may",
      "part",
    ];
    let randomString = Math.floor(Math.random() * arrayOfMostUsedWords.length);
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
    const Discord = require("discord.js-selfbot");
    const client = new Discord.Client();

    client.on("ready", () => {
      console.log("Leveling class is ready!");
    });

    client.on("message", async (message) => {
      let mainChannel = client.guilds.channels.cache.find(
        (ch) => ch.id === channel
      );
      let random = Math.floor(Math.random() * 15);
      if (random === 0) return;
      setInterval(() => {
        mainChannel.send(
          randomLetters ? makeid(random) : randomString[arrayOfMostUsedWords]
        );
      }, time);
    });
  }
}

module.exports = { userAccount };
