const wait = require("node:timers/promises").setTimeout;
let emb =
"This broadcast bot was made by Sphinx#1100 it's not my responsebilty if you use it wrong";


class BotAccount {
  constructor({token}) {
    this.token = token;

  }
  botbc({
    ownerID,
    prefix,
    embedReply = emb,
    mention = true,
    type = 'all' || 'off'
  }) {
    const Discord = require("discord.js");
    const client = new Discord.Client({
      intents: 32767,
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

    const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("yes")
          .setLabel("Send")
          .setStyle("SUCCESS")
      )
      .addComponents(
        new Discord.MessageButton()
          .setCustomId("no")
          .setLabel("Decline")
          .setStyle("DANGER")
      );
  
    client.on("ready", () => {
      console.log(`BroadCast is on for ${client.user.username}`);
    });
  
    client.on("messageCreate", async (message) => {
      if (!prefix) {
        console.error(
          new Error("Third Argument is missing [prefix], String Argument")
        );
        process.exit(0);
      }
      if (type && type === "all") {
        if (message.content.startsWith(prefix + "bc")) {
          if (ownerID) {
            if (!ownerID.includes(message.author.id))
              return message.channel.send("You're not the owner");
          }
          const args = message.content.slice(prefix.length).trim().split(" ");
          let words = args.slice(1).join(" ");
  
          const filter = (i) =>
            (i.customId === row.components[0].customId &&
              i.user.id === message.author.id) ||
            (i.customId === row.components[1].customId &&
              i.user.id === message.author.id);
          let msg = await message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setTitle("Are you sure you want to send this broardCast?")
                .setDescription(embedReply),
            ],
            components: [row],
          });
          const collector = msg.createMessageComponentCollector({
            filter,
            time: 20000,
          });
          collector.on("collect", async (i) => {
            if (i.customId === row.components[0].customId) {
              message.guild.members.cache.forEach((m) => {

                wait(5000);
                
                m.send(mention ? `${words} \n \n ${m}` : words)
                  .then((mem) => {
                    console.log(`Sent to ${m.user.username} ✅`);
                  })
                  .catch((m) => {
                    console.log(`Err, Couldn't send to someone. ❌`);
                  });
              });
              await i.deferUpdate();
              await wait(1000);
              await i.editReply({ content: "Done", components: [], embeds: [] });
            }
            if (i.customId === row.components[1].customId) {
              await i.deferUpdate();
              await wait(1000);
              await i.editReply({
                content: "Decliend",
                components: [],
                embeds: [],
              });
            }
          });
        }
      }
      if (type && type === "off") {
        if (message.content.startsWith(prefix + "bc")) {
          if (ownerID) {
            if (!ownerID.includes(message.author.id))
              return message.channel.send("You're not the owner");
          }
          const args = message.content.slice(prefix.length).trim().split(" ");
          let words = args.slice(1).join(" ");
  
          const filter = (i) =>
            (i.customId === row.components[0].customId &&
              i.user.id === message.author.id) ||
            (i.customId === row.components[1].customId &&
              i.user.id === message.author.id);
          let msg = await message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setTitle(
                  "Are you sure you want to send to everyone (The change of your bot getting banned is high)"
                )
                .setDescription(embedReply),
            ],
            components: [row],
          });
          const collector = msg.createMessageComponentCollector({
            filter,
            time: 20000,
          });
          collector.on("collect", async (i) => {
            if (i.customId === row.components[0].customId) {
              message.guild.members.cache
                .filter(member => member.presence?.status === 'online' || member.presence?.status === 'idle' || member.presence?.status === 'dnd') 
                .forEach((mem) => {
                  if (mem.presence) {
                    wait(5000);
                    mem.send(mention ? `${words} \n \n ${mem}` : words)
                      .then((m) => {
                        console.log(`Sent to ${mem.user.username} ✅`);
                      })
                      .catch((m) => {
                        console.log(`Err, Couldn't send to someone. ❌`);
                      });
                  }
                });
              await i.deferUpdate();
              await wait(1000);
              await i.editReply({ content: "Done", components: [], embeds: [] });
            }
            if (i.customId === row.components[1].customId) {
              await i.deferUpdate();
              await wait(1000);
              await i.editReply({
                content: "Decliend",
                components: [],
                embeds: [],
              });
            }
          });
        }
      }
    });
  
    client.login(this.token);
  }
  welcome({ welcomePic, width, height, x, y, welcomeMessage, welcomeChannel, welcomeRole, avWidth, avHeight, radious, arcX, arcY}) {
    const Discord = require('discord.js');
    const client = new Discord.Client({
      intents: 32767
    });
    const canvas = require("canvas");

    client.on("ready", () => {
      console.log("Welcome bot i ready !")
    });

    client.on("guildMemberAdd", async member => {
      const channel = member.guild.channels.cache.find(ch => ch.id === welcomeChannel);
      const role = member.guild.roles.cache.find(r => r.id === welcomeRole);
      if(!channel) {
        console.error(new Error("No Channel were specified"))
        return process.exit(1)
      };
      const newCanvas = canvas.createCanvas(width, height);
      const ctx = newCanvas.getContext('2d');
      let welcomeImg = await canvas.loadImage(welcomePic);
      ctx.save();
      ctx.drawImage(welcomeImg, 0, 0, width, height);

      ctx.beginPath();
      ctx.arc(arcX , arcY ? arcY : newCanvas.height /2 + 20,  radious, 0 , 2 * Math.PI, true);
      ctx.closePath();
      ctx.clip();
      let memAvatar = member.user.displayAvatarURL({ format: "png", dynamic: false });
      let av = await canvas.loadImage(memAvatar);
      
      ctx.drawImage(av, x, y, avWidth, avHeight);

      
      channel.send({
        files: [newCanvas.toBuffer()],
        content: `${welcomeMessage ? welcomeMessage : "Welcome to our server!"}`
      });
      if(welcomeRole) {
        await member.roles.add(role);
      }
    });


    client.login(this.token)
  }
}


module.exports = { BotAccount };
