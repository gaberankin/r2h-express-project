let currentTag = ''

function getData(args={}) {
	const {
		tag = '',
		name = ''
	} = args

	currentTag = tag

	const gameContainer = document.getElementById('game-container');
	gameContainer.innerHTML = "Please wait...";
	fetch("/api/games?tag="+encodeURIComponent(tag)+'&name='+encodeURIComponent(name)).then(res => {
		if (!res.ok) {
			throw new Error(`Response returned with non-ok code ${res.status} and message ${res.statusText}`);
		}
		return res.json();
	}).then(games => {
		gameContainer.innerHTML = '';
		for(let i = 0; i < games.length; i++) {
			const gameItem = createGameItemElement(games[i])
			gameContainer.appendChild(gameItem);
		}
	}).catch(err => {
		gameContainer.innerHTML = 'An error occurred.  Please wait a moment and try again';
		console.error("error occurred on fetch", err);
	})
}

function searchGames() {
	const inputEl = document.getElementById('game-name-search');
	const nameSearch = inputEl.value
	getData({name: nameSearch})
}

function createGameItemElement(game) {
	const itemEl = document.createElement('div')
	itemEl.className = 'game'

	const itemImageEl = document.createElement('img')
	itemImageEl.src = game.img

	const itemNameEl = document.createElement('div')
	itemNameEl.className = 'game-name'
	itemNameEl.innerText = game.name;

	const itemUrlEl = document.createElement('div')
	itemUrlEl.className = 'game-url'
	const itemUrlLink = document.createElement('a')
	itemUrlLink.href = game.url;
	itemUrlLink.innerText = 'Website';
	
	itemUrlEl.appendChild(itemUrlLink);


	const itemTagsEl = document.createElement('div')
	itemTagsEl.className = 'game-tags'
	for(let i = 0; i < game.tags.length; i++) {
		const tagLinkEl = document.createElement('a')
		const tag = game.tags[i];
		tagLinkEl.innerText = tag;
		if (tag == currentTag) {
			tagLinkEl.className = 'current-tag'
		}
		tagLinkEl.addEventListener('click', (e) => {
			e.preventDefault()
			getData({tag})
		})
		itemTagsEl.appendChild(tagLinkEl)
		
		if (i < game.tags.length - 1) {
			var commaEl = document.createTextNode(", ")
			itemTagsEl.appendChild(commaEl)
		}

	}
	// itemTagsEl.innerText = game.tags.join(', ');


	itemEl.appendChild(itemNameEl)
	itemEl.appendChild(itemImageEl)
	itemEl.appendChild(itemUrlEl)
	itemEl.appendChild(itemTagsEl)

	return itemEl
}

window.onload = function() {
	getData()
}