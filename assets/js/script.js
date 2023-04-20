
// ---------------------------------------------------------
const table = document.getElementById('tbody');

let h = 0;
// <!-- Boucle pour générer 5 lignes -->
for (let i = 1; i < 6; i++) {
    let row = table.insertRow();
    // Boucle pour générer 12 colonnes
    for (let j = 1; j < 13; j++) {
        let cell = row.insertCell();
        cell.setAttribute('id', (h += 1));
        cell.setAttribute('class', 'one');
    }
}
// ----------------------------------------------------------


const score = document.getElementById('score');
// ADD BUTTON 
let isStarted = false;    

// ADD AUDIO 
const audio = new Audio('./assets/song/bell_service.mp3');
const music = document.getElementById('music')

// Récupérer tous les éléments avec la classe 'one'
const oneCubes = document.querySelectorAll('.one');
// récupérer dans un tableau tout les cubes id
const oneIds = Array.from(oneCubes).map(cube => cube.id);
console.log(oneIds)

const back = document.querySelector('.container')

function blackOut(){
    document.querySelector('body').style.color = '#ffffff';
    back.style.backgroundColor = '#101010'
    back.style.opacity = '0.9';
    back.style.backgroundImage = 'repeating-radial-gradient( circle at 0 0, transparent 0, #101010 10px ), repeating-linear-gradient( #24242455, #242424 )'
    document.querySelector('tbody').style.background = '#1e1e1e'
}
function LightOn(){
    setTimeout(() => {
    document.querySelector('body').removeAttribute('style');
    back.removeAttribute('style');
    document.querySelector('tbody').removeAttribute('style');
    }, 2000)
}

// background-color: #101010;
// opacity: 0.9;
// background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #101010 10px ), repeating-linear-gradient( #24242455, #242424 );

// Fonction pour éclairer un cube
function lightCube(id) {
    const cube = document.getElementById(id);
    cube.style.background = "#38ff3e";
    audio.play();
    setTimeout(() => {
    cube.removeAttribute('style');
    }, 1500)}

let randomIds = [];

// DECLARATION DES LEVELS : --------------------------------------
// let levels = 3;
let CubesToLight = 3;
// ---------------------------------------------------------------

async function getRandomIds(oneIds, CubesToLight) {
        blackOut();
        let counter = 0;
        for (let i = 0; i < CubesToLight; i++) {
            const randomIndex = Math.floor(Math.random() * oneIds.length);
            const randomId = oneIds.splice(randomIndex, 1)[0];
            randomIds.push(randomId);

            console.log('Random ID : '+randomId)

            setTimeout(() => {
            lightCube(randomId);
            counter++;
            if (counter === CubesToLight) {
                // resolve();
                user_choice();
                }
        }, i * 2500)}
    };

// création d'un tableau pour récupérer les id cliqué
let clickedIds = [];
let countIdUser = 0;
let isUserChoosing = false;


    // Ajouter un écouteur d'événements à chaque élément de la liste
        oneCubes.forEach(oneCube => {
            oneCube.addEventListener('click', event => {
                if (isUserChoosing) {
                    countIdUser += 1;
                    const id_click = event.target.id;
                    console.log(id_click);
                    // -------------------------
                    // PLAY WITH ID :
                    // -------------------------
                    const element = document.getElementById(id_click);
                    element.style.background = "#38ff3e";
    
                    // Enlève le style 200ms après le click
                    setTimeout(() => {
                        element.removeAttribute('style')
                    }, 700)
                    // ajoute l'id dans un nouveau tableau
                    clickedIds.push(id_click);
                }
        });
    });




function user_choice(){
    isUserChoosing = true;
    LightOn();
        const intervalId = setInterval(() => {
            // console.log('Clique' + countIdUser + 'CubesToLight' + CubesToLight)
                if (countIdUser === CubesToLight) {
                    clearInterval(intervalId);
                    isUserChoosing = false;
                    verification();
                    return;
                } else if (countIdUser > CubesToLight) {
                    alert('Vous avez cliqué trop de fois non ?');
                    isUserChoosing = false;
                    return;
                }
        }, 800);
            
};


function verification(){
        if (clickedIds.length === randomIds.length) {
            let isCorrectOrder = false;
            for (let i = 0; i < randomIds.length; i++) {
            if (clickedIds[i] === randomIds[i]) {
                isCorrectOrder = true;
            }
            else if (clickedIds[i] !== randomIds[i]) {
                isCorrectOrder = false;
                break;
            }}
                if (isCorrectOrder) {
                    // Gestion des niveaux :
                    CubesToLight+=1;
                    // les ID sont dans le bon ordre, éteindre tous les cubes
                    alert('Gagné ! Vous passez levels : ' + CubesToLight);
                    countIdUser=0;
                    clickedIds = []; 
                    randomIds = [];
                    score.textContent = CubesToLight;
                    return;
                    // --------------------------------------------------------------------------------------------------
                } else {
                    // Gestion des niveaux :
                    CubesToLight-=1;
                    // les ID ne sont pas dans le bon ordre, afficher un message d'erreur
                    alert('Perdu ! Vous redescendez levels : ' + CubesToLight);
                    countIdUser=0;
                    clickedIds = []; 
                    randomIds = [];
                    score.textContent = CubesToLight;
                    return;
                    // --------------------------------------------------------------------------------------------------
                }
        }}

// varibale pour le lancement de l'audio
let firstTimeClick = false;

// LANCEMENT DU JEU PAR LE BUTTON PLAY
document.getElementById('start').addEventListener('click', event => {
    if (!firstTimeClick){
        music.currentTime = 1.6;
    }
    music.play();
    if (CubesToLight <= 0){
        alert('Voyons ? Tu n\'a pas réussi ? Alors test ça !');
        CubesToLight = 1;
    }
    firstTimeClick = true;

    isStarted = true;
    document.getElementById('start').disabled = true;
    getRandomIds(oneIds, CubesToLight);
});
