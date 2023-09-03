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
import interneg from './assets/planets/interneg.jpeg';
import pwc from './assets/planets/pwc.jpg';
import ggj from './assets/planets/ggj.png';
import arb from './assets/planets/arb.jpeg';

var gui, scene, camera, renderer, cssRenderer, controls, proj1, proj2, proj3, proj4;

function init() {

  gui = new dat.GUI();
  document.body.appendChild(gui.domElement);
  var viewWidth = window.innerWidth;
  var viewHeight = window.innerHeight;

  // BASIC SETUP

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55, viewWidth / viewHeight, 45, 12500);
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
  goUp.textContent = '⇑ Projects ⇑';
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

  const mobMove = document.createElement('p');
  mobMove.className = 'mobile';
  mobMove.textContent = '⇐ Drag to move around ⇒';
  container.appendChild(mobMove);

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
  goDown.textContent = '⇓ About Me ⇓';
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

  const rightMsg = document.createElement('div');
  rightMsg.className = 'moveMsg';
  const leftMsg = document.createElement('div');
  leftMsg.className = 'moveMsg';
  const moveMsg = document.createElement('h4');
  moveMsg.textContent = 'Drag to move around';
  const moveMsg2 = document.createElement('h4');
  moveMsg2.textContent = 'Drag to move around';
  const rightArrow = document.createElement('h4');
  rightArrow.textContent = '⇒';
  const leftArrow = document.createElement('h4');
  leftArrow.textContent = '⇐';

  rightMsg.appendChild(moveMsg);
  rightMsg.appendChild(rightArrow);

  leftMsg.appendChild(moveMsg2);
  leftMsg.appendChild(leftArrow);

  const rtMsgObj = new CSS2DObject(rightMsg);
  rtMsgObj.position.set(1500, 1000, 10000);
  scene.add(rtMsgObj);

  const lfMsgObj = new CSS2DObject(leftMsg);
  lfMsgObj.position.set(10000, 1000, 1500);
  scene.add(lfMsgObj);

  // HTML ELEMENTS PROJECTS

  const projects = document.createElement('div');
  projects.className = 'projects';

  const projHeading = document.createElement('h3');
  projHeading.textContent = 'Explore the stars to see some of my projects'
  projects.appendChild(projHeading);

  const goBack = document.createElement('p');
  goBack.className = 'go';
  goBack.textContent = '⇓ Go Back ⇓';
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

  // PROJECT 1

  const project1 = document.createElement('div');
  project1.className = 'project';
  project1.textContent = 'Administrative Panel';
  const proj1Desc = document.createElement('p');
  proj1Desc.textContent = "Semi-Senior Frontend Technical Challenge made with TypeScript, Angular, Bootstrap and Vercel";
  project1.appendChild(proj1Desc);
  project1.addEventListener('click', () => {window.open('https://interneg-challenge.vercel.app/')})

  const project1Obj = new CSS2DObject(project1);
  project1Obj.position.set(-2000, 17000, 2000);
  scene.add(project1Obj);

  proj1 = new THREE.Mesh(new THREE.SphereGeometry(200, 15, 15), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(interneg)
  }))
  proj1.position.set(-2000, 18000, 2000);
  scene.add(proj1);

  // PROJECT 2

  const project2 = document.createElement('div');
  project2.className = 'project';
  project2.textContent = 'ML REST API';
  const proj2Desc = document.createElement('p');
  proj2Desc.textContent = "Junior MLops Technical Challenge made with Python, FastAPI, MongoDB, and other ML libraries, with a CI/CD Pipeline with Unit-Testing, Linting, Type-Checking and Vercel";
  project2.appendChild(proj2Desc);
  project2.addEventListener('click', () => {window.open('https://ml-fast-api.vercel.app/docs#')})

  const project2Obj = new CSS2DObject(project2);
  project2Obj.position.set(2000, 17000, -2000);
  scene.add(project2Obj);

  proj2 = new THREE.Mesh(new THREE.SphereGeometry(200, 15, 15), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(pwc)
  }))
  proj2.position.set(2000, 18000, -2000);
  scene.add(proj2);

  // PROJECT 3

  const project3 = document.createElement('div');
  project3.className = 'project';
  project3.textContent = 'Web Videogame';
  const proj3Desc = document.createElement('p');
  proj3Desc.textContent = "Made during the 2015's Rosario Global Game Jam, an international 48hr development marathon";
  project3.appendChild(proj3Desc);
  project3.addEventListener('click', () => {window.open('https://gamejolt.com/games/jamming/46288')})

  const project3Obj = new CSS2DObject(project3);
  project3Obj.position.set(-1500, 16000, -5000);
  scene.add(project3Obj);

  proj3 = new THREE.Mesh(new THREE.SphereGeometry(200, 15, 15), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(ggj)
  }))
  proj3.position.set(-1500, 17000, -5000);
  scene.add(proj3);

  // PROJECT 4

  const project4 = document.createElement('div');
  project4.className = 'project';
  project4.textContent = 'ARB Institutional Website';
  const proj4Desc = document.createElement('p');
  proj4Desc.textContent = "Made using Ajax, jQuery, PHP and MySQL, features student's registration, dashboards, tests submition, etc.";
  project4.appendChild(proj4Desc);
  project4.addEventListener('click', () => {window.open('https://www.academiarosarioballet.com.ar')})

  const project4Obj = new CSS2DObject(project4);
  project4Obj.position.set(-4000, 15000, 2000);
  scene.add(project4Obj);

  proj4 = new THREE.Mesh(new THREE.SphereGeometry(120, 15, 15), new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(arb)
  }))
  proj4.position.set(-4000, 16000, 2000);
  scene.add(proj4);

  // HTML ELEMENTS ABOUT ME

  const aboutMe = document.createElement('div');
  aboutMe.className = 'aboutMe';

  const goBackUp = document.createElement('p');
  goBackUp.className = 'go';
  goBackUp.textContent = '⇑ Go Back ⇑';
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
  me.textContent = "Explore the room to find more about my experience, education, personality and also how to contact me";
  aboutMe.appendChild(me);

  const cssObject3 = new CSS2DObject(aboutMe);
  cssObject3.position.set(6300, -15000, 6300);
  scene.add(cssObject3);

  //PERSONAL INFORMATION

  const personal = document.createElement('div');
  personal.className = 'aboutMe';

  const personality = document.createElement('p');
  personality.textContent = "I'm an enthusiastic developer with a big passion for technology and logic. I've always loved to solve problems, discover the inner workings of technology, create algorithms and more efficient and effective solutions for every day problems.";
  personal.appendChild(personality);

  const personality2 = document.createElement('p');
  personality2.textContent = "I've also always loved sports, dance, art and music. I worked as professional dancer and taught dance for over 10 years. I'm also a member of the International Dance Council, and of Mensa International.";
  personal.appendChild(personality2);

  const persObj = new CSS2DObject(personal);
  persObj.position.set(7000, -15000, -6000);
  scene.add(persObj);

  gui.add(persObj.position, 'x');
  gui.add(persObj.position, 'z');

  // ANIMATE CALL

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  cssRenderer.render(scene, camera);
  renderer.render(scene, camera);
  proj1.rotation.y += 0.01;
  proj1.rotation.x -= 0.001;
  proj2.rotation.y += 0.01;
  proj2.rotation.x -= 0.001;
  proj3.rotation.y += 0.01;
  proj3.rotation.x -= 0.001;
  proj4.rotation.y += 0.01;
  proj4.rotation.x -= 0.001;
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