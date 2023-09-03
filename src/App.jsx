import './App.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import gsap from 'gsap';
import * as dat from 'dat.gui';
import ft from './assets/mystic_ft.jpg';
import bk from './assets/mystic_bk.jpg';
import up from './assets/mystic_up.jpg';
import dn from './assets/mystic_dn.jpg';
import rt from './assets/mystic_rt.jpg';
import lf from './assets/mystic_lf.jpg';
import ft2 from './assets/polluted_earth_ft.jpg';
import bk2 from './assets/polluted_earth_bk.jpg';
import up2 from './assets/polluted_earth_up.jpg';
import dn2 from './assets/polluted_earth_dn.jpg';
import rt2 from './assets/polluted_earth_rt.jpg';
import lf2 from './assets/polluted_earth_lf.jpg';
import ft3 from './assets/room_ft.jpg';
import bk3 from './assets/room_bk.jpg';
import up3 from './assets/room_up.jpg';
import dn3 from './assets/room_dn.jpg';
import rt3 from './assets/room_rt.jpg';
import lf3 from './assets/room_lf.jpg';

var gui, scene, camera, renderer, cssRenderer, controls;

function init() {

  //gui = new dat.GUI();
  //document.body.appendChild(gui.domElement);
  var viewWidth = window.innerWidth;
  var viewHeight = window.innerHeight;

  // BASIC SETUP

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55, viewWidth / viewHeight, 45, 12000);
  camera.position.set(-900, -200, -900);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(viewWidth, viewHeight);
  document.body.appendChild(renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 500;
  controls.maxDistance = 1500;

  // FIRST SKYBOX

  var materialArray = [];
  var texture_ft = new THREE.TextureLoader().load(ft);
  var texture_bk = new THREE.TextureLoader().load(bk);
  var texture_up = new THREE.TextureLoader().load(up);
  var texture_dn = new THREE.TextureLoader().load(dn);
  var texture_rt = new THREE.TextureLoader().load(rt);
  var texture_lf = new THREE.TextureLoader().load(lf);

  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

  for (var i = 0; i < 6; i++) {
    materialArray[i].side = THREE.BackSide;
  }

  var skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  var skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);

  // SECOND (UP) SKYBOX

  var materialArray2 = [];
  var texture_ft2 = new THREE.TextureLoader().load(ft2);
  var texture_bk2 = new THREE.TextureLoader().load(bk2);
  var texture_up2 = new THREE.TextureLoader().load(up2);
  var texture_dn2 = new THREE.TextureLoader().load(dn2);
  var texture_rt2 = new THREE.TextureLoader().load(rt2);
  var texture_lf2 = new THREE.TextureLoader().load(lf2);

  materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_ft2 }));
  materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_bk2 }));
  materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_up2 }));
  materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_dn2 }));
  materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_rt2 }));
  materialArray2.push(new THREE.MeshBasicMaterial({ map: texture_lf2 }));

  for (var i = 0; i < 6; i++) {
    materialArray2[i].side = THREE.BackSide;
  }

  var skyboxGeo2 = new THREE.BoxGeometry(10000, 10000, 10000);
  var skybox2 = new THREE.Mesh(skyboxGeo2, materialArray2);
  scene.add(skybox2);
  skybox2.position.set(0, 15000, 0);

  // THIRD (DOWN) SKYBOX

  var materialArray3 = [];
  var texture_ft3 = new THREE.TextureLoader().load(ft3);
  var texture_bk3 = new THREE.TextureLoader().load(bk3);
  var texture_up3 = new THREE.TextureLoader().load(up3);
  var texture_dn3 = new THREE.TextureLoader().load(dn3);
  var texture_rt3 = new THREE.TextureLoader().load(lf3);
  var texture_lf3 = new THREE.TextureLoader().load(rt3);

  materialArray3.push(new THREE.MeshBasicMaterial({ map: texture_ft3 }));
  materialArray3.push(new THREE.MeshBasicMaterial({ map: texture_bk3 }));
  materialArray3.push(new THREE.MeshBasicMaterial({ map: texture_up3 }));
  materialArray3.push(new THREE.MeshBasicMaterial({ map: texture_dn3 }));
  materialArray3.push(new THREE.MeshBasicMaterial({ map: texture_rt3 }));
  materialArray3.push(new THREE.MeshBasicMaterial({ map: texture_lf3 }));

  for (var i = 0; i < 6; i++) {
    materialArray3[i].side = THREE.BackSide;
  }

  var skyboxGeo3 = new THREE.BoxGeometry(10000, 10000, 10000);
  var skybox3 = new THREE.Mesh(skyboxGeo3, materialArray3);
  scene.add(skybox3);
  skybox3.position.set(0, -15000, 0);

  // HTML RENDERER

  cssRenderer = new CSS2DRenderer();
  cssRenderer.setSize(viewWidth, viewHeight);
  cssRenderer.domElement.style.position = 'absolute';
  cssRenderer.domElement.style.top = '0px';
  document.body.appendChild(cssRenderer.domElement);

  // HTML ELEMENTS

  const container = document.createElement('div');
  container.className = 'container';

  const goUp = document.createElement('p');
  goUp.className = 'go';
  goUp.textContent = 'Projects';
  goUp.addEventListener('click', () => {
    document.getElementById('overlay').classList.add("blink");
    setTimeout(() => {
      document.getElementById('overlay').classList.remove("blink");
    }, 2000);
    setTimeout(() => {
      gsap.to(controls.target, {
        y: 15000,
        duration: 1.5
      });
      gsap.to(camera.position, {
        y: 15000,
        duration: 1.5
      });
      controls.update();
    }, 100);
  });
  container.appendChild(goUp);

  const greet = document.createElement('h2');
  greet.className = 'greet';
  greet.textContent = 'Welcome to my Portfolio !';
  container.appendChild(greet);

  const name = document.createElement('h1');
  name.className = 'name';
  name.textContent = "I'm Juan José Farina";
  container.appendChild(name);

  const title = document.createElement('h3');
  title.className = 'title';
  title.textContent = "Software Developer";
  container.appendChild(title);

  const goDown = document.createElement('p');
  goDown.className = 'go';
  goDown.textContent = 'About Me';
  goDown.addEventListener('click', () => {
    document.getElementById('overlay').classList.add("blink");
    setTimeout(() => {
      document.getElementById('overlay').classList.remove("blink");
    }, 2000);
    setTimeout(() => {
      gsap.to(controls.target, {
        y: -15000,
        duration: 1.5
      });
      gsap.to(camera.position, {
        y: -15000,
        duration: 1.5
      });
    }, 100);
  });
  container.appendChild(goDown);

  const cssObject = new CSS2DObject(container);
  cssObject.position.set(7500, 1000, 7500);
  scene.add(cssObject);

  // HTML ELEMENTS PROJECTS

  const projects = document.createElement('div');
  projects.className = 'projects';

  const projHeading = document.createElement('h3');
  projHeading.textContent = 'Here you can explore some of my projects'
  projects.appendChild(projHeading);

  const goBack = document.createElement('p');
  goBack.className = 'go';
  goBack.textContent = 'Go Back Down';
  projects.appendChild(goBack);
  goBack.addEventListener('click', () => {
    document.getElementById('overlay').classList.add("blink");
    setTimeout(() => {
      document.getElementById('overlay').classList.remove("blink");
    }, 2000);
    setTimeout(() => {
      gsap.to(controls.target, {
        y: 0,
        duration: 1.5
      });
      gsap.to(camera.position, {
        y: 0,
        duration: 1.5
      });
    }, 100);
  });

  const cssObject2 = new CSS2DObject(projects);
  cssObject2.position.set(6300, 15000, 6300);
  scene.add(cssObject2);

  const project1 = document.createElement('div');
  project1.className = 'project';
  project1.textContent = 'Administrative Panel';
  const proj1Desc = document.createElement('p');
  proj1Desc.textContent = "Semi-Senior Frontend Technical Challenge made in Angular";
  project1.appendChild(proj1Desc);

  const project1Obj = new CSS2DObject(project1);
  project1Obj.position.set(-2000, 18000, 2000);
  scene.add(project1Obj);

  // HTML ELEMENTS ABOUT ME

  const aboutMe = document.createElement('div');
  aboutMe.className = 'aboutMe';

  const goBackUp = document.createElement('p');
  goBackUp.className = 'go';
  goBackUp.textContent = 'Go Back Up';
  aboutMe.appendChild(goBackUp);
  goBackUp.addEventListener('click', () => {
    document.getElementById('overlay').classList.add("blink");
    setTimeout(() => {
      document.getElementById('overlay').classList.remove("blink");
    }, 2000);
    setTimeout(() => {
      gsap.to(controls.target, {
        y: 0,
        duration: 1.5
      });
      gsap.to(camera.position, {
        y: 0,
        duration: 1.5
      });
    }, 100);
  });

  const me = document.createElement('p');
  me.className = 'me';
  me.textContent = "I'm an enthusiastic software developer with a big passion for all things tech and logical puzzles. I'm versed in many different languages and I'm able to work in frontend, backend, and all kinds of projects";
  aboutMe.appendChild(me);

  const cssObject3 = new CSS2DObject(aboutMe);
  cssObject3.position.set(6300, -15000, 6300);
  scene.add(cssObject3);

  // ANIMATE CALL

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  cssRenderer.render(scene, camera);
  renderer.render(scene, camera);
}

init();

function App() {
  return (
    <>
      <div id='overlay' />
    </>
  )
}

export default App