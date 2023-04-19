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
function LightOn(){
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    back.style.background = '';
    document.querySelector('tbody').removeAttribute('style');
    }, i * 500)
    resolve();
})
}


// Fonction pour éclairer un cube
function lightCube(id) {
    const cube = document.getElementById(id);
    cube.style.background = "#38ff3e";
    audio.play();
    setTimeout(() => {
    cube.removeAttribute('style');
    }, i * 500)}

const randomIds = [];

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

            console.log(i)
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
                    }, i * 200)
                    // ajoute l'id dans un nouveau tableau
                    clickedIds.push(id_click);
                }
        });
    });




function user_choice(){
    isUserChoosing = true;
    LightOn();
        const intervalId = setInterval(() => {
            console.log('Clique' + countIdUser + 'CubesToLight' + CubesToLight)
                if (countIdUser === CubesToLight) {
                    clearInterval(intervalId);
                    // resolve();
                    isUserChoosing = false;
                    verification();
                    return;
                } else if (countIdUser > CubesToLight) {
                    alert('Vous avez cliqué trop de fois non ?');
                    resolve();
                    isUserChoosing = false;
                    return;
                }
        }, 800);
            
};


function verification(){
        if (clickedIds.length === randomIds.length) {
            let isCorrectOrder = true;
            for (let i = 0; i < randomIds.length; i++) {
            if (clickedIds[i] !== randomIds[i]) {
                isCorrectOrder = false;
                break;
            }
            }
                if (isCorrectOrder) {
                    // Gestion des niveaux :
                    CubesToLight+=1;
                    // les ID sont dans le bon ordre, éteindre tous les cubes
                    alert('Gagné ! Vous passez levels : ' + CubesToLight);
                    countIdUser=0;
                    // resolve();
                    return;
                    // --------------------------------------------------------------------------------------------------
                } else {
                    // Gestion des niveaux :
                    CubesToLight-=1;
                    // les ID ne sont pas dans le bon ordre, afficher un message d'erreur
                    alert('Perdu ! Vous redescendez levels : ' + CubesToLight);
                    countIdUser=0;
                    // resolve();
                    return;
                    // --------------------------------------------------------------------------------------------------
                }
        }}
    // function play_game(){
    //     // reset ----------------
    //     // réinitialiser le tableau des ID cliqués
    //     clickedIds = []; 
    //     // ----------------------
    //     blackOut()
    //     getRandomIds(oneIds, CubesToLight)
    //         .then(() => LightOn())
    //         .then(() => user_choice())
    //         .then(() => verification());
    // return;
    // }
    
// document.getElementById('verif').addEventListener('click', event => {
//     isStarted = true;
//     document.getElementById('verif').disabled = true;
//     verification();
// })



// LANCEMENT DU JEU PAR LE BUTTON PLAY
document.getElementById('start').addEventListener('click', event => {
    isStarted = true;
    document.getElementById('start').disabled = true;
    // play_game();
    getRandomIds(oneIds, CubesToLight);

});
