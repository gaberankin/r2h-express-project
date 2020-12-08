const fs = require('fs')

function loadGames() {
  const games = fs.readFileSync('./data/games.json', 'utf8');
  return JSON.parse(games)
}

function saveGames(games) {
  fs.writeFileSync('./data/games.json', JSON.stringify(games));
}

module.exports = {
  loadGames,
  saveGames,
}