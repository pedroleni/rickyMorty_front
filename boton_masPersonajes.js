
const URL = "https://rickandmortyapi.com/api/character/";
let loading = false;
let previousCharacters = ""

const buscador = document.querySelector(".barraBuscadora");
buscador.style.display ="none";





window.onload = () => {
  // Función disparadora
  init();
}

const init = async () => {
  // Lanzar la función que obtiene los datos de la API
  const characters = await getCharacters();
  // Lanzar la función que formatea los datos de la API
  mappedCharacters(characters);
}


const getCharacters = async () => {
    const result = await fetch(URL);
    const resultToJson = await result.json();
    return resultToJson;

}


const mappedCharacters = async (characters) => {
  // Asignar - la siguiente peticion
  previousCharacters = characters.info.next;
  // Mappear los datos de la API
  characters.results.map((character) => {
    // Función de pintado
    return printCharacter({
      name: character.name,
      image: character.image,
      origin: character.origin.name,
      species: character.species,
      gender:character.gender
    });
  })
}


const printCharacter = async (character) => {
  // Selector query - id
  const container = document.querySelector("#characters");
  // Crear un elemento HTML e insertarlo
  container.innerHTML += `
    <div class="individual">
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      <p>${character.origin}</p>
      <p>${character.species}</p>
      <p>${character.gender}</p>

    </div>
  `
}

const nextCharacters = async () => {
  if (previousCharacters) {
    const result = await fetch(previousCharacters);
    const resultToJson = await result.json();
    mappedCharacters(resultToJson);
  }
}




 