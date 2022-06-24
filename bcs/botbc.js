const wait = require("node:timers/promises").setTimeout;
let emb =
  "This broadcast bot was made by Sphinx#1100 it's not my responseibility if you use it wrong";

class BotAccount {
  constructor({ token }) {
    this.token = token;
  }
  botbc({
    ownerID,
    prefix,
    embedReply = emb,
    mention = true,
    type = "all" || "off",
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
              await i.editReply({
                content: "Done",
                components: [],
                embeds: [],
              });
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
                .filter(
                  (member) =>
                    member.presence?.status === "online" ||
                    member.presence?.status === "idle" ||
                    member.presence?.status === "dnd"
                )
                .forEach((mem) => {
                  if (mem.presence) {
                    wait(5000);
                    mem
                      .send(mention ? `${words} \n \n ${mem}` : words)
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
              await i.editReply({
                content: "Done",
                components: [],
                embeds: [],
              });
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
  welcome({
    welcomePic,
    width,
    height,
    x,
    y,
    welcomeMessage,
    welcomeChannel,
    welcomeRole,
    avWidth,
    avHeight,
    radious,
    arcX,
    arcY,
  }) {
    const Discord = require("discord.js");
    const client = new Discord.Client({
      intents: 32767,
    });
    const canvas = require("canvas");

    client.on("ready", () => {
      console.log("Welcome bot i ready !");
    });

    client.on("guildMemberAdd", async (member) => {
      const channel = member.guild.channels.cache.find(
        (ch) => ch.id === welcomeChannel
      );
      const role = member.guild.roles.cache.find((r) => r.id === welcomeRole);
      if (!channel) {
        console.error(new Error("No Channel were specified"));
        return process.exit(1);
      }
      const newCanvas = canvas.createCanvas(width, height);
      const ctx = newCanvas.getContext("2d");
      let welcomeImg = await canvas.loadImage(welcomePic);
      ctx.save();
      ctx.drawImage(welcomeImg, 0, 0, width, height);

      ctx.beginPath();
      ctx.arc(
        arcX,
        arcY ? arcY : newCanvas.height / 2 + 20,
        radious,
        0,
        2 * Math.PI,
        true
      );
      ctx.closePath();
      ctx.clip();
      let memAvatar = member.user.displayAvatarURL({
        format: "png",
        dynamic: false,
      });
      let av = await canvas.loadImage(memAvatar);

      ctx.drawImage(av, x, y, avWidth, avHeight);

      channel.send({
        files: [newCanvas.toBuffer()],
        content: `${
          welcomeMessage ? welcomeMessage : "Welcome to our server!"
        }`,
      });
      if (welcomeRole) {
        await member.roles.add(role);
      }
    });

    client.login(this.token);
  }

  music({
    prefix,

      leaveOnEmpty = true,
      leaveOnFinish = false,
      leaveOnStop = true,
      searchSongs = 10,
      searchCooldown = 60,
      emptyCooldown = 60,
      nsfw = true,
    ///////////////////
      play = "play",
      skip ="skip",
      stops = "stop",
      pause = "pause",
      resume = "resume",
      volume = "volume",
      queue = "queue",
      jump = "jump",
      previous = "previous",
      shuffle =  "shuffle",
      autoplay = "autoplay",
      help = "help",
    
  }) {
    const Discord = require("discord.js");
    const client = new Discord.Client({ intents: 32767 });

    const Distube = require("distube");
    client.distube = new Distube.DisTube(client, {leaveOnEmpty, leaveOnFinish, leaveOnStop, searchCooldown, searchSongs, emptyCooldown, nsfw});
    client.emotes = require("./configs.json").emoji;

    client.on("ready", () => {
      console.log("Music Bot is ready !");
    });

    client.on("messageCreate", async (message) => {
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      if (message.content.startsWith(prefix + play)) {
        let song = args.slice(1).join(" ");

        client.distube.play(message.member.voice.channel, song, {
          member: message.member,
          textChannel: message.channel,
          message,
        });
      }
      if (message.content.startsWith(prefix + skip)) {
        client.distube.stop(message);
        message.channel.send("Stopped the current song!");
      }
      if (message.content.startsWith(prefix + pause)) {
        client.distube.pause(message);
        message.channel.send("Paused the current song");
      }
      if (message.content.startsWith(prefix + resume)) {
        client.distube.resume(message);
        message.channel.send("Resuming");
      }
      if (message.content.startsWith(prefix + volume)) {
        let volume = parseInt(args.slice(1));
        if (!volume) return message.channel.send("Please input some volume");
        client.distube.setVolume(message, volume);
        message.channel.send(`Volume has been set to ${volume}`);
      }
      if (message.content.startsWith(prefix + queue)) {
        const queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send("No queue");
        let mappedQ = queue.songs
          .map(
            (songs, u) =>
              `${u === 0 ? "Playing : " : `${u}.`} **${songs.name}** - \`${
                songs.formattedDuration
              }\` `
          )
          .join("\n");
        message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle(`${client.emotes.queue} | Qeueu`)
              .setDescription(mappedQ),
          ],
        });
      }
      if (message.content.startsWith(prefix + jump)) {
        let song = parseInt(args.slice(1));
        if (!song)
          return message.channel.send("Please input song num in the queue");
        client.distube.jump(message, song);
      }
      if (message.content.startsWith(prefix + previous)) {
        client.distube.previous(message);
        message.channel.send("returned to the previous song");
      }
      if(message.content.startsWith(prefix + shuffle)) {
        client.distube.shuffle(message);
        message.channel.send("Shuffled the queue");
      }
      if(message.content.startsWith(prefix + skip)) {
        client.distube.skip(message);
        message.channel.send("Skipped the current song");
      }
      if(message.content.startsWith(prefix + autoplay)) {
        client.distube.autoplay(message);
        message.channel.send("Autoplay is now " + (client.distube.autoplay ? "enabled" : "disabled"));
      }
      if(message.content.startsWith(prefix + help)) {
        message.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle(`${client.emotes.queue} | Help`)
              .setDescription(`
              **${prefix}${play}** - Play a song
              **${prefix}${stops}** - Stop the current song
              **${prefix}${pause}** - Pause the current song
              **${prefix}${resume}** - Resume the current song
              **${prefix}${volume}** - Set the volume of the current song
              **${prefix}${queue}** - Show the current queue
              **${prefix}${jump}** - Jump to a song in the queue
              **${prefix}${previous}** - Return to the previous song
              **${prefix}${shuffle}** - Shuffle the queue
              **${prefix}${skip}** - Skip the current song
              **${prefix}${autoplay}** - Toggle autoplay
              **${prefix}${help}** - Show this message
              `),
          ],
        });
      }
    });
    
    const status = (queue) =>
      `Volume: \`${queue.volume}%\` | Filter: \`${
        queue.filters.join(", ") || "Off"
      }\` | Loop: \`${
        queue.repeatMode
          ? queue.repeatMode === 2
            ? "All Queue"
            : "This Song"
          : "Off"
      }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;
    client.distube
      .on("playSong", (queue, song) =>
        queue.textChannel.send({
          embeds: [
            new Discord.MessageEmbed().setDescription(
              `${client.emotes.play} | Playing \`${song.name}\` - \`${
                song.formattedDuration
              }\`\nRequested by: ${song.user}\n${status(queue)}`
            ),
          ],
        })
      )
      .on("addSong", (queue, song) =>
        queue.textChannel.send(
          `${client.emotes.success} | Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
        )
      )
      .on("addList", (queue, playlist) =>
        queue.textChannel.send(
          `${client.emotes.success} | Added \`${playlist.name}\` playlist (${
            playlist.songs.length
          } songs) to queue\n${status(queue)}`
        )
      )
      .on("error", (channel, e) => {
        channel.send(
          `${client.emotes.error} | An error encountered: ${e
            .toString()
            .slice(0, 1974)}`
        );
        console.error(e);
      })
      .on("empty", (channel) =>
        channel.send("Voice channel is empty! Leaving the channel...")
      )
      .on("searchNoResult", (message, query) =>
        message.channel.send(
          `${client.emotes.error} | No result found for \`${query}\`!`
        )
      );
    client.login(this.token);
  }
}

module.exports = { BotAccount };

/**
 *       if (message.content.startsWith(prefix + "search")) {
        let searchStr = args.slice(1).join(" ");
        client.distube.search(searchStr).then(async (result) => {
          let u = 1;
          let o = 1;
          let raw = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("1")
                .setStyle("SUCCESS")
                .setLabel("1")
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("2")
                .setStyle("SUCCESS")
                .setLabel("2")
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("3")
                .setLabel("3")
                .setStyle("SUCCESS")
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("4")
                .setLabel("4")
                .setStyle("SUCCESS")
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("5")
                .setLabel("5")
                .setStyle("SUCCESS")
            );
          let raw2 = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("6")
                .setLabel("6")
                .setStyle("SUCCESS")
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("7")
                .setLabel("7")
                .setStyle("SUCCESS")
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("8")
                .setLabel("8")
                .setStyle("SUCCESS")
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("9")
                .setLabel("9")
                .setStyle("SUCCESS")
            )
            .addComponents(
              new Discord.MessageButton()
                .setCustomId("10")
                .setLabel("10")
                .setStyle("SUCCESS")
            );
          let playRaw = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setCustomId("play")
              .setLabel("play")
              .setStyle("DANGER")
              .setDisabled(true)
          );
          let msg = await message.channel.send({
            embeds: [
              new Discord.MessageEmbed().setDescription(
                result.map((i) => `${`**${u++} : ${i.name}**`}`).join("\n")
              ),
            ],
            components: [raw, raw2, playRaw],
          });
          let filter = (i) =>
            (i.customId === raw.components[0].customId &&
              i.user.id === message.author.id) ||
            (i.customId === raw.components[1].customId &&
              i.user.id === message.author.id) ||
            (i.customId === raw.components[2].customId &&
              i.user.id === message.author.id) ||
            (i.customId === raw.components[3].customId &&
              i.user.id === message.author.id) ||
            (i.customId === raw.components[4].customId &&
              i.user.id === message.author.id) ||
            (i.customId === raw2.components[0].customId &&
              i.user.id === message.author.id) ||
            (i.customId === raw2.components[1].customId &&
              i.user.id === message.author.id) ||
            (i.customId === raw2.components[2].customId &&
              i.user.id === message.author.id) ||
            (i.customId === raw2.components[3].customId &&
              i.user.id === message.author.id) ||
            (i.customId === raw2.components[4].customId &&
              i.user.id === message.author.id) ||
            (i.customId === playRaw.components[0].customId &&
              i.user.id === message.author.id);

          let collector = msg.createMessageComponentCollector({
            filter,
            time: 20000,
          });
          collector.on("collect", async (i) => {
            if (i.customId === raw.components[0].customId) {
              playRaw.components[0].setDisabled(false);
              await i.deferUpdate();
              await wait(1000);
              msg.edit({
                embeds: [
                  new Discord.MessageEmbed()
                    .setTitle(result[0].name)
                    .addFields(
                      {
                        name: "Source",
                        value:
                          `${result[0].source}` || "Cannot fetch information",
                      },
                      {
                        name: "Views",
                        value:
                          `**\`${result[0].views}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      },
                      {
                        name: "Duration",
                        value:
                          `**\`${result[0].formattedDuration}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      }
                    )
                    .setThumbnail(
                      result[0].thumbnail ||
                        message.member.displayAvatarURL({ dynamic: true })
                    )
                    .setURL(result[0].url),
                ],
                components: [playRaw],
              });
              client.on("interactionCreate", async (interaction) => {
                if (!interaction.isButton()) return;
                await interaction.fetchReply(true);
                await interaction.deferUpdate();

                if (interaction.customId === playRaw.components[0].customId) {
                  await wait(1000);
                  if (!message.member.voice.channel)
                    return message.channel.send(
                      "You need to join a voice channel"
                    );
                  client.distube.play(
                    message.member.voice.channel,
                    result[0].url,
                    {
                      member: message.member,
                      textChannel: message.channel,
                      message,
                    }
                  );
                }
              });
            }
            if (i.customId === raw.components[1].customId) {
              playRaw.components[0].setDisabled(false);
              await i.deferUpdate();
              await wait(1000);
              msg.edit({
                embeds: [
                  new Discord.MessageEmbed()
                    .setTitle(result[1].name)
                    .addFields(
                      {
                        name: "Source",
                        value:
                          `${result[1].source}` || "Cannot fetch information",
                      },
                      {
                        name: "Views",
                        value:
                          `**\`${result[1].views}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      },
                      {
                        name: "Duration",
                        value:
                          `**\`${result[1].formattedDuration}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      }
                    )
                    .setThumbnail(
                      result[1].thumbnail ||
                        message.member.displayAvatarURL({ dynamic: true })
                    )
                    .setURL(result[1].url),
                ],
                components: [playRaw],
              });
              client.on("interaction", async (interaction) => {
                if (!interaction.isButton()) return;
                await interaction.deferUpdate();
                if (interaction.customId === playRaw.components[0].customId) {
                  if (!message.member.voice.channel)
                    return message.channel.send(
                      "You need to join a voice channel"
                    );
                  client.distube.play(
                    message.member.voice.channel,
                    result[1].url,
                    {
                      member: message.member,
                      textChannel: message.channel,
                      message,
                    }
                  );
                }
              });
            }
            if (i.customId === raw.components[2].customId) {
              playRaw.components[0].setDisabled(false);
              await i.deferUpdate();
              await wait(1000);
              msg.edit({
                embeds: [
                  new Discord.MessageEmbed()
                    .setTitle(result[2].name)
                    .addFields(
                      {
                        name: "Source",
                        value:
                          `${result[2].source}` || "Cannot fetch information",
                      },
                      {
                        name: "Views",
                        value:
                          `**\`${result[2].views}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      },
                      {
                        name: "Duration",
                        value:
                          `**\`${result[2].formattedDuration}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      }
                    )
                    .setThumbnail(
                      result[2].thumbnail ||
                        message.member.displayAvatarURL({ dynamic: true })
                    )
                    .setURL(result[2].url),
                ],
                components: [playRaw],
              });
              client.on("interactionCreate", async (interaction) => {
                if (!interaction.isButton()) return;
                await interaction.deferUpdate();
                if (interaction.customId === playRaw.components[0].customId) {
                  if (!message.member.voice.channel)
                    return message.channel.send(
                      "You need to join a voice channel"
                    );
                  client.distube.play(
                    message.member.voice.channel,
                    result[2].url,
                    {
                      member: message.member,
                      textChannel: message.channel,
                      message,
                    }
                  );
                }
              });
            }
            if (i.customId === raw.components[3].customId) {
              playRaw.components[0].setDisabled(false);
              await i.deferUpdate();
              await wait(1000);
              msg.edit({
                embeds: [
                  new Discord.MessageEmbed()
                    .setTitle(result[3].name)
                    .addFields(
                      {
                        name: "Source",
                        value:
                          `${result[3].source}` || "Cannot fetch information",
                      },
                      {
                        name: "Views",
                        value:
                          `**\`${result[3].views}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      },
                      {
                        name: "Duration",
                        value:
                          `**\`${result[3].formattedDuration}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      }
                    )
                    .setThumbnail(
                      result[3].thumbnail ||
                        message.member.displayAvatarURL({ dynamic: true })
                    )
                    .setURL(result[3].url),
                ],
                components: [playRaw],
              });
              client.on("interactionCreate", async (interaction) => {
                if (!interaction.isButton()) return;
                await interaction.deferUpdate();
                if (interaction.customId === playRaw.components[0].customId) {
                  if (!message.member.voice.channel)
                    return message.channel.send(
                      "You need to join a voice channel"
                    );
                  client.distube.play(
                    message.member.voice.channel,
                    result[3].url,
                    {
                      member: message.member,
                      textChannel: message.channel,
                      message,
                    }
                  );
                }
              });
            }
            if (i.customId === raw.components[4].customId) {
              playRaw.components[0].setDisabled(false);
              await i.deferUpdate();
              await wait(1000);
              msg.edit({
                embeds: [
                  new Discord.MessageEmbed()
                    .setTitle(result[4].name)
                    .addFields(
                      {
                        name: "Source",
                        value:
                          `${result[4].source}` || "Cannot fetch information",
                      },
                      {
                        name: "Views",
                        value:
                          `**\`${result[4].views}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      },
                      {
                        name: "Duration",
                        value:
                          `**\`${result[4].formattedDuration}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      }
                    )
                    .setThumbnail(
                      result[4].thumbnail ||
                        message.member.displayAvatarURL({ dynamic: true })
                    )
                    .setURL(result[4].url),
                ],
                components: [playRaw],
              });
              client.on("interaction", async (interaction) => {
                if (!interaction.isButton()) return;
                await interaction.deferUpdate();

                if (interaction.customId === playRaw.components[0].customId) {
                  if (!message.member.voice.channel)
                    return message.channel.send(
                      "You need to join a voice channel"
                    );
                  client.distube.play(
                    message.member.voice.channel,
                    result[4].url,
                    {
                      member: message.member,
                      textChannel: message.channel,
                      message,
                    }
                  );
                }
              });
            }
            if (i.customId === raw2.components[0].customId) {
              playRaw.components[0].setDisabled(false);
              await i.deferUpdate();
              await wait(1000);
              msg.edit({
                embeds: [
                  new Discord.MessageEmbed()
                    .setTitle(result[5].name)
                    .addFields(
                      {
                        name: "Source",
                        value:
                          `${result[5].source}` || "Cannot fetch information",
                      },
                      {
                        name: "Views",
                        value:
                          `**\`${result[5].views}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      },
                      {
                        name: "Duration",
                        value:
                          `**\`${result[5].formattedDuration}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      }
                    )
                    .setThumbnail(
                      result[5].thumbnail ||
                        message.member.displayAvatarURL({ dynamic: true })
                    )
                    .setURL(result[5].url),
                ],
                components: [playRaw],
              });
              client.on("interactionCreate", async (interaction) => {
                if (!interaction.isButton()) return;
                await interaction.deferUpdate();
                if (interaction.customId === playRaw.components[0].customId) {
                  if (!message.member.voice.channel)
                    return message.channel.send(
                      "You need to join a voice channel"
                    );
                  client.distube.play(
                    message.member.voice.channel,
                    result[5].url,
                    {
                      member: message.member,
                      textChannel: message.channel,
                      message,
                    }
                  );
                }
              });
            }
            if (i.customId === raw2.components[1].customId) {
              playRaw.components[0].setDisabled(false);
              await i.deferUpdate();
              await wait(1000);
              msg.edit({
                embeds: [
                  new Discord.MessageEmbed()
                    .setTitle(result[6].name)
                    .addFields(
                      {
                        name: "Source",
                        value:
                          `${result[6].source}` || "Cannot fetch information",
                      },
                      {
                        name: "Views",
                        value:
                          `**\`${result[6].views}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      },
                      {
                        name: "Duration",
                        value:
                          `**\`${result[6].formattedDuration}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      }
                    )
                    .setThumbnail(
                      result[6].thumbnail ||
                        message.member.displayAvatarURL({ dynamic: true })
                    )
                    .setURL(result[6].url),
                ],
                components: [playRaw],
              });
              client.on("interactionCreate", async (interaction) => {
                if (!interaction.isButton()) return;
                await interaction.deferUpdate();
                if (interaction.customId === playRaw.components[0].customId) {
                  if (!message.member.voice.channel)
                    return message.channel.send(
                      "You need to join a voice channel"
                    );
                  client.distube.play(
                    message.member.voice.channel,
                    result[6].url,
                    {
                      member: message.member,
                      textChannel: message.channel,
                      message,
                    }
                  );
                }
              });
            }
            if (i.customId === raw2.components[2].customId) {
              playRaw.components[0].setDisabled(false);
              await i.deferUpdate();
              await wait(1000);
              msg.edit({
                embeds: [
                  new Discord.MessageEmbed()
                    .setTitle(result[7].name)
                    .addFields(
                      {
                        name: "Source",
                        value:
                          `${result[7].source}` || "Cannot fetch information",
                      },
                      {
                        name: "Views",
                        value:
                          `**\`${result[7].views}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      },
                      {
                        name: "Duration",
                        value:
                          `**\`${result[7].formattedDuration}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      }
                    )
                    .setThumbnail(
                      result[7].thumbnail ||
                        message.member.displayAvatarURL({ dynamic: true })
                    )
                    .setURL(result[7].url),
                ],
                components: [playRaw],
              });
              client.on("interactionCreate", async (interaction) => {
                if (!interaction.isButton()) return;
                await interaction.deferUpdate();
                if (interaction.customId === playRaw.components[0].customId) {
                  if (!message.member.voice.channel)
                    return message.channel.send(
                      "You need to join a voice channel"
                    );
                  client.distube.play(
                    message.member.voice.channel,
                    result[97].url,
                    {
                      member: message.member,
                      textChannel: message.channel,
                      message,
                    }
                  );
                }
              });
            }
            if (i.customId === raw2.components[3].customId) {
              playRaw.components[0].setDisabled(false);
              await i.deferUpdate();
              await wait(1000);
              msg.edit({
                embeds: [
                  new Discord.MessageEmbed()
                    .setTitle(result[8].name)
                    .addFields(
                      {
                        name: "Source",
                        value:
                          `${result[8].source}` || "Cannot fetch information",
                      },
                      {
                        name: "Views",
                        value:
                          `**\`${result[8].views}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      },
                      {
                        name: "Duration",
                        value:
                          `**\`${result[8].formattedDuration}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      }
                    )
                    .setThumbnail(
                      result[8].thumbnail ||
                        message.member.displayAvatarURL({ dynamic: true })
                    )
                    .setURL(result[8].url),
                ],
              });
              client.on("interactionCreate", async (interaction) => {
                if (!interaction.isButton()) return;
                await interaction.deferUpdate();
                if (interaction.customId === playRaw.components[0].customId) {
                  if (!message.member.voice.channel)
                    return message.channel.send(
                      "You need to join a voice channel"
                    );
                  client.distube.play(
                    message.member.voice.channel,
                    result[8].url,
                    {
                      member: message.member,
                      textChannel: message.channel,
                      message,
                    }
                  );
                }
              });
            }
            if (i.customId === raw2.components[4].customId) {
              playRaw.components[0].setDisabled(false);
              await i.deferUpdate();
              await wait(1000);
              msg.edit({
                embeds: [
                  new Discord.MessageEmbed()
                    .setTitle(result[9].name)
                    .addFields(
                      {
                        name: "Source",
                        value:
                          `${result[9].source}` || "Cannot fetch information",
                      },
                      {
                        name: "Views",
                        value:
                          `**\`${result[9].views}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      },
                      {
                        name: "Duration",
                        value:
                          `**\`${result[9].formattedDuration}\`**` ||
                          "Cannot fetch information",
                        inline: true,
                      }
                    )
                    .setThumbnail(
                      result[9].thumbnail ||
                        message.member.displayAvatarURL({ dynamic: true })
                    )
                    .setURL(result[9].url),
                ],
                components: [playRaw],
              });
              //69
              client.on("interactionCreate", async (interaction) => {
                if (!interaction.isButton()) return;
                await interaction.deferUpdate();
                if (interaction.customId === playRaw.components[0].customId) {
                  if (!message.member.voice.channel)
                    return message.channel.send(
                      "You need to join a voice channel"
                    );
                  client.distube.play(
                    message.member.voice.channel,
                    result[9].url,
                    {
                      member: message.member,
                      textChannel: message.channel,
                      message,
                    }
                  );
                }
              });
            }
          });
        });
      }
 */
