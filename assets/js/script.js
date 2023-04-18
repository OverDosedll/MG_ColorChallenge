// Récupérer tous les éléments avec la classe 'one'
const oneCubes = document.querySelectorAll('.one');

// Ajouter un écouteur d'événements à chaque élément de la liste
oneCubes.forEach(oneCube => {
    oneCube.addEventListener('click', event => {
        const id = event.target.id;
        const element = document.getElementById(id);
        console.log(id);
        // -------------------------
        // PLAY WITH ID :
        // -------------------------
            element.style.background = "#38ff3e";
        // -------------------------
    });
});
