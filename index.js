const { Client, Intents, GuildMember } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, /*Intents.FLAGS.GUILD_MEMBERS*/]
});
client.on('ready', () => {
  console.log('Bot je online');
})
const { MessageEmbed } = require('discord.js');
const PREFIX = '!';

var ctrl = false;
var num = NaN;

client.on('message', message=>{

  let args = message.content.substring(PREFIX.length).split(" ");

  switch(args[0]){
      case 'ping':
              message.channel.send('pong')
          break;
      case "pomoc":
            const pomoc = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle("Korisne komande:")
              .addField("!ping", "pong")
              .addField("!pomoc", "Prikaze ovaj embed prozor.")
              .addField("!random", "Izabere nasumičan broj između neka 2 broja koja mi upišemo.")
              .addField("!obrisi", "Obrise poruke u kanalu (treba specificirat koliki broj poruka brišemo)")
              .addField("!macka", "Posalje nasumicno odabranu sliku macke")
              .addField("!github", "Prikaže prozor s informacijama o githubu studenta.")
              .addField("!guess", "Pogodite zamišljen broj")
              .setColor('0x00d4ff');
            message.channel.send({ embeds: [pomoc] });
          break;
      case 'obrisi':
            if(!args[1]) return message.reply('Molimo upisite broj poruka koji zelite obrisati.')
                message.channel.bulkDelete(args[1]);
          break;
      case 'github':
            const github = new MessageEmbed()
                .setTitle('Ovo je embed prozor')
                .addField('‎', '[Link na moj github](https://github.com/AlenOrbanic/)')
                .setImage('https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU')
                .setFooter('Source code chatbota je dostupan svima na korištenje.')
                .setColor('0x00d4ff');
            message.channel.send({ embeds: [github] });
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
      case "guess":
            if (!args[1]) {
              message.reply("Picking a random number between 1 and 100");
              num = Math.floor(Math.random() * 100 + 1);
              guesses = 0;
              ctrl = true;
            } else if (args[1] == num && ctrl) {
              guesses++;
              message.reply("You got it! Only took " + guesses + " tries.");
              ctrl = false;
            } else if (args[1] < num && ctrl) {
              message.reply(args[1] + " is too low");
              guesses++;
            } else if (args[1] > num && ctrl) {
              message.reply(args[1] + " is too high");
              guesses++;
            }
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