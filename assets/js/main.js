const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class ="btn">
            <button class="btndetalhes" id='btnd' onclick="details()" >+ details</button>
            </div>

        </div>

        <div class ="janela-detalhes" id="janela-detalhes">
<div class ='detalhes'>

<button class="fechar" id="fechar">X</button>
<h1>Detalhes Pokemon</h1>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, iusto obcaecati! Nam possimus debitis deleniti, exercitationem omnis, quos consectetur, minus commodi non vero beatae officiis eius necessitatibus ipsam doloribus quidem.</P>
</div>

        </li>

        
      
    `;
}

function loadPokemonItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonList.innerHTML += newHtml;
  });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsWithNexPage = offset + limit;

  if (qtdRecordsWithNexPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItens(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItens(offset, limit);
  }
});

function details() {
    const janela = document.getElementById('janela-detalhes')

    janela.classList.add('open')

    janela.addEventListener('click', (e) => {
        if(e.target.id == 'fechar' || e.target.id == 'janela-detalhes' ){
            janela.classList.remove('open')

        }
    })

 
}
