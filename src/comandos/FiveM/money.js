const { Channel } = require('discord.js');
const mysql = require('mysql'); 
const { conexaodb, userdb, senhadb, db } = require("../../../config.json")

module.exports = {
    config: {
      nome: 'money',
      aliases: ['money'],
      descricao: 'Comando que dá dinheiro no servidor.',
      utilizacao: '!money id tipo (BANCO ou CARTEIRA) quantidade: !money 1 carteira 3200',
      cooldown: 0
    },
    run: async (client, message, args) => {

        if(!message.member.hasPermission("ADMINISTRATOR")) return;

        const connection = mysql.createPool({
connectionLimit : 10,
            host: conexaodb,
            user: userdb,
            password: senhadb,
            database: db
          });
          connection.connect((err) => {
          });

          
          const id = args[0];
          const tipo = args[1];
          const quantia = args[2];

          if(tipo === "banco"){
                connection.query(`UPDATE vrp_user_moneys SET bank = bank + ${quantia} WHERE user_id = '${id}'`, (err, rows) => { //atualizando a whitelist do servidor
                });
                
                connection.query("SELECT * FROM vrp_user_moneys", function (err, result, fields) {
                    if (err) throw err;
                    
                    const res = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'});
                    message.reply(`O usuário do ID **${id}** teve seu dinheiro atualizado **(BANCO)**. Nova quantia: **${res.format(result[0].bank)}**.`);
                    console.log(result)
                });
                }
                
        }
        
  }
