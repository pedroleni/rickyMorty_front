const requestTarget = document.querySelector('#request-target');
const itemContainer = document.querySelector('#characters');
const buscador = document.querySelector(".barraBuscadora");
const boton = document.querySelector(".boton");
boton.style.display ="none";
buscador.style.display ="none";

const intersectionOptions = {
    threshold: 1
}

const myInput = document.querySelector("#searchbar");



let apiUrl = 'https://rickandmortyapi.com/api/character';
let loading = false;

const onIntersect = ([entry]) => {
    if(apiUrl && !loading && entry.isIntersecting)
        makeRequest();
}

const makeRequest = () => {
    loading = true;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cleanUp(data.info.next);
            renderItems(data.results);
        });
}

const cleanUp = nextPage => {
    apiUrl = nextPage;
    loading = false;
}

const renderItems = results => {
    results.forEach(item => {
        itemContainer.appendChild(createItem(item));
    });
}

const createItem = item => {
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = (
        `
        <div class="individual">
        <img src="${item.image}" alt="${item.name}">
        <h2 class="busca">${item.name}</h2>
        <p>${item.species}</p>
        <p>${item.gender}</p>
  
        </div>
        `
    );
    return newItem;
}

let observer = new IntersectionObserver(onIntersect, intersectionOptions);

observer.observe(requestTarget);


