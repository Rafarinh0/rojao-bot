const Discord = require('discord.js');
const token = process.env.TOKEN;
const prefix = '!';

const app = new Discord.Client();

app.on('ready', () => {
    console.log('To on');
    console.log(`serving ${app.guilds.cache.size} servers`);
});

app.on("guildCreate", guild => {
    let channelID;
    let channels = guild.channels.cache;

    channelLoop:
    for (let key in channels) {
        let c = channels[key];
        if (c[1].type === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    const msg = new Discord.MessageEmbed()
      .setTitle('TÔ ON')
			.setDescription('Se for meter o louco na comemoração, ou só ficar triste com uma notícia dessas, é só mandar um !rojao ou !rojão que eu tô lá!')
			.setFooter('PAPAPUPU 🎆🎇PAPUL🎆🎇🎇🎆FIIILLLPUUUUUPOWPOWPOWPOW')
    channel.send(msg);
});


app.on('message', (msg) => {
    if (msg.content === `${prefix}rojao` || msg.content === `${prefix}rojão` && msg.member.voice.channel && !msg.author.bot) {
        msg.member.voice.channel.join().then(connection => {
            const dispatcher = connection.play('rojao.mp3');
            dispatcher.volume(1);
            msg.reply('PAPAPUPU 🎆🎇PAPUL🎆🎇🎇🎆FIIILLLPUUUUUPOWPOWPOWPOW🎇🎇🎇🎆🎆🎆PAPAPAPATRATRATRATRATRA🎇🎆🎇🎆🎇🎆🎇🎆🎇TATATATATAFIIIIILLLFIIIIILLLLFIIIIIIILLLPOOOWWWWWW🎇🎆🎇🎆🎇🎆🎇🎇🎆PAPAPAPAPUPUPUPUPU🎉🎉🎉🎊🎊🎊🎉PAPAPUPU🎆🎇PAPUL🎆FIIILLLPUUUUUPOWPOWPOWPAPAPAPATRATRATRATRA')
            dispatcher.on('finish', () => { msg.member.voice.channel.leave() });
        });
    };

    if (msg.content === `${prefix}rojaoservers`){
        let guilds = app.guilds.cache.array().join('\n');
    
        const serverlist = new Discord.MessageEmbed()
          .setTitle('Servers onde eu to: ')
          .setDescription(guilds)
    
        msg.channel.send(serverlist);
    }
});

app.login(token);