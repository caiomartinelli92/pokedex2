const pokeApi = {}
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.name = pokeDetail.name
  pokemon.number = pokeDetail.id

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

  pokemon.weight = pokeDetail.weight

  pokemon.hp = pokeDetail.stats[0].base_stat
  pokemon.attack = pokeDetail.stats[1].base_stat
  pokemon.defense = pokeDetail.stats[2].base_stat

  pokemon.specialAttack = pokeDetail.stats[3].base_stat
  pokemon.specialDefense = pokeDetail.stats[4].base_stat
  pokemon.speed = pokeDetail.stats[5].base_stat
  return pokemon
}

pokeApi.getPokemonDetail = pokemon => {
  return fetch(pokemon.url)
    .then(response => response.json())
    .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

  return fetch(url)
    .then(response => response.json())
    .then(jsonBody => jsonBody.results)
    .then(pokemons => pokemons.map(pokeApi.getPokemonDetail))
    .then(detailRequests => Promise.all(detailRequests))
    .then(pokemonsDetails => pokemonsDetails)
}

pokeApi.getPokemonMoreDetail = name => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`

  return fetch(url)
    .then(response => response.json())
    .then(convertPokeApiDetailToPokemon)
}

/*
display: grid;
    grid-template-columns: 50% 50%;
    grid-template-areas: 
    "span span"
    "image"
    "stats stats"
    "span"
    "fechar"
    ;
*/
