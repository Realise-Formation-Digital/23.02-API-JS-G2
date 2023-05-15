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

            // let beerIngredientsEl = document.getElementById("beerIngredients");
            // beerIngredientsEl.innerHTML = beer.ingredients;
            // let beerIngredients= document.getElementById("beerIngredients");
            // beerIngredientsEl.innerHTML = beer.ingredients;

            const beerModal = new bootstrap.Modal('#beerModal')
            beerModal.show();
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
console.log("dere");
  divEl.innerHTML = `
      <div class="card" style="width:100%;">
        <div class="card-body">
        <p class="card-text text-center">${beer.tagline}</p>
          <div class="row">
            <div class="col text-center">
            <img src=${beer.image_url} alt="Beer Picture" style="width:80px;height:auto;" class="center">
          </div>
          <div class="col">
          <h5 class="card-title">${beer.description}</h5>
        </div>
        <p class="card-text">${beer.brewers_tips}</p>
        <p class="card-text"><i>Contributed by :  + ${beer.contributed_by}</i></p>
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
  divEl.innerHTML = `
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
                `<li>${malt.name}: ${malt.amount.value} ${malt.amount.unit}</li>`
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
                `<li>${hop.name}: ${hop.amount.value} ${hop.amount.unit}</li>`
            )
            .join("")}
        </ul>
      </div>
    </div>
  </div>
</div>
    `;
  return divEl;
}

export { beersListener }