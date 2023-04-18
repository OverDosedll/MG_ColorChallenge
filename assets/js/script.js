// ADD BUTTON 
let isStarted = false;    

// ADD AUDIO 
const audio = new Audio('./assets/song/bell_service.mp3');

// Récupérer tous les éléments avec la classe 'one'
const oneCubes = document.querySelectorAll('.one');
// récupérer dans un tableau tout les cubes id
const oneIds = Array.from(oneCubes).map(cube => cube.id);
console.log(oneIds)

const back = document.querySelector('.container')

function blackOut(){
    back.style.background = '#1e1e1e'
    document.querySelector('tbody').style.background = '#1e1e1e'
}

function fetchCube(){
    // Ajouter un écouteur d'événements à chaque élément de la liste
    oneCubes.forEach(oneCube => {
        oneCube.addEventListener('click', event => {
                const id_click = event.target.id;
                console.log(id_click);
                // -------------------------
                // PLAY WITH ID :
                // -------------------------
                // const element = document.getElementById(id_click);
                // element.style.background = "#38ff3e";
                // -------------------------
        });
    });
}

// Fonction pour éclairer un cube
function lightCube(id) {
    const cube = document.getElementById(id);
    cube.style.background = "#38ff3e";
    audio.play();
    setTimeout(() => {
    cube.style.background = "#1e1e1e";
    }, i * 400)}

const randomIds = [];

// DECLARATION DES LEVELS : --------------------------------------
const levels = {
    1:3 , 2:3 , 3:4, 4:4 , 5:5 , 6:5
}
const CubesToLight = levels[1];

// ---------------------------------------------------------------

function getRandomIds(oneIds, CubesToLight) {
        for (let i = 0; i < CubesToLight; i++) {
            const randomIndex = Math.floor(Math.random() * oneIds.length);
            const randomId = oneIds.splice(randomIndex, 1)[0];
            randomIds.push(randomId);
            console.log(i)
            console.log('Random Index : '+randomIndex)
            console.log('Random ID : '+randomId)
            setTimeout(() => {
            lightCube(randomId);
        }, i * 2000)}
        return randomIds;
    }

function play_game(){
    blackOut();
    fetchCube();
    // ordinateur();
    getRandomIds(oneIds, CubesToLight);
    // generateRandomSequence();
}



// LANCEMENT DU JEU PAR LE BUTTON PLAY
document.querySelector('.start').addEventListener('click', event => {
    isStarted = true;
    document.querySelector('.start').disabled = true;
    play_game()
    // désactiver le bouton une fois qu'il a été pressé
});
