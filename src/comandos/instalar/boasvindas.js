const Client = require('discord.js')
const mysql = require('mysql'); 
const { conexaodb, userdb, senhadb, db } = require("../../../config.json")

const connection = mysql.createPool({ //Info da database, para conectar
  connectionLimit : 10,
  host: conexaodb,
  user: userdb,
  password: senhadb,
  database: db
});
module.exports = {
config: {
  nome: 'boasvindas',
  aliases: ['bv', 'boasv'],
  descricao: 'Comando que faz a instalação de boas vindas do bot.',
  utilizacao: '!boasvindas #mencione',
  cooldown: 3
},


run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Sem permissão')
    let pegarid7 = message.guild.channels.cache.get(args[0].substring(2).substring(0,18));

    connection.query(`UPDATE bot_cfg SET canal_boas_vindas = '${pegarid7.id}'`, (err, rows) => {
        if (err) throw err;
        const embed = new Client.MessageEmbed()
        .addField("Setado!", `Opa, o canal de Boas vindas foi **setado** com sucesso!`)
        .setColor("#2b961f")//COR DA CAIXA DE DIALOGO
        .setAuthor("HypeBot - Source Original")
        return message.channel.send(embed)
    
      });
    
  
}
}