const TEX = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/';

export const ORDER = ['sun', 'earth', 'moon'];   // the order of the rail

export const PLANETS = {
  sun: {
    name: 'SUN',
    texture: null,            // no free texture, so we use a plain colour for now
    color: 0xff9a1f,
    lit: false,               // a star glows by itself, so no lighting
    tilt: 0,
    blurb: 'The star at the centre of our solar system. Its gravity holds every planet in orbit.',
    facts: [
      ['Diameter', '1.39 million km'],
      ['Surface temperature', 'about 5,500 °C'],
      ['Age', 'about 4.6 billion years'],
      ['Mass', 'about 333,000 Earths'],
    ],
  },

  earth: {
    name: 'EARTH',
    texture: TEX + 'earth_atmos_2048.jpg',
    lit: true,
    tilt: 0.41,
    blurb: 'The third planet from the Sun and the only place we know of that supports life.',
    facts: [
      ['Diameter', '12,742 km'],
      ['Distance from Sun', '149.6 million km'],
      ['Day length', '24 hours'],
      ['Year length', '365.25 days'],
      ['Moons', '1'],
      ['Average temperature', '15 °C'],
    ],
    media: 'carousel', 
    items: [
    { imagesrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRclvM2e88E7jfHwg2TPafWllXy1_pNuK5xSQdwWAkpel1f1zmyq6ziEg4&s=10' },
    { imagesrc: 'https://images.unsplash.com/photo-1765200135391-cc6797cf566e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D'    },
    { imagesrc: 'https://121clicks.com/wp-content/uploads/2025/01/landscape-photography-michael-hindman-04.jpg'    },
    { imagesrc: 'https://img.freepik.com/premium-photo/scenic-green-forest-background-beautiful-nature-scenery-with-trees-trunks-with-musk-woods-explore-adventure-concept-creepy-park-with-dark-shadows-amazing-natural-planet-earth_425263-5944.jpg'    },
    ],


        },

  moon: {
    name: 'MOON',
    texture: TEX + 'moon_1024.jpg',
    lit: true,
    tilt: 0.027,
    blurb: 'Earth\'s only natural satellite. The same side always faces us.',
    facts: [
      ['Diameter', '3,474 km'],
      ['Distance from Earth', '384,400 km'],
      ['Orbital period', '27.3 days'],
      ['Surface gravity', '1.62 m/s²'],
      ['Surface temperature', '-173 °C to 127 °C'],
    ],
  },


};