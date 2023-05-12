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

            //"1-)const textNode = document.createTextNode(beer.date);"

            // pour commentaire 1-) trouvé une solution pour "show" le première bière parce qu'il a bloquer!!(x) resolu
            node.innerHTML = 

            node.classList.add('col')

            colElement.appendChild(node);
            node.appendChild(textNode);


            document.getElementById("beerList").appendChild(node);
        }
        
    } catch (e) {
        
    }
}
getBeers();