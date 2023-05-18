const pokemon_limit=649;
var pagina =1;
const content = document.querySelector(".pokemons");
const number_page = document.querySelector(".number_page");



//gatilho para mudar o conteudo da página
function changePage(){
    setPokemons(32*pagina-32,32*pagina);
}

//muda o valor da página
function changeNumberPage(num){
    if(pagina+num>=1 && pagina+num<=21){
        pagina+=num;
        number_page.innerHTML=pagina;
    }
   
}
//faz a requisição aleatória
const numberGeration = () => {
    return randonsNum[j] = Math.floor(Math.random() * (pokemon_limit - 1) ) + 1;
}

function randomPokemon(){
    const lista = [];
    let count = 0;
    while(lista.length!=32){
        const num  = Math.floor(Math.random() * (pokemon_limit - 1) ) + 1;
        if(!lista.includes(num)){
            count +=1;
            getDataContentRandom(count, num);
            lista.push(num)
        }
    }
    /*

    var randonsNum = [];
    for(let j = 1; j < 33;j++){
        let flag=true;
        while(flag){
             const testNum = Math.floor(Math.random() * (pokemon_limit - 1) ) + 1;
             console.log(testNum)
             if(randonsNum.find(testNum)){
                randonsNum[j-1]=(testNum);
                console.log(testNum)
                
                flag=false;
             }

        }
    }*/
}

//faz a requisição linear
function setPokemons(beginning_number, end_number){
    for(let i=beginning_number+1; i<=end_number;i++){
        getDataContent(i);
        
    }
}

changePage(0);
//listener para mudar a imagem de normal para shiny e vice-versa
document.querySelector(".content").addEventListener("click",setShinyPokemon,false);

