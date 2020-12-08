const express = require('express')
const util = require('./utils')


const app = express()
const port = 3000
const games = util.loadGames();

app.use(express.static('public'))

app.get('/api/games', (req, res) => {

	const filteredGames = games.filter(game => {
		if (!req.query.tag) {
			return true
		}
		return game.tags.includes(req.query.tag)
	})


	return res.json(filteredGames);
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})