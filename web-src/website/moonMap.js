// i elide this for now because I'm not loading geojson data for any points on the moon so i don't need a status change message
// const status = document.querySelector("#moon-status");

// selects the moon-map container
const container = document.querySelector("#moon-map");

// initialise the globe instance
// pass nightsky background (same from the earth map), and a moon texture from threejs https://threejs.org/examples/textures/planets/moon_1024.jpg
const globe = Globe()(container)
  .globeImageUrl("../assets/moonTextureImage.jpg")
  .backgroundImageUrl("../assets/nightSkyImage.png")
  .showAtmosphere(false);

globe.controls().enableDamping = true;
globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.35;
// starting position of the globe
globe.pointOfView({ lat: 10, lng: 0, altitude: 1.8 });

// this fetches moon features and specific craters, etc from a geojson file, and COULD be rendered as certain shapes but I'd rather
// just have a plain globe for now

// try {
//   const response = await fetch("../../data/moon-features.json");

//   if (!response.ok) {
//     throw new Error(`Could not load lunar features: ${response.status}`);
//   }

//   const lunarFeatures = await response.json();

//   if (
//     lunarFeatures.type !== "FeatureCollection" ||
//     !Array.isArray(lunarFeatures.features)
//   ) {
//     throw new Error("Lunar data must be a GeoJSON FeatureCollection.");
//   }

//   globe.pointsData(lunarFeatures.features);
//   status.textContent = `Loaded ${lunarFeatures.features.length} lunar features.`;
// } catch (error) {
//   console.error(error);
//   status.textContent = `Error rendering the Moon: ${error.message}`;
// }
