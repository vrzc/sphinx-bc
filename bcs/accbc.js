const wait = require("node:timers/promises").setTimeout;
function accbc( {token, ownerID, prefix, mention = true}) {
    const Discord = require("discord.js-selfbot");
    const client = new Discord.Client()

    client.on("ready", () => {
        console.log(`BroadCast is on for ${client.user.username}`)
    });

    if(!ownerID) {
        console.error(new Error("Second Argument is missing [ownerID], Array Argument"))
        return process.exit(0)
    } 
    if(!Array.isArray(ownerID)) {
        console.error(new Error("Second Argument is not an array"));
        return process.exit(0)
    }

    client.on("message", async(message) => {

        if(!prefix) {
            return console.error(new Error("Third Argument is missing [prefix], String Argument"))
        }
        if(message.content.startsWith(prefix + "bc")) {
            if(ownerID) {
               
                if(!ownerID.includes(message.author.id)) return message.channel.send("You're not the owner")
            }
            const args = message.content.slice(prefix.length).trim().split(' ');
            let words = args.slice(1).join(" ");
            if(!words) return;
                const realine = require("readline");
                const yesOrNo = realine.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });

                yesOrNo.question(`Are you sure you want send ${words} ? Type "yes" or "no": `, (answer) => {
                    
                    if(answer === 'yes') {
                        message.guild.members.cache.filter(m => m.presence?.status !== 'offline').forEach(m => {
                            if(m.presence) {
                                wait(2000);
                                m.send(mention ? `${words} \n \n ${m}` : words).then(m => {
                                    console.log(`Sent to ${m}`)
                                }).catch(m => {
                                    console.log(`Some Errs Occured`)
                                })
                            }
            
                        })
                    } else {
                        console.log("Declined")
                    }
                })


            


        }
    })

    client.login(token)
}

module.exports = {accbc}