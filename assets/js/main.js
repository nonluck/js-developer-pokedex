const pokemon_limit=649;
var pagina =1;
const content = document.querySelector(".pokemons");
const number_page = document.querySelector(".number_page");


number_page.innerHTML=pagina;


changePage(0);


function changePage(){
    setPokemons(32*pagina-32,32*pagina);
}


function changeNumberPage(num){
    if(pagina+num>=1 && pagina+num<=21){
        pagina+=num;
        number_page.innerHTML=pagina;
    }
   
}

function randomPokemon(){
    var randonsNum = [];
    for(let j = 1; j < 33;j++){
        randonsNum[j] = Math.floor(Math.random() * (pokemon_limit - 1) ) + 1;
        getDataContentRandom(j, randonsNum[j]);
    }
    console.log(randonsNum);
}




async function setPokemons(beginning_number, end_number){
    for(let i=beginning_number+1; i<=end_number;i++){
        await getDataContent(i);
        
    }
}


document.querySelector(".content").addEventListener("click",setShinyPokemon,false);

