const { Channel } = require('discord.js');
const mysql = require('mysql'); 
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
      nome: 'banuser',                                                  
      aliases: ['baniruser'],                               
      descricao: 'Comando que bane o usuário do servidor.',     
      utilizacao: '!banuser',                                            
      cooldown: 0
    },
    run: async (client, message, args) => {

        let banReason = args.slice(1);

if(!args[0]){
return  message.reply("você não especificou o **ID**.")
}
        if(!banReason) return message.reply("você não informou um motivo!");
        if(!message.member.hasPermission("BAN_MEMBERS")) return;
        
            connection.query(`UPDATE vrp_users SET banned = '1', whitelisted = '0' WHERE id = '${args[0]}'`, (err, rows) => {
            });
            message.reply(`O usuário do ID **${args[0]}** foi banido pelo motivo **${banReason}**.`);


    }
  }
  