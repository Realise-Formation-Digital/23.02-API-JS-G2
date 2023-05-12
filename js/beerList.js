import { API_BASE_URL } from "../constants/constants.js";
/**
 * @async
 *
 * Get all holidays
 *
 * @returns {Promise<void>}
 */

async function getBeers() {
    try {
        const response = await axios.get(API_BASE_URL + 'beers');
        console.log(response.data);
        const beerList = response.data

        const colElement = document.getElementById("beerList")
        for (let beer of beerList) {


            const node = document.createElement('div');

            const textNode = document.createTextNode(beer.date);

            // pour commentaire 1-) trouvé une solution pour "show" le première bière parce qu'il a bloquer!!(x) resolu
            //je besoin de trouve une methode boucle pour chaque element de code pour n'utilise plus l'innerHTML
            //chercher sur l'internet ces listes de codes = "document.createElement()[done!],document.createTextNode()[done!],element.appendChild()[done!]"

            //note TR-FR = document.createElement(): HTML nesnesi oluşturmak için kullanılır. Bellek üzerinde dinamik olarak HTML nesnesi oluşturmak için kullanılır, Il est utilisé pour créer un objet HTML. Il est utilisé pour créer dynamiquement un objet HTML en mémoire.

            //note TR-FR = element(node).appendChild(): node düğümüne parametre olarak gönderilen nesneyi ekler. HTML nesnelerinin içine başka nesneleri eklemek için kullanılır, Ajoute l'objet envoyé en tant que paramètre au nœud node. Il est utilisé pour insérer d'autres objets dans des objets HTML.

            //note TR-FR = document.createTextNode(): createTextNode metodu ile istediğimiz metinleri oluşturabiliriz. Yapmamız gereken tek şey bu metodun içerisine istediğimiz metni yazmak, Avec la méthode createTextNode, nous pouvons créer les textes que nous voulons. Tout ce que nous avons à faire est d'écrire le texte que nous voulons dans cette méthode.

            node.innerHTML =
            `<div class="card d-line">
                <img src="${beer.image_url}" class="card-img-top w-25" alt="${beer.name}">
            <div class="card-body">
                <h5 class="card-title">${beer.tagline}</h5>
                <p class="card-text">${beer.first_brewed}</p>
                <p class="card-text">${beer.description}</p>
                <button type="button" class="btn btn-primary" id="${beer.id}">Détail</button>
            </div>
            </div>`

            node.classList.add('col')

            colElement.appendChild(node);
            node.appendChild(textNode);


            document.getElementById("beerList").appendChild(node);
        }

    } catch (e) {

    }
}
getBeers();