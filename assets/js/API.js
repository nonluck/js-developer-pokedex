var pokemons = [];
var remaining_amount = 32;

//faz a requisição para a API, mas de maneira linear, sendo orientado pelo número da página.
function getDataContent(num) {

    const url = `https://pokeapi.co/api/v2/pokemon/${num}`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            pokemons[response.id - pagina * 32 + 32] = setDataInPokemonClass(response);
            return response;
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            remaining_amount -= 1
            if (remaining_amount == 0) {
                remaining_amount = 32;
                listarPokemons();

            }
        }
        )
}

//faz a requisição para a API usando os números randomicos
function getDataContentRandom(index, num) {

    const url = `https://pokeapi.co/api/v2/pokemon/${num}`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {

            pokemons[index] = setDataInPokemonClass(response);
            return response;
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(function () {
            remaining_amount -= 1;
            if (remaining_amount == 0) {
                remaining_amount = 32;
                listarPokemons();

            }
        }
        )
}
//organiza os dados do objeto Pokémon
function setDataInPokemonClass(data) {
    const separator_status = data.stats.map(x => x.base_stat);
    //name, id, weight, height, status, types, img
    let pokemon = new Pokemon(data.name, data.id, data.weight, data.height, separator_status, data.types);
    return pokemon;
}


//gera o HTML geral, no qual está todos os pokémons da página
function listarPokemons() {
    var HTMLContent = ``;
    for (let i = 1; i < 33; i++) {
        HTMLContent += getContentHTML(pokemons[i])
        if (pokemons[i].id == pokemon_limit) {
            break;
        }
    }
    content.innerHTML = HTMLContent;

}


//Montará o card onde os pokemons serão exibidos
function getContentHTML(pokemon) {
    //deixara a primeira letra e cada nome em maiusculo
    const typeHTML = setCorretType(pokemon.types);
    pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
    const dataPokemon = `
            <li class="pokemon ${pokemon.types[0].type.name}">
                <span class="number">#${setCorretID(pokemon.id)}</span>
                <div class="name-pokemon"><span class="name">${pokemon.name}</span> <button class="shinyBtn "><i class="fa fa-star ${pokemon.name} ${pokemon.id} shiny"></i></button></div>
                

                <div class="detail">
                    <ol class="types">
                        ${typeHTML}
                    </ol>

                    <img class="${pokemon.name}img img" style="background-color:rgba(200, 200, 200, 0.645);"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif"
                        alt="${pokemon.name}" style="background-color:black;"></img>
                    
                </div>
                <div class="div-status"><div>HP&nbsp;&nbsp; <canvas class="status-bar ${pokemon.types[0].type.name}" style="width:${(pokemon.status[0]/2)+10}px;"></canvas></div> ${pokemon.status[0]} </div>
                <div class="div-status"><div>ATK <canvas class="status-bar ${pokemon.types[0].type.name}" style="width:${(pokemon.status[1]/2)+10}px;"></canvas></div> ${pokemon.status[1]} </div>
                <div class="div-status"><div>DEF <canvas class="status-bar ${pokemon.types[0].type.name}" style="width:${(pokemon.status[2]/2)+10}px;"></canvas></div> ${pokemon.status[2]} </div>
                <div class="div-status"><div>SAT <canvas class="status-bar ${pokemon.types[0].type.name}" style="width:${(pokemon.status[3]/2)+10}px;"></canvas></div> ${pokemon.status[3]} </div>
                <div class="div-status"><div>SDF <canvas class="status-bar ${pokemon.types[0].type.name}" style="width:${(pokemon.status[4]/2)+10}px;"></canvas></div> ${pokemon.status[4]} </div>
                <div class="div-status"><div>SPD <canvas class="status-bar ${pokemon.types[0].type.name}" style="width:${(pokemon.status[5]/2)+10}px;"></canvas></div> ${pokemon.status[5]} </div>
                </div>
                
            </li>
    `
    return dataPokemon;
}



//converterá o id para uma versão de 3 caracteres, ex: 3 -> 003
const setCorretID = (num) => ("0".repeat(parseInt(3 - (`${num}`).length))) + `${num}`;


//irá configurar os tipos para ficar visualmente mais adequado
function setCorretType(types) {
    let typeHTML = `something wrong`;
    if (types.length == 2) {
        typeHTML = `<li class="${types[0].type.name} type">${types[0].type.name}</li>
    <li class="${types[1].type.name} type">${types[1].type.name}</li>`
    } else {
        typeHTML = `<li class="${types[0].type.name} type">${types[0].type.name}</li>`
    };
    return typeHTML;
}

//verifica se onde foi clicado é um card para mudar o pokémon nele contido para shiny ou normal
function setShinyPokemon(a) {
    const classes = a.target.classList;
    if ("shiny" == classes[4]) {
        const top = document.querySelector(`.${classes[2]}img`)
        top.style = "background-color:rgba(230, 230, 45, 0.645);";
        top.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${classes[3]}.gif`
        classes.remove("shiny");
        classes.add("non-shiny");
        return;
    } else if ("non-shiny" == classes[4]) {
        const top = document.querySelector(`.${classes[2]}img`)
        top.style = "background-color:rgba(200, 200, 200, 0.645);";
        top.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${classes[3]}.gif`
        classes.remove("non-shiny");
        classes.add("shiny");
        return
    } else {

    }
}