const URL = "https://rickandmortyapi.com/api/character/";

const container = document.querySelector("#characters");
const myInput = document.querySelector("#searchbar");
const boton = document.querySelector(".boton");
boton.style.display ="none";
//De manera global tengo una lista donde almacenar las peliculas fuera de cualquier función
let characterList;


 //-------------------------------------------------------------------
const getCharacter = async () => {
  const rawCharacter = await fetch(URL);
  const jsonCharacter = await rawCharacter.json();
  const character = jsonCharacter.results;
  mapCharacter(character);
};

const mapCharacter = (character) => {
    const mappedCharacter = character.map((chara) => ({
      name: chara.name,
      image: chara.image,
      origin: chara.origin.name,
      species: chara.species,
      gender:chara.gender
  }));
  //Almaceno la info mapeada en mi array local de arriba
  characterList = mappedCharacter;
 
  generateHTML(characterList);
};

const generateHTML = (mappedList) => {
//Cada vez que lo genero limpio el contenedor
    container.innerHTML = "";
    
  for (const chara of mappedList) {
    const figure = `
    <div class="individual">
      <img src="${chara.image}" alt="${chara.name}">
      <h2>${chara.name}</h2>
      <p>${chara.origin}</p>
      <p>${chara.species}</p>
      <p>${chara.gender}</p>

    </div>
    `;
    paint(figure);
  }
};

const paint = (figure) => {
  container.innerHTML += figure;
};

getCharacter();

const search = () => {
  const filteredCharacter = characterList.filter((character) =>
  //Esta es la condicion que filtra
  character.name.toLowerCase().includes(myInput.value.toLowerCase())
  );
  console.log("filtered:", filteredCharacter)
  generateHTML(filteredCharacter)
};
