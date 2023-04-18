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
    setTimeout(() => {
    back.style.background = '';
    document.querySelector('tbody').removeAttribute('style');
    }, i * 1000)
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
const levels = {
    1:3 , 2:3 , 3:4, 4:4 , 5:5 , 6:5
}
const CubesToLight = levels[1];

// ---------------------------------------------------------------

async function getRandomIds(oneIds, CubesToLight) {
    return new Promise((resolve, reject) => {
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
                resolve();
                }
        }, i * 2500)}
    })
}

// création d'un tableau pour récupérer les id cliqué
let clickedIds = [];
let countIdUser = 0;

function user_choice(){
    // Ajouter un écouteur d'événements à chaque élément de la liste
    oneCubes.forEach(oneCube => {
        oneCube.addEventListener('click', event => {
                countIdUser += 1;
                const id_click = event.target.id;
                console.log(id_click);
                // -------------------------
                // PLAY WITH ID :
                // -------------------------
                const element = document.getElementById(id_click);
                element.style.background = "#38ff3e";

                // ajoute l'id dans un nouveau tableau
                clickedIds.push(id_click);

                // si le nombre d'id cliqué est supérieur ou égal par rapport au level actuel alors : 
                if (countIdUser > CubesToLight) {
                    alert('Vous avez cliqué trop de fois non ?');
                    element.removeAttribute('style');
                }
                // -------------------------
        });
    });
}

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
            // les ID sont dans le bon ordre, éteindre tous les cubes
                alert('Gagné !');
                document.getElementById(clickedIds[i++]).removeAttribute('style');
                clickedIds = [];
                // réinitialiser le tableau des ID cliqués
        } else {
            // les ID ne sont pas dans le bon ordre, afficher un message d'erreur
            alert('Perdu !');
            document.getElementById(clickedIds[i++]).removeAttribute('style');
            clickedIds = []; 
            // réinitialiser le tableau des ID cliqués
        }
        }
    }

    function play_game(){
        blackOut()
        getRandomIds(oneIds, CubesToLight)
            .then(() => LightOn(), user_choice());
    }
    
document.getElementById('verif').addEventListener('click', event => {
    isStarted = true;
    document.getElementById('verif').disabled = true;
    verification();
})



// LANCEMENT DU JEU PAR LE BUTTON PLAY
document.getElementById('start').addEventListener('click', event => {
    isStarted = true;
    document.getElementById('start').disabled = true;
    play_game();
});
