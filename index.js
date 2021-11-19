const { Client, Intents, GuildMember } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, /*Intents.FLAGS.GUILD_MEMBERS*/]
});
client.on('ready', () => {
  console.log('Bot je online');
})
const { MessageEmbed } = require('discord.js');
const PREFIX = '';

// https://discord.com/developers/docs/topics/gateway#list-of-intents

client.on('message', message=>{

  let args = message.content.substring(PREFIX.length).split(" ");

  switch(args[0]){
      case 'ping':
              message.channel.send('pong')
          break;
      case 'pomoc':
            message.channel.send('Korisne komande : obrisi, macka, embed, random ')
          break;
      case 'obrisi':
            if(!args[1]) return message.reply('Molimo upisite broj poruka koji zelite obrisati.')
                message.channel.bulkDelete(args[1]);
          break;
      case 'embed':
            const embed = new MessageEmbed()
                .setTitle('Ovo je embed prozor')
                .addField('‎', '[Link na moj github](https://github.com/AlenOrbanic/)')
                .setImage('https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU')
                .setFooter('Source code chatbota je dostupan svima na korištenje.')
                .setColor('0x00d4ff');
            message.channel.send({ embeds: [embed] });
          break;
      case 'macka':
            if (message.content.startsWith (PREFIX + "macka")) {
                let imageNumber = Math.floor(Math.random()* 191) +1
                    message.channel.send ( {files: ["./macke/" + imageNumber + ".jpg"]} )
          break;
            }
      case 'random':
            var first = parseInt(args[1], 10);
            var last = parseInt(args[2], 10);
            if (!first || first === NaN || !last || last === NaN)
                return message.reply('Enter two numbers');
            var result = Math.floor(Math.random() * (last + 1 - first)) + first;
            message.reply(String(result));
          break;
    
  }
})

const RPC = require("discord-rpc");
const rpc = new RPC.Client({
    transport: "ipc"
});

rpc.on("ready", () => {
    rpc.setActivity({
        details: "Trenutno prezentira chat bota",
        state: "kao projekt IUP-a",
        startTimestamp: new Date(),
        largeImageKey: "chatting",
        largeImageText: "Testing",
    });
})
console.log("Rich presence is now active");
    rpc.login({
        clientId: ""
    });

client.login("")