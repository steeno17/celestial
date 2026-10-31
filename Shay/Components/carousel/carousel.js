import { PLANETS } from '../planets/planets.js';;

const data = PLANETS[document.body.dataset.planet];
console.log('planet key:', document.body.dataset.planet);
console.log('media:', data.media);
console.log('items:', data.items);
const mediaEl = document.getElementById('media');



const tile = (item) => `
  <article class="tile">
    <img src="${item.imagesrc}" alt="${item.title || 'Planet Image'}" />

  </article>`;


if (!data.items) {
  mediaEl.remove();

} else if (data.media === 'carousel') {

  const total = Math.max(10, data.items.length);
  const set = Array.from({ length: total }, (_, i) => data.items[i % data.items.length])
    .map(tile).join('');

  mediaEl.innerHTML = `
    <h2>Gallery</h2>
    <div class="carousel-container">
      <div class="carousel-track">${set}${set}</div>
    </div>`;

} else {
  mediaEl.innerHTML = `
    <h2>Overview</h2>
    <div class="cards">${data.items.map(tile).join('')}</div>`;
}