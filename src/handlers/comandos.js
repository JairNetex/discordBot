const { readdirSync } = require('fs')
const colors = require('colors');
module.exports = (client) => {

  const load = dirs => {
    const commands = readdirSync(`./src/comandos/${dirs}/`).filter(f => f.endsWith('.js'))

    for (let file of commands) {
      const comando = require(`../comandos/${dirs}/${file}`)
      client.commands.set(comando.config.nome, comando)
      console.log(colors.green(`Comando ${comando.config.nome} carregado com sucesso!`))
      if (comando.config.aliases) comando.config.aliases.forEach(a => client.aliases.set(a, comando.config.nome))
    }
  }

  readdirSync(`./src/comandos/`).forEach(x => load(x))

}