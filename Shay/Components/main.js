import * as THREE from 'three';

import { ORDER, PLANETS } from './planets/planets.js';

const key = document.body.dataset.planet;   
const data = PLANETS[key];                 
document.title = data.name[0] + data.name.slice(1).toLowerCase();

//writing the rail component
document.getElementById('rail').innerHTML = ORDER.map(k => `
  <a class="rail-link ${k === key ? 'active' : ''}" href="${k}.html">${PLANETS[k].name}</a>
`).join('');

const facts = document.getElementById('facts');
facts.innerHTML = `
  <h2>${data.name}</h2>
  <p class="blurb">${data.blurb}</p>
  <dl>
    ${data.facts.map(([label, value]) =>
      `<div><dt>${label}</dt><dd>${value}</dd></div>`
    ).join('')}
  </dl>
`;

//planet Header
const titleEl = document.getElementById('planet-title');
titleEl.textContent = data.name;


const FOV = 45;
const CAM_Z = 5;

// 1. Scene setup
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

//scene setup canvas in the stage
const stage = document.getElementById('stage');
stage.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(FOV, innerWidth / innerHeight, 0.1, 100);
camera.position.z = CAM_Z;

// 2. Planet
const texture = new THREE.TextureLoader().load(
  'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg'
);
texture.colorSpace = THREE.SRGBColorSpace;

let map = null;
if (data.texture) {
  map = new THREE.TextureLoader().load(data.texture);
  map.colorSpace = THREE.SRGBColorSpace;
}

const material = data.lit
  ? new THREE.MeshStandardMaterial({ map })
  : new THREE.MeshBasicMaterial({ map, color: map ? 0xffffff : data.color })

const planet = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  material);
planet.rotation.z = data.tilt;
scene.add(planet);

scene.add(new THREE.AmbientLight(0xffffff, 0.35));
const sun = new THREE.DirectionalLight(0xffffff, 2.4);
sun.position.set(4, 2, 4);
scene.add(sun);

// 3. Scroll
let target = 0;
let progress = 0;

const hero = document.getElementById('hero');



function readScroll() {
  const rect = hero.getBoundingClientRect();
  const max = hero.offsetHeight - window.innerHeight;
  target = Math.min(1, Math.max(0, -rect.top / max));




  const nav = document.querySelector('nav');
  const rail = document.querySelector('.rail'); 

  // Calculate total remaining scrollable depth on the page
  const totalPageHeight = document.documentElement.scrollHeight;
  const currentScrollPosition = window.scrollY + window.innerHeight;
  const distanceToBottom = totalPageHeight - currentScrollPosition;

  const fadeThreshold = 300; 

  let targetOpacity = 1;

  if (distanceToBottom < fadeThreshold) {
    // maths for opacity
    targetOpacity = Math.max(0, distanceToBottom / fadeThreshold);
  }

  // Opacity implepmentor
  if (nav) {
    nav.style.opacity = targetOpacity.toFixed(2);
    // Completely disable pointer actions when invisible so they don't block clicks underneath
    nav.style.pointerEvents = targetOpacity === 0 ? 'none' : 'auto';
    nav.style.transition = 'opacity 0.1s ease-out';
  }
  
  if (rail) {
    rail.style.opacity = targetOpacity.toFixed(2);
    rail.style.pointerEvents = targetOpacity === 0 ? 'none' : 'auto';
    rail.style.transition = 'opacity 0.1s ease-out';
  }
}

 // console.log(target);

addEventListener('scroll', readScroll, { passive: true });
readScroll();
progress = target;

// 4. Scroll behaviours(a,b = positioning , r = radius , t= transition scaling)
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function place(x, y, r) {
  const worldPerPixel =
    (2 * CAM_Z * Math.tan((FOV / 2) * Math.PI / 180)) / innerHeight;
  planet.position.x =  (x - innerWidth  / 2) * worldPerPixel;
  planet.position.y = -(y - innerHeight / 2) * worldPerPixel;
  planet.scale.setScalar(r * worldPerPixel);
}

function layout(p) {
  const w = innerWidth, h = innerHeight;
  const start = { x: w / 2, y: h,        r: Math.min(w * 0.46, h * 0.55) };
  const mid   = { x: w / 2, y: h * 0.54, r: Math.min(w, h) * 0.30 };
  const t = smooth(0, 1, p);
  return {
    x: lerp(start.x, mid.x, t),
    y: lerp(start.y, mid.y, t),
    r: lerp(start.r, mid.r, t),
  };
}

// 5. Dragging the planet
let current = { x: 0, y: 0, r: 1 };
let dragging = false;
let lastX = 0, lastY = 0;

const overPlanet = (e) =>
  Math.hypot(e.clientX - current.x,
             e.clientY - stage.getBoundingClientRect().top - current.y) < current.r;

addEventListener('pointerdown', (e) => {
  if (!overPlanet(e)) return;
  dragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});
addEventListener('pointerup', () => { dragging = false; });
addEventListener('pointermove', (e) => {
  if (!dragging) return;
  planet.rotation.y += (e.clientX - lastX) * 0.005;
  planet.rotation.x += (e.clientY - lastY) * 0.005;
  lastX = e.clientX;
  lastY = e.clientY;
});











// 2. Loop for animation rendering
function animate() {
  requestAnimationFrame(animate);

  progress += (target - progress) * 0.1;
  current = layout(progress);
  place(current.x, current.y, current.r);

  //facts opacity incrementer
  const f = smooth(0.85, 1, progress);
  facts.style.opacity = f;
  facts.style.transform = `translateY(${(1 - f) * 24}px)`;
  facts.style.pointerEvents = f > 0.5 ? 'auto' : 'none';

  //Planet title opacity
  const v = smooth(0.05, 0.5, progress);
  titleEl.style.opacity = 1 - v;
  titleEl.style.filter = `blur(${v * 14}px)`;
  titleEl.style.transform = `translateY(calc(-50% - ${v * 80}px)) scale(${1 + v * 0.15})`;

  const v2 = smooth(0.05, 0.5, progress);
  titleEl.style.setProperty('--edge', `${120 - v * 120}%`);



  if (!dragging) planet.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();

// 7. Resize
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});