import { API_BASE_URL } from "../constants/constants.js";


const beersListener = async function() {
  document.querySelectorAll('button.detail-button').forEach(detailButton => {
    detailButton.addEventListener('click', async (e) => {
      try {
            
            let beerId = e.target.parentNode.parentNode.parentNode.id;
            let response = await axios.get(API_BASE_URL + "beers/" + beerId);
            let beer = response.data;
            console.log(beer);
            
            createBeerElement(beer);

            const beerModal = new bootstrap.Modal('#beerModal')
            beerModal.show();

            const test = document.getElementsByClassName('deleteIngredient')
            console.log(test)

          } catch(e) {
            throw e;
          }
        });
      });
    }


function createBeerElement(beer) {
  console.log(beer)
  const divEl = document.createElement("div");
  const modalTitleEl = document.getElementById("modalLabel");
  modalTitleEl.textContent = beer.name + " (Since : " + beer.first_brewed + ")";

  divEl.innerHTML = `
      <div class="card" style="width:100%;">
        <div class="card-body">
        <h5 class="card-text text-center mb-4">${beer.tagline}</h5>
          <div class="row">
            <div class="col text-center">
            <img src=${beer.image_url} alt="Beer Picture" style="width:100px;height:auto;" class="center mt-2">
          </div>
          <div class="col">
          <h6 class="card-title">${beer.description}</h6>
        </div>
        <p class="card-text mt-3">${beer.brewers_tips}</p>
        <p class="card-text mb-2"><i>Contributed by :   ${beer.contributed_by}</i></p>
      </div>
    
 
    `;
  const ingredientsDiv = createBeerIngredients(beer);
  divEl.appendChild(ingredientsDiv);
  divEl.classList.add("col");
  const beerDetailsEl = document.getElementById("beerDetails");
  beerDetailsEl.innerHTML = "";
  beerDetailsEl.appendChild(divEl);
}

function createBeerIngredients(beer) {
  const divEl = document.createElement("div");
  
 console.log(beer.ingredients.malt)
  divEl.innerHTML = `
  <div class="accordion" id="ingredientsAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header" id="foodPairing">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#foodPairingCollapse" aria-expanded="false" aria-controls="foodPairingCollapse">
        Food Pairing
      </button>
    </h2>
    <div id="foodPairingCollapse" class="accordion-collapse collapse" aria-labelledby="foodPairingHeading" data-bs-parent="#ingredientsAccordion">
      <div class="accordion-body bg-success">
        <ul>
        ${beer.food_pairing
          .map(
            (food_pairing) =>
            `<li>${food_pairing}</li>`
            )
            .join("")}
        </ul>
      </div>
    </div>
  </div>
  <div class="accordion" id="ingredientsAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header" id="maltHeading">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#maltCollapse" aria-expanded="false" aria-controls="maltCollapse">
        Malt
      </button>
    </h2>
    <div id="maltCollapse" class="accordion-collapse collapse" aria-labelledby="maltHeading" data-bs-parent="#ingredientsAccordion">
      <div class="accordion-body bg-success">
        <ul>
          ${beer.ingredients.malt
            .map(
              (malt) =>
                `<li><button class="deleteIngredient btn btn-outline-warning btn-sm" type ="button" malt-id="${malt.id}" id="ingredients.malt">delete</button>${malt.name}: ${malt.amount.value} ${malt.amount.unit}</li>`
            )
            .join("")}
             
        </ul>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="hopsHeading">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#hopsCollapse" aria-expanded="false" aria-controls="hopsCollapse">
        Hops
      </button>
    </h2>
    <div id="hopsCollapse" class="accordion-collapse collapse" aria-labelledby="hopsHeading" data-bs-parent="#ingredientsAccordion">
      <div class="accordion-body bg-success">
        <ul>
          ${beer.ingredients.hops
            .map(
              (hop) =>
                `<li><button class="deleteIngredient btn btn-outline-warning btn-sm" type="button" hops-id="${hop.id}" id=beer_ingredient.ingredient_id>delete</button>${hop.name}: ${hop.amount.value} ${hop.amount.unit} ${hop.id}</li>`
            )
            .join("")}
            
        </ul>
      </div>
    </div>
  </div>
</div>
    `

   
  return divEl;
}





function removeIngredients (){
  for (let ingredients of beer_ingredient) {

    //create delete button
    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("btn");
    buttonDelete.classList.add("btn-danger");
    buttonDelete.classList.add("float-end");
    buttonDelete.classList.add("delete-button");
    buttonDelete.disabled = false;
    buttonDelete.innerText = "Supprimer";

    //create card-body
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.appendChild();
    cardBody.appendChild();
  }
}

export { beersListener }