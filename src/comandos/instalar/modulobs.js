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
  nome: 'modulobs',
  aliases: ['modulobs', 'modulobs'],
  descricao: 'Comando que faz a instalação de canais do Bot.',
  utilizacao: '!modulobs',
  cooldown: 3
},

run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Sem permissão')

  connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{
    if (err) throw err;

        if(args[0] === "1"){
            connection.query(`UPDATE bot_cfg SET modulo_bs = '1'`, (err, rows) => {
                if (err) throw err;
              });

            const embed = new Client.MessageEmbed()
            .addField("Ativado!", `Opa, o módulo Boas vindas e Saídas foi **ativado** com sucesso!`)
            .setColor("#2b961f")//COR DA CAIXA DE DIALOGO
            .setAuthor("HypeBot - Source Original")
            return message.channel.send(embed)
        
        }
        if(args[0] === "0"){
            connection.query(`UPDATE bot_cfg SET modulo_bs = '0'`, (err, rows) => {
                if (err) throw err;
              });

            const embed = new Client.MessageEmbed()
            .addField("Desativado!", `Opa, o módulo Boas vindas e Saídas foi **desativado** com sucesso!`)
            .setColor("#ff0000")//COR DA CAIXA DE DIALOGO
            .setAuthor("HypeBot - Source Original")
            return message.channel.send(embed)     
        
        }
        if(args[0] !== "0" || args[0] !== "1"){
            const embed = new Client.MessageEmbed()
            .addField("Ops...", `Perdão, _**${args[0]}**_ não é uma opção. Tente novamente.`)
            .setColor('RANDOM')
            .setAuthor("HypeBot - Source Original")
            return message.channel.send(embed)
        }
     }
  )}
}