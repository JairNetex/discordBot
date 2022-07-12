const Client = require("discord.js"); 
const mysql = require("mysql");
const { conexaodb, userdb, senhadb, db } = require("../../../config.json")

const connection = mysql.createPool({
connectionLimit : 10,
  host: conexaodb,
  user: userdb,
  password: senhadb,
  database: db
});


module.exports = {
    config: {
      nome: 'status',
      aliases: [],
      descricao: 'Comando para ver quantos jogadores há online!.', 
      utilizacao: '!status',
      cooldown: 5
    },

run: async (client, message, args) => {
  connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{


    'use strict';
    var request = require('request');
    
    var url = `http://189.127.164.20:30120/info.json`;
    
    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
        } else {
          const slots = data['vars'].sv_maxClients;

// CONTAGEM


const FiveM = require("fivem-node-api");

const srv = new FiveM(`189.127.164.20:30120`, {
  debug: true,
})
  .then(async (server) => {
    var tcpp = require('tcp-ping');
    tcpp.ping({ address: `189.127.164.20`}, async(err, data, results)  =>{

    tcpp.probe(`189.127.164.20`, result[0].porta, async (err, available) =>{
    
      if(available == true){
        const res = Intl.NumberFormat('en', {notation: 'standard',});

    const players = await server.getPlayersCount();
    const embed = new Client.MessageEmbed()
    .setColor("GREEN")//COR DA CAIXA DE DIALOGO
                      .setTitle(`Status do Servidor`)
                      .setDescription('')
                      .addField("Quantidade de jogadores online:", `${players}`)
                      .addField("Quantidade de slots:", `${slots}`)
                      .addField("Status do Servidor:", `**Online!**`)
                      .addField("Ping:", `**${res.format(data.results[0].time)}ms**`)
                      .setThumbnail(`${result[0].imgwl}`)
                      .setTimestamp(new Date())
                      .setFooter(`Real Life City`)
                      message.channel.send(embed)
    }
    else{
      const players = await server.getPlayersCount();
      const embed = new Client.MessageEmbed()
      .setColor("GREEN")//COR DA CAIXA DE DIALOGO
                        .setTitle(`Status do Servidor`)
                        .addField("Quantidade de jogadores online:", `${players}`)
                        .addField("Quantidade de slots:", `${slots}`)
                        .addField("Status do Servidor:", `**Offline!**`)
                        .setTimestamp(new Date())
                        .setFooter(`Real Life City`)
  
                        message.channel.send(embed)
    }
    // message.channel.send(`Olá, ${message.author}. Atualmente o servidor tem: ${players} jogadores onlines de ${slots} vagas!`)
  });
});
})
}
})
});
 


}
}
