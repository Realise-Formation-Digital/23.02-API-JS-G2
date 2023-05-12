import {API_BASE_URL} from "../constants/constants.js";

$("#firstBrewed").datepicker( {
    format: "mm/yyyy",
    viewMode: "months",
    minViewMode: "months"
});

async function sendBeer() {
    try {
        let nameEl = document.getElementById("name");
        let name = nameEl.value;

        let taglineEl = document.getElementById("tagline");
        let tagline = taglineEl.value;

        let firstBrewedEl = document.getElementById("firstBrewed");
        let firstBrewed = firstBrewedEl.value;

        let descriptionEl = document.getElementById("description");
        let description = descriptionEl.value;

        let imageUrlEl = document.getElementById("imageUrl");
        let imageUrl = imageUrlEl.value;

        let brewerTipsEl = document.getElementById("brewersTips");
        let brewersTips = brewerTipsEl.value;

        let contributedByEl = document.getElementById("contributedBy");
        let contributedBy = contributedByEl.value;

        let foodPairing1El = document.getElementById("foodPairing1");
        let foodPairing1 = foodPairing1El.value;

        let foodPairing2El = document.getElementById("foodPairing2");
        let foodPairing2 = foodPairing2El.value;

        let foodPairing3El = document.getElementById("foodPairing3");
        let foodPairing3 = foodPairing3El.value;

        return await axios.request({
            url: API_BASE_URL + "beers",
            method: 'POST',
            data: JSON.stringify({
                "name": name,
                "tagline": tagline,
                "first_brewed": firstBrewed,
                "description": description,
                "image_url": imageUrl,
                "food_pairing":[
                    foodPairing1,
                    foodPairing2,
                    foodPairing3
                ],
                "brewers_tips": brewersTips,
                "contributed_by": contributedBy
            })
        })
    } catch (e) {
        console.error(e);
        throw e;
    }
}

document.getElementById("submitBeer").addEventListener("click", () => {
    sendBeer().then(beer => {
            console.log(beer);
            const errorElement = document.getElementById("errorMessage");
            errorElement.innerHTML = '';
            const successMessageEl = document.createElement("div");
            successMessageEl.innerHTML = "La bière a bien été ajoutée.";
            successMessageEl.classList.add("alert");
            successMessageEl.classList.add("alert-success");
            successMessageEl.innerText = `La bière ${beer.data.name} a bien été ajoutée.`;
            const successElement = document.getElementById("successMessage");
            successElement.innerHTML = '';
            successElement.appendChild(successMessageEl);
        }
    ).catch(e => {
            const successElement = document.getElementById("successMessage");
            successElement.innerHTML = "";
            const error = document.createElement("div");
            error.classList.add("alert");
            error.classList.add("alert-danger");
            error.innerText = e.response.data.message;
            const errorElement = document.getElementById("errorMessage");
            errorElement.innerHTML = '';
            errorElement.appendChild(error);
        }
    );
});
