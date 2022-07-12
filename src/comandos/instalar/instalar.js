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
  nome: 'instalar',
  aliases: ['configurar', 'icanais'],
  descricao: 'Comando que faz a instalação de canais do Bot.',
  utilizacao: '!instalar',
  cooldown: 10
},

run: async (client, message, args) => {
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Sem permissão')

  connection.query("SELECT * FROM bot_cfg", async (err, result, fields) =>{
    if (err) throw err;

    if(result[0].instalado === "1"){
    return message.reply("Opa opa opa, você já instalou o bot!")
    }

  message.delete().catch((err) => console.log("NAO CONSEGUI DELETAR UMA MENSAGEM POIS A MESMA JA FOI APAGADA!"));
  // CONFIGURAÇÃO DA WHITE-LIST!
    let guild = message.guild;

        const channel2 = await guild.channels.create(`instalacao-bot`,{
        type: 'text',
        permissionOverwrites:[
            {
                allow: ['VIEW_CHANNEL','READ_MESSAGE_HISTORY','EMBED_LINKS','ATTACH_FILES','SEND_MESSAGES'],
                id: message.author.id
            },
            {
                deny: 'VIEW_CHANNEL',
                id: guild.id
            }
        ]
    }); 
    channel2.send(`<@${message.author.id}>`)
    const embed = new Client.MessageEmbed()
    .setColor("GREEN")//COR DA CAIXA DE DIALOGO
                      .setTitle(`Instalação - HypeBot [SOURCE]!`)
                      .setDescription(`E aí, **<@${message.author.id}>**!\nAcabei de criar seu canal para me instalar. Você tem 1 minuto a partir de **agora** em cada **pergunta**.\n\n**Canal**: ${channel2}`)
                      .setTimestamp(new Date())
                      .setFooter(`Real Life City`)

                      message.channel.send(embed).then(m => m.delete({timeout: 5000})).catch((err) => console.log("NAO CONSEGUI DELETAR UMA MENSAGEM POIS A MESMA JA FOI APAGADA!"));

    
    async function createForm({ questions, channel, time, user }) {
const { once } = require("events")

const answers = []

for (const question of questions) {

  const embed = new Client.MessageEmbed()
  .setColor("GREEN")//COR DA CAIXA DE DIALOGO
                    .setTitle(`Instalação\n`)
                    .addField("Pergunta: ", `${question} \n\n\`Responda do modo certo, sem pressa e com cuidado!\``)
                    .setTimestamp(new Date())
                    .setFooter(`RESPONDA DE ACORDO COM O QUE O BOT PEDE!`)

    channel2.send(embed)

  const filter = m => m.author.id === user.id && m.channel.id === channel2.id && m.content.length >= 1
  const options = { time: time, max: 1 }

  const collector = channel2.createMessageCollector(filter, options)

  const [collected, reason] = await once(collector, 'end')

  if (reason == 'limit') answers.push(collected.first().content)
  
  else if (reason == 'channelDelete') throw new Error('channelDelete')
  
  else if (reason == 'time') throw new Error('time')

}

return answers

}


createForm({ 
questions: [
"**[PERGUNTA]** Qual o IP do servidor?", // respostas[0] // pegarid

"**[PERGUNTA]** Qual a porta do servidor? (A PORTA PADRÃO É 30120)", // respostas[1] // pegarid2

"**[PERGUNTA]** Quantas perguntas devem ser acertadas para ser aprovado na whitelist?", // respostas[2] // pegarid3



"**[MENCIONE]**: Canal para resultados STAFF's?", // respostas[3] // pegarid4

"**[MENCIONE]** Canal para fazer Whitelist?", // respostas[4] // pegarid5

"**[MENCIONE]** Canal para tickets fechados (STAFF's)?", // respostas[5] // pegarid6

"**[MENCIONE]** Canal para Tickets Recebidos (STAFF's)", // respostas[6] // pegarid7

"**[MENCIONE]** Resultados de Whitelist's [APROVADOS]", // respostas[7] // pegarid8

"**[MENCIONE]** Resultados de Whitelist's [REPROVADOS]", // respostas[8] // pegarid9



"**[PEGUE O ID]** Categoria da Whitelist?", // respostas[9]

"**[PEGUE O ID]** ID do servidor?", // respostas[10]

"**[PEGUE O ID]** Cargo de Whitelisted?", // respostas[11]

"**[PEGUE O ID]** Cargo de visitante?", // respostas[12]

"**[PEGUE O ID]** Categoria de Tickets?", // respostas[13]

"**[PEGUE O ID]** Cargo para 1ª Advertência", // respostas[14]

"**[PEGUE O ID]** Cargo para 2ª Advertência", // respostas[15]

"**[PEGUE O ID]** Cargo para 3ª Advertência", // respostas[16]



// RESPOSTAS 17
"**[LINK]** Imagem para whitelists e outras embeds [LEMBRE-SE: HOSPEDE NO imgur.com OU PEGUE O LINK DIRETO DO DISCORD]."

],
channel: message.channel2, 
time: 100000000, 
user: message.author 
})
.then(canais => {
  let pegarid3 = message.guild.channels.cache.get(canais[3].substring(2).substring(0,18));
  let pegarid4 = message.guild.channels.cache.get(canais[4].substring(2).substring(0,18));
  let pegarid5 = message.guild.channels.cache.get(canais[5].substring(2).substring(0,18));
  let pegarid6 = message.guild.channels.cache.get(canais[6].substring(2).substring(0,18));
  let pegarid7 = message.guild.channels.cache.get(canais[7].substring(2).substring(0,18));
  let pegarid8 = message.guild.channels.cache.get(canais[8].substring(2).substring(0,18));
  connection.query(`UPDATE bot_cfg SET ip = '${canais[0]}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET porta = '${canais[1]}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET margemdeacertos = '${canais[2]}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET resultadowlstaff = '${pegarid3.id}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET iddacategoria = '${canais[9]}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET canal_fazer_whitelist = '${pegarid4.id}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET iddoservidor = '${canais[10]}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET whitelistcargo = '${canais[11]}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET nonwhitelistcargo = '${canais[12]}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET channel_staff_fticket = '${pegarid5.id}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET id_categoria_ticket = '${canais[13]}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET canal_tickets_recebidos = '${pegarid6.id}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET resultadowl_acertos = '${pegarid7.id}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET resultadowl_errados = '${pegarid8.id}'`, (err, rows) => {
    if (err) throw err;
  });  
  connection.query(`UPDATE bot_cfg SET imgwl = '${canais[17]}'`, (err, rows) => {
    if (err) throw err;
  });  
  connection.query(`UPDATE bot_cfg SET adv1 = '${canais[14]}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET adv2 = '${canais[15]}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET adv3 = '${canais[16]}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET dono = '${message.author.id}'`, (err, rows) => {
    if (err) throw err;
  });
  connection.query(`UPDATE bot_cfg SET instalado = '1'`, (err, rows) => {
    if (err) throw err;
  });
  message.author.send(`Heeeey, ${message.author}! Você **concluiu com sucesso a instalação**! Meus parabéns, agora você pode utilizar todo o vapor do bot.`)
  channel2.delete()

})

.catch(err => {
  console.log(`Algo deu errado ao trabalhar o formulário!`, err)
  message.author.send(`Aconteceu algo com o bot/servidor. Tente novamente mais tarde.`, err)
  channel2.delete()

})

}
  )}

}