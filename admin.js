const express = require('express')
const utils = require('./utils')
const adminRouter = express.Router()

adminRouter.get('/', (req, res) => {
  const games = utils.loadGames()

  return res.json(games);
})

// this will create a new game
adminRouter.post('/', (req, res) => {
  const game = req.body;
  if (!game.name) {
    return res.status(400).send('name is a required field')
  }
  
  // add an empty url if there isn't one
  if (!game.url) {
    game.url = ''
  }
  // add an empty image if there isn't one (otherwise the page may end up looking gross)
  if (!game.img) {
    game.img = ''
  }
  // add an empty tags array if there aren't any (it has to be an array)
  if (!game.tags) {
    game.tags = []
  }

  const games = utils.loadGames()
  // create an id by getting the highest id in the list and adding 1 to it
  let maxId = 0;
  for(let i = 0; i < games.length; i++) {
    if (maxId < games[i].id) {
      maxId = games[i].id
    }
  }
  game.id = maxId + 1;
  // add the info about the game to the games list
  games.push({
    id: game.id,
    name: game.name,
    url: game.url,
    img: game.img,
    tags: game.tags
  })
  utils.saveGames(games);
  return res.json(games)
})

// find a game in the list, and update the information about it
adminRouter.put('/:gameId', (req, res) => {
  // question - how do you do this with the tools already implemented?
  res.status(500).send('not yet implemented')
})

module.exports = adminRouter