const Discord = require("discord.js");
const mysql = require("mysql");
const { conexaodb, userdb, senhadb, db } = require("../../../config.json");

const connection = mysql.createPool({
connectionLimit : 10,
  host: conexaodb,
  user: userdb,
  password: senhadb,
  database: db
});



module.exports = {
  config: {
    nome: 'advs',
    aliases: ['advertencias', 'advsuser'], 
    descricao: 'Ver advertências de alguém.',
    utilizacao: '!adv [id]',
    cooldown: 3                                               
  },
  run: async (client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Sem permissão')

    let argumento1 = args[0];
    if(!argumento1){
       return message.reply("Você se esqueceu de digitar o **ID**.").then(m => m.delete({timeout: 5000})).catch((err) => console.log("NAO CONSEGUI DELETAR UMA MENSAGEM POIS A MESMA JA FOI APAGADA!"));
    }
connection.query(`SELECT * FROM bot_advs WHERE user_id = ${argumento1}`, function(err, result, fields){
  
    cadrianfodao = result;
    result.forEach(function(advs) {

         const embed = new Discord.MessageEmbed()
         .setTitle(`Advertências - Staff's`)
         .setColor("#FF0000")
         .setDescription(`O Jogador do ID **${argumento1}** possui **${cadrianfodao.length}** de advertências.`)
         .addField("Se desejar apagar alguma advertência, utilize em qualquer canal...\n", "!apagaradv [ID da Advertência]")
         .addField('Staff:', `${advs.staff}`, true)
         .addField('ID da advertência:', `${advs.id}`, true)
         .addField('Motivo:', `${advs.motivo}`, true)
         .addField('Quantidade atual:', `${cadrianfodao.length}/3`, true)
         .setTimestamp()
         .setFooter(`Atenciosamente.`);
         message.author.send(embed);
        message.reply(`Oi, eu não sou o Goku. Mandei todas as advertências do ID ${argumento1} no seu privado =)`).then(m => m.delete({timeout: 5000})).catch((err) => console.log("NAO CONSEGUI DELETAR UMA MENSAGEM POIS A MESMA JA FOI APAGADA!"));
        message.delete({timeout: 2000}).catch((err) => console.log("NAO CONSEGUI DELETAR UMA MENSAGEM POIS A MESMA JA FOI APAGADA!"));
        }
    )}
   )}
}
