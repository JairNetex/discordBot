const Discord = require("discord.js");

module.exports = {
  config: {
    nome: 'anunciar',
    aliases: ['anuncio', 'anunc'], 
    descricao: 'Anunciar algo.',
    utilizacao: '!anunciar (TEXTO) [LEMBRE-SE QUE O BOT SEMPRE VAI ANUNCIAR NO CANAL EM QUE VOCÊ DIGITOU O COMANDO]',
    cooldown: 3                                               
  },
  run: async (client, message, args) => {
if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Sem permissão')

let arg1 = args.slice().join(" ")

message.delete().catch((err) => console.log("NAO CONSEGUI DELETAR UMA MENSAGEM POIS A MESMA JA FOI APAGADA!"));

const embed = new Discord.MessageEmbed()
    .setTitle(`Anúncio - Equipe`)
    .setColor("#00ff00")
    .setDescription(`${arg1}`)
    .setFooter(`Atenciosamente equipe staff ❤️`);
  message.channel.send(embed);
  }
}
