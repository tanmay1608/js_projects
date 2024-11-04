interface PokemonResult {
    name: string;
    url: string;
}

interface PokemonData {
    results: PokemonResult[];
}

interface PokemonDetails {
    id: number;
    name: string;
    sprites: {
        other: {
            dream_world: {
                front_default: string;
            };
        };
    };
    types: {
        type: {
            name: string;
        };
    }[];
    height: number;
    weight: number;
}

const selectElement = document.getElementById("select-type") as HTMLSelectElement;
const listSection = document.getElementById("list-wrapper") as HTMLElement;
const loadMoreButton = document.querySelector("button") as HTMLButtonElement;
const inputElement = document.querySelector("input") as HTMLInputElement;

console.log(selectElement);

let pokemonTypeList: string[] = [];
let mainPokemonList: PokemonDetails[] = [];
let filteredPokemonList: PokemonDetails[] = [];
let selectedList: PokemonDetails[] = mainPokemonList;
let offset: number = 0;
let filterSelected: boolean = false;

loadMoreButton.addEventListener("click", () => {
    if (filterSelected) {
        alert("Select All for loading more");
        return;
    }
    offset += 20;
    fetchPokemonList(offset);
});


selectElement.addEventListener("click", (e) => {
    const target = e.target as HTMLSelectElement;
    const selectedOption = target.value;
    console.log(selectedOption)
    if (selectedOption === "All") {
        filterSelected = false;
        filteredPokemonList = mainPokemonList;
        generateListItems();
    } else if (selectedOption) {
        filterSelected = true;
        console.log("selected option",selectedOption)
        selectedList = filterListByType(selectedOption);
        filteredPokemonList = selectedList;
        generateListItems();
    }
});

inputElement.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const searchText = target.value;
    filteredPokemonList = filterListByName(searchText);
    generateListItems();
});

window.addEventListener("load", () => {
    selectElement.value = "All";
    fetchPokemonList(offset);
});

function filterListByType(type: string): PokemonDetails[] {
    return mainPokemonList.filter(({ types }) => {
        return types[0].type.name.toLowerCase().includes(type.toLowerCase());
    });
}

function filterListByName(searchText: string): PokemonDetails[] {
    if (filterSelected) {
        return selectedList.filter(({ name }) => name.toLowerCase().includes(searchText.toLowerCase()));
    }
    return mainPokemonList.filter(({ name }) => name.toLowerCase().includes(searchText.toLowerCase()));
}

async function fetchPokemonList(offset: number) {
    const pokemonData  = (await fetchData(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)) as PokemonData;
    
    const promiseArray = pokemonData.results.map(async ({ name, url }) => {
        const data = (await fetchData(url)) as PokemonDetails;
        return data;
    });

    const list = await Promise.all(promiseArray);
    mainPokemonList = [...mainPokemonList, ...list];
    filteredPokemonList = mainPokemonList;
    generateListItems();
}

async function fetchData(endPoint: string): Promise<PokemonData | PokemonDetails> {
    try {
        const response = await fetch(endPoint);
        const data: PokemonData | PokemonDetails = await response.json();
        return data;
    } catch (error) {
        alert(error);
    }
}

function generateListItems() {
    listSection.innerHTML = "";

    filteredPokemonList.forEach(({ name, sprites, types, height, weight }) => {
        const { other } = sprites;

        const cardElement = document.createElement("div") as HTMLDivElement;
        const innerCardElement = document.createElement("div") as HTMLDivElement;
        const frontCardElement = document.createElement("div") as HTMLDivElement;
        const backCardElement = document.createElement("div") as HTMLDivElement;
        const pokemonImage = document.createElement("img") as HTMLImageElement;
        const pokemonName = document.createElement("p") as HTMLParagraphElement;
        const pokemonType = document.createElement("p") as HTMLParagraphElement;
        const pokemonHeight = document.createElement("p") as HTMLParagraphElement;
        const pokemonWeight = document.createElement("p") as HTMLParagraphElement;

        pokemonImage.src = other.dream_world.front_default;
        pokemonImage.alt = name;
        pokemonName.innerText = name;
        pokemonType.innerText = `Type: ${types[0].type.name}`;
        pokemonHeight.innerText = `Height: ${height} cm`;
        pokemonWeight.innerText = `Weight: ${weight}`;

        cardElement.classList.add("flip-card");
        innerCardElement.classList.add("flip-card-inner");
        frontCardElement.classList.add("flip-card-front");
        backCardElement.classList.add("flip-card-back");
        pokemonHeight.classList.add("check");

        frontCardElement.append(pokemonImage, pokemonName, pokemonType);
        backCardElement.append(pokemonHeight, pokemonWeight);
        innerCardElement.append(frontCardElement, backCardElement);
        cardElement.append(innerCardElement);
        listSection.append(cardElement);
    });
}
