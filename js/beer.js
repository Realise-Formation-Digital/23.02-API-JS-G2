import { API_BASE_URL } from "../constants/constants.js";

async function displayData() {
  try {
    const res = await axios.get(API_BASE_URL + "beers/4");
    console.log(res);
    const beerDetails = res.data;
    console.log(beerDetails);

 
      // Si beerDetails est une seule valeur, créer et ajouter l'élément HTML directement
      const colElement = document.getElementById("listeBeerIngredients");
      const divEl = createBeerElement(beerDetails);
      colElement.appendChild(divEl);
    
  } catch (e) {
    console.error(e);
  }
}

function createBeerElement(beer) {
  const divEl = document.createElement("div");
  const modalTitleEl = document.getElementById("modalLabel");
  modalTitleEl.textContent = beer.name + " (Since : " + beer.first_brewed + ")";

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
  return divEl;
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
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hopsCollapse" aria-expanded="false" aria-controls="hopsCollapse">
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

displayData();
