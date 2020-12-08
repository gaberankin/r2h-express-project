const fs = require('fs')


function loadGames() {
	const games = fs.readFileSync('./data/games.json', 'utf8');
	return JSON.parse(games)
}

module.exports = {
	loadGames
}