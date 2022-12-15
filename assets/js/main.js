const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetailsButton = document.getElementsByClassName('pokemonDetails')
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modalContent')

//251 foi usado pq gosto mais da 2a geração
const maxRecords = 251
const limit = 10
let offset = 0

function convertPokemonToLi(pokemon) {
  return `
      <li class="pokemon ${pokemon.type}">
        <button id="${
          pokemon.name
        }" class="pokemonDetails" onclick="pokemonDetails(this)" type="button">Details</button>
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
              <ol class="types">
                  ${pokemon.types
                    .map(type => `<li class="type ${type}">${type}</li>`)
                    .join('')}
              </ol>
              <img src="${pokemon.photo}"
                   alt="${pokemon.name}">
          </div>
      </li>
  `
}

function createPokemonDetail(pokemon) {
  return `
  <div class="modalContent">
  <div class="modal-header">
    <span class="pokemonIdName">#${pokemon.number} ${pokemon.name}</span>
    <button type="button" class="fecharModal" onclick="fecharModal()">
      FECHAR
    </button>
  </div>
  <img
    src="${pokemon.photo}"
    alt="${pokemon.name}"
  />
  <div class="pokemonStats">
    <ul>
      <li>HP: ${pokemon.hp}</li>
      <li>Attack: ${pokemon.attack}</li>
      <li>Defense: ${pokemon.defense}</li>
      <li>Special Attack: ${pokemon.specialAttack}</li>
      <li>Special Defense: ${pokemon.specialDefense}</li>
      <li>Speed: ${pokemon.speed}</li>
    </ul>
    <span id="weight">Weight: ${pokemon.weight}</span>
  </div>
</div>
  `
}

function loadPokemonItens(limit, offset) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join('')
    pokemonList.innerHTML += newHtml
  })
}

loadPokemonItens(limit, offset)

loadMoreButton.addEventListener('click', () => {
  offset += limit

  const qtdRecordNextPage = offset + limit

  if (qtdRecordNextPage >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemonItens(newLimit, offset)
    loadMoreButton.parentElement.removeChild(loadMoreButton)
  } else {
    loadPokemonItens(limit, offset)
  }
})

function pokemonDetails(pokemonName) {
  //const name = pokemonName.id
  //console.log(name)
  pokeApi.getPokemonMoreDetail(pokemonName.id).then(pokemon => {
    modal.innerHTML += createPokemonDetail(pokemon)
  })
  modal.style.display = 'block'
  document.documentElement.style.overflow = 'hidden'
}

function fecharModal() {
  modal.style.display = 'none'
  modal.innerHTML = '<div class="modal"></div>'
  document.documentElement.style.overflow = 'visible'
}
