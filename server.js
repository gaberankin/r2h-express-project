const express = require('express')
const bodyParser = require('body-parser')
const util = require('./utils')
const adminRouter = require('./admin')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/api/games/admin', adminRouter)


app.get('/api/games', (req, res) => {
  const games = util.loadGames();

  const filteredGames = games.filter(game => {
    if (!req.query.tag) {
      return true
    }
    return game.tags.includes(req.query.tag)
  }).filter(game => {
    // if the name is blank, don't do any filtering on name
    if (!req.query.name) {
      return true
    }
    return req.query.name.toLowerCase() == game.name.toLowerCase()
  })

  return res.json(filteredGames);
})


app.get('/api/games/:id', (req, res) => {
  const game = games.filter(game => {
    return game.id === parseInt(req.params.id);
  })
  
  return res.json(game)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})