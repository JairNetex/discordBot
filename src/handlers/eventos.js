const { readdirSync } = require('fs')
const colors = require('colors');

module.exports = (client) => {
  console.log('\n')

  const load = dirs => {
    const events = readdirSync(`./src/eventos/${dirs}/`).filter(f => f.endsWith('.js'))

    for (let file of events) {
      const event = require(`../eventos/${dirs}/${file}`)
      let eventName = file.split(".")[0]
      console.log(colors.green(`Evento ${eventName.replace('.js', '')} carregado com sucesso!`))

      client.on(eventName, event.bind(null, client))
    }
  }
  readdirSync(`./src/eventos/`).forEach(x => load(x))
  console.log('\n')

}