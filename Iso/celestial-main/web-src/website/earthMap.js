// const status = document.querySelector("#earth-status");
const container = document.querySelector("#earth-map");

const globe = Globe()(container)
  // LOAD TEXTURE IMAGES FOR THE GLOBE : the actual globe itself, the polygons(which represent countries),
  // and the background of some arbitrary night sky I took from jsdelivr

  .globeImageUrl("../assets/earthNightImage.jpg")
  // this creates an illusion of depth in the earth obj
  // or a "bump map" which is an additional texture that simulates bumps and wrinkes and such on the surface
  .bumpImageUrl("../assets/earthTopologyImage.png")
  .backgroundImageUrl("../assets/nightSkyImage.png")

  // configuring the globe object as per the globe.gl doc
  .showAtmosphere(true)
  .atmosphereColor("#7dd3fc")
  .atmosphereAltitude(0.2);

// i believe this makes user roration smoother ?
globe.controls().enableDamping = true;
globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.25;

// this controls where the globe begins and how zoomed in to be (altitude)
// this changes which position the globe begins with ( trial and errored until I got to UK)
globe.pointOfView({ lat: 50, lng: 0, altitude: 0.8 });

// STILL NEEDS FIXING

// fetch countries data
// try {
//   const response = await fetch("../../data/countries-110m.json");

//   if (!response.ok) {
//     throw new Error(
//       `Could not load the data for countries, error in earthMap.js line 47: ${response.status}`,
//     );
//   }

//   const world = await response.json();
//   const countries = topojson.feature(world, world.objects.countries);

//   globe.polygonsData(countries.features);
//   status.textContent = `Countries loaded : ${countries.features.length}`;
// } catch (error) {
//   console.error(error);
//   status.textContent = `Error rendering the globe : ${error.message}`;
// }
