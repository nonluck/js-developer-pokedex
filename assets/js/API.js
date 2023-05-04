var pokemons = [];
var remaining_amount=32;

function getDataContent(num){

    const url = `https://pokeapi.co/api/v2/pokemon/${num}`;
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function (response){

        pokemons[response.id-pagina*32+32]=setDataInPokemonClass(response);
        return response;
    })
    .catch(function(error){
        console.log(error);
    })
    .finally(function(){
        remaining_amount-=1
        if(remaining_amount==0){
            remaining_amount=32;
            listarPokemons();
            
        }
    }
    )
}
function getDataContentRandom(index,num){

    const url = `https://pokeapi.co/api/v2/pokemon/${num}`;
    fetch(url)
    .then(function (response){
        return response.json();
    })
    .then(function (response){

        pokemons[index]=setDataInPokemonClass(response);
        return response;
    })
    .catch(function(error){
        console.log(error)
    })
    .finally(function(){
        remaining_amount-=1;
        if(remaining_amount==0){
            remaining_amount=32;
            listarPokemons();
            
        }
    }
    )
}

function setDataInPokemonClass(data){
    
    //name, id, weight, height, status, types, img
    let pokemon = new Pokemon(data.name,data.id,data.weight,data.height,data.stats,data.types);
    return pokemon;
}

function listarPokemons(){
    var HTMLContent = ``;
    for(let i=1; i<33;i++){
        HTMLContent += getContentHTML(pokemons[i])
        if(pokemons[i].id == pokemon_limit){
            break;
        }
    }
    content.innerHTML = HTMLContent;
 
}


//Montará o card onde os pokemons serão exibidos
function getContentHTML(pokemon){
    //deixara a primeira letra e cada nome em maiusculo
    const typeHTML = setCorretType(pokemon.types);
    
    pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
    const dataPokemon=`
            <li class="pokemon ${pokemon.types[0].type.name}">
                <span class="number">#${setCorretID(pokemon.id)}</span>
                <div class="name-pokemon"><span class="name">${pokemon.name}</span> <button class="shinyBtn "><i class="fa fa-star ${pokemon.name} ${pokemon.id} shiny"></i></button></div>
                

                <div class="detail">
                    <ol class="types">
                        ${typeHTML}
                    </ol>

                    <img class="${pokemon.name}img img" style="background-color:rgba(200, 200, 200, 0.645);"src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif"
                        alt="${pokemon.name}" style="background-color:black;">
                </div>
                
            </li>
    `
    return dataPokemon;
}
//
//classe para ficar mais organizado e legível

//realmente uma parte inutil, servindo apenas para acessar


//converterá o id para uma versão de 3 caracteres, ex: 3 -> 003
const setCorretID = (num) =>("0".repeat(parseInt(3-(`${num}`).length)))+ `${num}`;


//irá configurar os tipos para ficar visualmente mais adequado
function setCorretType(types){
    let typeHTML = `something wrong`;
    if(types.length==2){
        typeHTML = `<li class="${types[0].type.name} type">${types[0].type.name}</li>
    <li class="${types[1].type.name} type">${types[1].type.name}</li>`
    }else{
        typeHTML = `<li class="${types[0].type.name} type">${types[0].type.name}</li>`
    };
    return typeHTML;
}


function setShinyPokemon(a){
    const classes = a.target.classList;
    if( "shiny" == classes[4]){
        const top = document.querySelector(`.${classes[2]}img`)
        top.style="background-color:rgba(230, 230, 45, 0.645);";
        top.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/${classes[3]}.gif`
        classes.remove("shiny");
        classes.add("non-shiny");
        return;
    }else if("non-shiny" == classes[4]){
        const top = document.querySelector(`.${classes[2]}img`)
        top.style="background-color:rgba(200, 200, 200, 0.645);";
        top.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${classes[3]}.gif`
        classes.remove("non-shiny");
        classes.add("shiny");
        return
    }else{

    }
}