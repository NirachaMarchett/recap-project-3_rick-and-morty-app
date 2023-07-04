// We first creating card component with JavaScript
// when look at index.html we can see that class="card" is the li element inside an ul class="container"
// As we need to append the class="card" to class="card-container" we need to query class="card-container" as we havent done so
const cardContainer = document.querySelector('[data-js="card-container"]');

//Now, creating card component with JavaScript
// Step 1: create function with card parameter since each card will have different input
export function createCharacterCard(card) {
  // step 2: create li element because we want a list of cards
  const newCard = document.createElement("li");
  // step 3: add classlist for styling
  newCard.classList.add("card");
  // step 4: add content of the card. Beaware that each card will have different info -> check the API (from object in this case).
  newCard.innerHTML = `
    <div class="card__image-container">
            <img
              class="card__image"
              src=${card.image}
              alt=${card.image}
            />
            <div class="card__image-gradient"></div>
          </div>
          <div class="card__content">
            <h2 class="card__title">${card.name}</h2>
            <dl class="card__info">
              <dt class="card__info-title">Status</dt>
              <dd class="card__info-description">${card.status}</dd>
              <dt class="card__info-title">Type</dt>
              <dd class="card__info-description">${card.type}</dd>
              <dt class="card__info-title">Occurrences</dt>
              <dd class="card__info-description">${card.episode.length}</dd>
            </dl>
          </div>`;

  //step 5: append li to the ul
  cardContainer.append(newCard);
}
