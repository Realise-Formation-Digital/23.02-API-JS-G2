import { API_BASE_URL } from "../constants/constants.js";
import { beersListener } from "./beer.js";

/**
 * Get beers (12 beers per page)
 *
 * @returns {Promise<void>}
 */
async function getBeers() {
    try {
        const response = await axios.get(API_BASE_URL + 'beers?per_page=12');
        const beerList = response.data

        for (let beer of beerList) {

            //create delete button
            const buttonDelete = document.createElement("button");
            buttonDelete.classList.add("btn");
            buttonDelete.classList.add("btn-danger");
            buttonDelete.classList.add("float-end");
            buttonDelete.classList.add("delete-button");
            buttonDelete.disabled = true;
            buttonDelete.innerText = "Supprimer";

            //create detail button
            const buttonDetail = document.createElement("button");
            buttonDetail.classList.add("btn");
            buttonDetail.classList.add("btn-primary");
            buttonDetail.classList.add("float-start");
            buttonDetail.classList.add("detail-button");
            buttonDetail.innerText = "Détail";

            //create card-footer
            const cardFooter = document.createElement("div");
            cardFooter.classList.add("card-footer");
            cardFooter.appendChild(buttonDetail);
            cardFooter.appendChild(buttonDelete);

            // create brewers-tips
            const brewersTips = document.createElement("li");
            brewersTips.classList.add("list-group-item");
            brewersTips.innerText = beer.brewers_tips;

            // create description
            const description = document.createElement("li");
            description.classList.add("list-group-item");
            description.innerText = beer.description;

            // create tagline
            const tagline = document.createElement("li");
            tagline.classList.add("list-group-item");
            tagline.classList.add("fw-bold");
            tagline.innerText = beer.tagline;

            //create ul
            const ul = document.createElement("ul");
            ul.classList.add("list-group");
            ul.classList.add("list-group-flush")
            ul.appendChild(tagline);
            ul.appendChild(brewersTips);
            ul.appendChild(description);

            // create title
            const title = document.createElement("h5");
            title.classList.add("card-title");
            title.innerText = beer.name;

            //create image
            const image = document.createElement("img");
            image.src = beer.image_url;
            image.classList.add("mx-auto");
            image.classList.add("mt-3");

            //create card-body
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            cardBody.appendChild(title);
            cardBody.appendChild(ul);

            //create card
            const card = document.createElement("div");
            card.classList.add("card")
            card.classList.add("h-100");
            card.appendChild(image);
            card.appendChild(cardBody);
            card.appendChild(cardFooter);

            //create element
            const element = document.createElement("div");
            element.classList.add("col");
            element.classList.add("mb-3");
            element.id = beer.id;
            element.appendChild(card);

            document.getElementById("beerList").appendChild(element);
        }

        beersListener();
        
    } catch (e) {
        throw e;
    }
}

await getBeers();