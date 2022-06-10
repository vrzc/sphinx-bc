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
    const client = new Discord.Client({ intents: 32767 });

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
  
  leveling({ channel, randomLetters = true, time = 15000, type = types }) {
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
      const client = new Discord.Client();
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
    let ar = [
      "أَتَمَنَّى",
      "أَثِقْ",
      "الِاثْنَيْنِ",
      "أُخْرَى",
      "أَخْشَى",
      "أَلِأرْضٍ",
      "أَلِأُسْبُوعٍ",
      "أَسْتَطِيعُ",
      "أَلِأسْئِلَةٍ",
      "أَلِأَشْيَاءٍ",
      "أَصْدِقاءُ",
      "إضافَةً",
      "أَعْتَقِدُ",
      "أَعُرْفً",
      "أَلِأفْضَلِ",
      "أَنَا",
      "أَنْتَ",
      "أَلِاِنْتِظارٍ",
      "إِنْتَظُرْ",
      "إنْتَهَى",
      "أُنْظِرُوا",
      "أَلِأَوْلاَدْ",
      "أَيْضًا",
      "بِالطَّبْعِ",
      "بِالْمُنَاسَبَةِ",
      "بِبَعْضٍ",
      "بِخُصوصِ",
      "بِخَيْرٍ",
      "بَرْنامَجً",
      "بَعْضَهُمْ",
      "أَلِبَقاءٍ",
      "بِمُجَرَّدٍ",
      "بُؤْرَةً",
      "بَيْنَما",
      "تَارِيخً",
      "تَبْحَثُ",
      "تَبْقَى",
      "تَتَّصِلُ",
      "تَصْوِيرً",
      "تُفْضِلُ",
      "الثَّالِثَةَ",
      "ثَانَوِيًّ",
      "ثَعْلَبً",
      "جَاءَ",
      "جَزِيرَةً",
      "جَمِيلَةً",
      "جَيِّدً",
      "حادِثَةً",
      "حَجْمً",
      "الْحَديثَ",
      "حُسْنًا",
      "حَقِيبَةً",
      "أَلْحَقِيقَةٌ",
      "حَقِيقِيَّةٌ",
      "الحَياةُ",
      "خَائِفٌ",
      "خَائِفَةٌ",
      "خَشِبَ",
      "خِلَالَ",
      "دَائِمَا",
      "دَرَجَةٌ",
      "دُكْتورٌ",
      "ذاكِرَتُكَ",
      "الذِّراعُ",
      "ذَكاءٌ",
      "ذَلِكَ",
      "الذَّهَابُ",
      "ذِئْبٌ",
      "رَائِعٌ",
      "رَغَمَ",
      "رِفاقٌ",
      "رُؤْيَةٌ",
      "رَئِيسٌ",
      "زَواجٌ",
      "سَاعَةٌ",
      "سَعِيدٌ",
      "سنواتٌ",
      "سَيَّارَةٌ",
      "شَاطِئٌ",
      "شَخَصَ",
      "شَخْصِيَّةٌ",
      "شَمِس",
      "شُؤُونٌ",
      "شَيْءٌ",
      "الشَّيْءُ",
      "صَحِيحٌ",
      "صَدِيقِي",
      "صَغِيرٌ",
      "صَفْحَةٌ",
      "صُنْدُوقٌ",
      "ضَابِطٌ",
      "الضَّرُورَةُ",
      "الضَّوْءُ",
      "ضَوْضَاءُ",
      "الطَّاقَةُ",
      "الطَّائِرَةُ",
      "طَبِيبٌ",
      "ظَلامٌ",
      "الْعَالَمُ",
      "عَائِلَتُي",
      "الْعَرَبِيَّةُ",
      "عَزِيزَتُي",
      "الْعَشَاءُ",
      "عَظِيمٌ",
      "عَلَى",
      "غَاضَبَ",
      "الْغَدَاءُ",
      "غُرْفَةٌ",
      "الْفَتَاةُ",
      "فَخَوِرَ",
      "فَرَيَّقَ",
      "الْفَضَاءُ",
      "فَضَلَكَ",
      "فَقَطُّ",
      "فَوَائِدُ",
      "فِي",
      "الْقَادِمَةُ",
      "قَائِدٌ",
      "قَائِمَةٌ",
      "الْقَبْضُ",
      "قَبْلَ",
      "قِرَاءةٌ",
      "قِصَّةٌ",
      "قَضِيَّةٌ",
      "قَلِيلَا",
      "قَلِيلَةٌ",
      "كِتَابٌ",
      "كَثِيرٌ",
      "كَيْفً",
      "لَا",
      "اللَّحْمُ",
      "لِطَيَّفَ",
      "لُعْبَةٌ",
      "اللِّقَاءُ",
      "لَقَدْ",
      "لِلْغَايَةِ",
      "لَوْحَةٌ",
      "لُؤْلُؤٌ",
      "اللَّيْلَةُ",
      "مَاذَا",
      "الْمَاضِي",
      "مَجْمُوعَةٌ",
      "مَحْظُوظٌ",
      "الْمَدْرَسَةُ",
      "مُدْهِشٌ",
      "مَرْحَبًا",
      "مَرِيضٌ",
      "مَسَاءَ",
      "مُسَاعَدَةٌ",
      "مُسْتَشْفى",
      "الْمُسْتَقْبَلُ",
      "مَسْرُورٌ",
      "مَسْؤُولِيَّةٌ",
      "مُشَاهِدَةٌ",
      "مُشَكَّلَةٌ",
      "مُضَاعَفَةٌ",
      "مَطْعَمٌ",
      "مَعً",
      "مَعْلُومَاتٌ",
      "مِغْنَاطِيسٌ",
      "مَفَاتِيحُ",
      "مُفَاجِئٌ",
      "الْمُفَضَّلُ",
      "مَقْرُوءٌ",
      "مَكَانٌ",
      "مُمَارَسَةٌ",
      "مِنْ",
      "مُنْخَفِضٌ",
      "الْمَنْزِلُ",
      "مُؤَدَّبٌ",
      "مُوسِيقَى",
      "مَوْضُوعٌ",
      "مؤقتة",
      "مُؤْمِنٌ",
      "مِينَاءٌ",
      "النَّاسُ",
      "نَافِذَةٌ",
      "نَصَائِحُ",
      "الْهَاتِفُ",
      "هَادِئٌ",
      "هُدُوءٌ",
      "هَذَا",
      "هَلْ",
      "هُنَالِكَ",
      "هُوَ",
      "هَؤُلَاءِ",
      "هِي",
      "هَيْئَةٌ",
      "وَاحِدَةٌ",
      "وَاضِحَةٌ",
      "وَضُعَ",
      "وَظِيفَةٌ",
      "الْوَقْتُ",
      "إِلَى",
      "يَبْدُو",
      "يَحْدُثُ",
      "يَعْتَقِدُونَ",
      "يَفْتَرِضُ",
      "يُمْكِنُنِي"
    ]
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
    const client = new Discord.Client();

    client.on("ready", async() => {
      console.log("Leveling class is ready!");
      let mainChannel = await client.channels.fetch(channel);
      let random = Math.floor(Math.random() * 15);
      if (random === 0) return;
      setInterval(async () => {
        let randomString = Math.floor(Math.random() * ar.length);
        await mainChannel.send(
          
          ar[randomString]
        );
      }, time);
    });

    client.login(this.token);
   }

  }
  bc({ownerID = [], prefix, mention = true}) {
    const Discord = require("discord.js-selfbot-v13");
    const client = new Discord.Client({ intents: 32767});
  
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
              await message.guild.members.fetch().then(m => {
                m.forEach(async (m) => {
                  if(m.user.bot) return;
                  wait(5000);
                  m.send(mention ? `${words} \n ${m}` : words).then(member => {
                    console.log(`${m} was sent`);
                  }).catch(er => {
                    console.log(`Couldn't send to ${m}`)
                  })
                })
              })
          }
      })
      }
    
    
    });
  
    client.login(this.token);
  }
}

module.exports = { userAccount };
