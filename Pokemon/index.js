const selectElement = document.getElementById("select-type");
const listSection = document.getElementById("list-wrapper");
const loadMoreButton = document.querySelector("button");
const inputElement = document.querySelector("input");


let pokemonTypeList = [];
let mainPokemonList = [];
let filteredPoikemonList = [];
let selectedList = mainPokemonList;
let offset = 0;
let filterSelectd = false;


loadMoreButton.addEventListener("click", () => {
    if (filterSelectd) {
        alert("Select All for loading more");
        return;
    }
    offset += 20;
    fetchPokemonList(offset);

})

selectElement.addEventListener("click", (e) => {
    const selectedOption = e.target.innerText;

    if (selectedOption === "All") {
        filterSelectd = false;
        filteredPoikemonList = mainPokemonList;
        generateListItems();
    }
    else if (selectedOption) {

        filterSelectd = true;
        selectedList = filterListBytype(selectedOption);
        filteredPoikemonList = selectedList;
        generateListItems();

    }


})

inputElement.addEventListener("input", (e) => {

    const searchText = e.target.value;
    filteredPoikemonList = filterListByName(searchText);
    generateListItems();
})

window.addEventListener("load",()=>{
    selectElement.value="All";
});
window.addEventListener("load", () => { fetchPokemonList(offset) });

function filterListBytype(searchText) {

    return mainPokemonList.filter(({ types }) => {

        return types[0].type.name.toLowerCase().includes(searchText.toLowerCase())
    })

}
function filterListByName(searchText) {
    if (filterSelectd) return selectedList.filter(({name})=> name.toLowerCase().includes(searchText.toLowerCase()))   
    return mainPokemonList.filter(({ name }) => name.toLowerCase().includes(searchText.toLowerCase()))

}


async function fetchPokemonList(offset) {
    const pokemonData = await fetchData(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);

    const promiseArray = pokemonData.results.map(async ({ name, url }) => {
        const data = await fetchData(url);
        return data;
    })

    list = await Promise.all(promiseArray);
    mainPokemonList = [...mainPokemonList, ...list];
    filteredPoikemonList = mainPokemonList;
    generateListItems();

}

async function fetchData(endPoint) {
    try {
        const response = await fetch(endPoint);
        const data = await response.json();

        console.log("type of ",typeof data);
        return data;
    } catch (error) {
        alert(error);
    }

}

function generateListItems() {

    listSection.innerHTML = "";

    filteredPoikemonList.forEach(({ name, sprites, types, height,weight }) => {
        const { other } = sprites;

        const cardElement = document.createElement("div");
        const innerCardElement = document.createElement("div");
        const frontCardElement = document.createElement("div");
        const backCardElement = document.createElement("div");
        const pokemonImage = document.createElement("img");
        const pokemonName = document.createElement("p");
        const pokemonType = document.createElement("p");
        const pokemonHeight = document.createElement("p");
        const pokemonWeight = document.createElement("p");

        pokemonImage.src = other.dream_world.front_default;
        pokemonImage.alt = name;
        pokemonName.innerText = name;
        pokemonType.innerText = `Type: ${types[0].type.name}`;
        pokemonHeight.innerText = `Height: ${height} cm`;
        pokemonWeight.innerText=`Weight: ${weight}`;

        cardElement.classList.add("flip-card");
        innerCardElement.classList.add("flip-card-inner");
        frontCardElement.classList.add("flip-card-front");
        backCardElement.classList.add("flip-card-back");
        pokemonHeight.classList.add("check");

        frontCardElement.append(pokemonImage, pokemonName, pokemonType);
        backCardElement.append(pokemonHeight,pokemonWeight);
        innerCardElement.append(frontCardElement, backCardElement);
        cardElement.append(innerCardElement);
        listSection.append(cardElement);


    })
}