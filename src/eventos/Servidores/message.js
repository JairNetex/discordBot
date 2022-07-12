const { Collection, MessageEmbed } = require('discord.js')
const { prefix } = require("../../../config.json")
const mysql = require('mysql'); 
const { conexaodb } = require("../../../config.json")
const { userdb } = require("../../../config.json")
const { senhadb } = require("../../../config.json")
const { db } = require("../../../config.json")

const connection = mysql.createPool({
connectionLimit : 10, 
  host: conexaodb,
  user: userdb,
  password: senhadb,
  database: db
});


const cooldowns = new Collection()

module.exports = async (client, message) => {

    if (message.author.bot || message.channel.type === 'dm') return
    connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{

      if(result[0].instalado === '0'){
        return message.channel.send("**Você não instalou o bot ;-;**\n\nInstale utilizando **!instalar**").then(i=>i.delete(({ timeout: 10000 }))).catch((err) => console.log("NAO CONSEGUI DELETAR UMA MENSAGEM POIS A MESMA JA FOI APAGADA!"));
      }

     if(message.content.toLowerCase() !== "!whitelist" && message.content.toLowerCase() !== "!anunciarwl" && message.channel.id == result[0].canal_fazer_whitelist){
        message.reply("Sem conversa nesse canal! Somente Whitelist.").then(i=>i.delete(({ timeout: 10000 }))).catch((err) => console.log("NAO CONSEGUI DELETAR UMA MENSAGEM POIS A MESMA JA FOI APAGADA!"));
        message.delete().catch((err) => console.log("NAO CONSEGUI DELETAR UMA MENSAGEM POIS A MESMA JA FOI APAGADA!"));
     }
    });
    if(!message.member.hasPermission('ADMINISTRATOR')){ //só vai bloquear o invite caso quem o enviou não tenha permissão de admin

      if(message.content.includes('discord.gg/' || 'discordapp.com/invite/')){ //reconhece se há um invite na mensagem
  
          message.delete().catch((err) => console.log("NAO CONSEGUI DELETAR UMA MENSAGEM POIS A MESMA JA FOI APAGADA!")) //deleta a msg com invite
            .then(message.channel.send(`${message.author}, você não pode enviar convites de servidores aqui!`));
  
      }
  
  }
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const comando = args.shift().toLowerCase()
    if (!message.content.startsWith(prefix)) return 





    const comandoInfo = client.commands.get(comando) || client.commands.get(client.aliases.get(comando))

    if (comandoInfo) {
      if (!cooldowns.has(comandoInfo.config.nome)) cooldowns.set(comandoInfo.config.nome, new Collection())

      const now = Date.now()
      const timestamps = cooldowns.get(comandoInfo.config.nome)
      const cooldown = (comandoInfo.config.cooldown || 0) * 1000

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldown;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message
              .reply(`você precisa esperar mais ${timeLeft.toFixed(1)} segundo(s) até poder usar esse comando novamente.`)
              .then(msg => msg.delete({ timeout: timeLeft * 1000 }).catch(e => console.log('Ocorreu um erro tentando apagar a mensagem do bot.')))
              .catch(e => console.log('Ocorreu um erro tentando enviar a mensagem no chat.'))
        }
      }

      timestamps.set(message.author.id, now)
      setTimeout(() => timestamps.delete(message.author.id), cooldown)

      comandoInfo.run(client, message, args)
    }
}
