const fs = require('fs');
const https = require('https');
const Discord = require('discord.js');
var auth = require('./auth.json');
const bot = new Discord.Client();
/*
https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
	fs.writeFile('data/users/newfile.txt', data, function (err) {
	  if (err) throw err;
	  console.log('File is created successfully.');
	});
    console.log(JSON.parse(data).explanation);
  });


}).on("error", (err) => {
  console.log("Error: " + err.message);
});
*/
bot.on('ready', () => {
	console.log(`Logged in as ${bot.user.tag}!`);
  
	//getUsers();
});
 
bot.on('message', message => {
  //console.log(message.content);
  //console.log(JSON.stringify(message));
    if (message.content === "ping") {
		message.reply("pong");
        //bot.sendMessage({
        //    to: message.channelID,
        //    message: "pong"
        //});
    }
    if (message.content.substring(0, 1) == '.') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0].toLowerCase();
       
        args = args.splice(1);
		//console.log(JSON.stringify(args));
        switch(cmd) {
            // .metar
            case 'metar':
			
				let icao = args[0].toUpperCase();
				if(icao.length == 4)
				{
					https.get('https://metar.vatsim.net/?id='+icao, (resp) => {
					  let data = '';

					  // A chunk of data has been recieved.
					  resp.on('data', (chunk) => {
						data += chunk;
					  });

					  // The whole response has been received. Print out the result.
					  resp.on('end', () => {
						message.reply('Weather for '+icao+' is `'+data+'`.');
					  });
					}).on("error", (err) => {
						console.log("Error: " + err.message);
						message.reply('Weather for '+icao+' unfetchable.');
					});
				}
            break;
            // .zulu
            case 'zulu':
			
				let time = new Date();
				//message.channel.send(JSON.stringify(time));
				//message.channel.send(time.getUTCHours());
				let hours = ('0'+time.getUTCHours()).substr(-2);
				let minutes = ('0'+time.getUTCMinutes()).substr(-2);
				let zuluStr = hours+minutes+'Z';
				message.reply('Time is '+zuluStr+'.');
                //bot.sendMessage({
                //    to: channelID,
                //    message: 'Pong!'
                //});
            break;
            // !ping
            case 'ping':
				message.reply('Pong!', {"UserResolvable": false});
                //bot.sendMessage({
                //    to: channelID,
                //    message: 'Pong!'
                //});
            break;
            case 'cid':
				message.channel.send('hello!');
				console.log("1: ");
				console.log(JSON.stringify(message.guild));
				console.log("2: ");
				console.log(JSON.stringify(message.guild.members));
				console.log("3: ");
				console.log(JSON.stringify(message.guild.members.get(message.author.id)));
				console.log("4: ");
				console.log(message.author.id);
				
	fs.writeFile('data/users/newfile.txt', JSON.stringify(message.guild.members.get(message.author.id)), function (err) {
	  if (err) throw err;
	  console.log('File is created successfully.');
	});
				//message.reply('CING!', {"reply": null});
                //bot.sendMessage({
                //    to: channelID,
                //    message: 'Pong!'
                //});
            break;
            // Just add any case commands if you want to..
         }
     }
});

bot.login(auth.token);

function getUsers() {
	let guilds = bot.guilds.array();
	let guild = guilds[0];

    //console.log("1: ");
    //console.log(JSON.stringify(guilds));
    //console.log(guilds.length);
    //console.log("2: ");
    //console.log(JSON.stringify(guilds[0]));
    //console.log(guilds[0].length);
    //console.log("3: ");
    //console.log(JSON.stringify(guilds[0]["members"]));
	
    //console.log(guilds[0]["members"].array().length);
    //console.log("4x: ");
    //console.log(guilds[0]["members"].length);
	
    //console.log("5: ");
    //console.log(JSON.stringify(guild));
    //console.log(guild.length);
	  allMembers = guild["members"].array();
    //console.log("6: ");
    //console.log(JSON.stringify(allMembers));
    //console.log(allMembers.length);
  for (let i = 0; i < allMembers.length; i++) {
    //console.log("I: ");
	thisMember = allMembers[i];
    //console.log(JSON.stringify(thisMember));
	//guild.fetchMember(thisMember);
    //bot.guilds.get(guilds[i].id).fetchMembers().then(r => {
    //  r.members.array().forEach(r => {
    //    let username = `${r.user.username}#${r.user.discriminator}`;
    //    console.log(`${username}`);
    //  });
    //});
    //console.log(" ");
    //console.log(" ");
  }
    //console.log(":E ");
}
/*
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	
  console.log(message);
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
	if (message.content === 'ping') {
		message.reply('pong');
	}
});
*/


/*
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

console.log('Started');

// Initialize Discord Bot
var bot = new Discord.Client({
   //token: auth.token,
   token: "NjU0MTcwMzY4NTE2MjkyNjE4.XfCxFw.u-bwZfK-HoM_nCkBFYWFIW7soL4",
   autorun: true
});

console.log('Client created');

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});
 
bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "ping") {
        bot.sendMessage({
            to: channelID,
            message: "pong"
        });
    }
});
*/
/*
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});
*/