// // CONSTRUCTION DU TABLEAU ------------------------------------------
// const table = document.getElementById('tbody')
// // h = ID cube
// h=0
// for (let i = 1; i < 6; i++) {
//     // document.write("<tr>");
//     table.innerHTML = "<tr>";
//     // Boucle pour générer 12 colonnes
//     for (let j = 1; j < 13; j++) {
//         // ID UNIQUE ADD
//         // document.write("<td id='" + (h+=1) + "' class='one'></td>")
//         table.innerHTML = "<td id='" + (h+=1) + "' class='one'></td>";
//     }
//     // document.write("</tr>");
//     table.innerHTML = "</tr>";
// }

// ------------------------------------------------------------------

// const container = document.getElementById('container')
// container.innerHTML = "test"


const table = document.getElementById('tbody');

let h = 0;
for (let i = 1; i < 6; i++) {
    let row = table.insertRow();
    for (let j = 1; j < 13; j++) {
        let cell = row.insertCell();
        cell.setAttribute('id', 'cube' + (h += 1));
        cell.setAttribute('class', 'one');
    }
}
