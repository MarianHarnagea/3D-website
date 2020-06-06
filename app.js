//Variables for setup

let container;
let camera;
let renderer;
let scene;
let earth;

function init() {
  container = document.querySelector(".scene");

  //Create scene
  scene = new THREE.Scene();

  const fov = 35;
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 10000;

  //Camera setup
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 430);

  //Lights
  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xffffff, 0);
  light.position.set(40, 40, 0);
  scene.add(light);

  //Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  container.appendChild(renderer.domElement);

  //Load Model
  let loader = new THREE.GLTFLoader();
  loader.load("./scene/scene.gltf", function (gltf) {
    scene.add(gltf.scene);
    earth = gltf.scene.children[0];
    animate();
  });

  //Starfield
  let starGeometry = new THREE.SphereGeometry(3000, 0, 0);
  let starMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.ImageUtils.loadTexture("imgs/stars.png"),
    side: THREE.DoubleSide,
    shininess: 0,
  });
  let starField = new THREE.Mesh(starGeometry, starMaterial);
  scene.add(starField);

  //Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  // to disable zoom
  controls.enableZoom = false;
}

function animate() {
  requestAnimationFrame(animate);
  earth.rotation.z += 0.001;

  renderer.render(scene, camera);
}

init();

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

// End of 3D background

// Content Section

//Hamburger Style

function myFunction(x) {
  x.classList.toggle("change");
}

const burger = document.querySelector(".hamburger");
const pageWrapper = document.querySelector(".page-wrapper");
const title = document.querySelector(".title");
const overlay = document.querySelector(".overlay");

const content = () => {
  // Show Content
  burger.addEventListener("click", () => {
    pageWrapper.classList.toggle("page-wrapper-show");
  });

  // Disable Primary Title
  burger.addEventListener("click", () => {
    title.classList.toggle("title-show");
  });

  burger.addEventListener("click", () => {
    overlay.classList.toggle("nav");
  });

  //Section FullPage Animation
  new fullpage("#fullpage", {
    //options here
    menu: "#menu",
    scrollingSpeed: 700,
    navigation: true,
    navigationTooltips: [
      "Live the Future",
      "Artificial Inteligence",
      "Natural Language Processing",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Conventional Neural Network",
      "Augmented Reality",
      "Blockchain Technology",
    ],
  });

  // Text Animation h1 , h2 , p

  const ts = document.querySelectorAll(".text-container h1");
  const titles = document.querySelectorAll(".text-container h2");
  const pharagrafs = document.querySelectorAll(".text-container p");

  //1
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.style.animation = `tSlideIn 1s ${entry.target.dataset.delay} forwards ease`;
      } else {
        entry.target.style.animation = "none";
      }
    });
  });
  ts.forEach((t) => {
    observer.observe(t);
  });

  //2
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.style.animation = `h2SlideIn 0.4s ${entry.target.dataset.delay} ease-out forwards`;
      } else {
        entry.target.style.animation = "none";
      }
    });
  });
  titles.forEach((title) => {
    observer.observe(title);
  });

  //3
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.style.animation = `pSlideIn 0.4s ${entry.target.dataset.delay} ease-out forwards `;
      } else {
        entry.target.style.animation = "none";
      }
    });
  });
  pharagrafs.forEach((pharagraf) => {
    observer.observe(pharagraf);
  });
};

content();
