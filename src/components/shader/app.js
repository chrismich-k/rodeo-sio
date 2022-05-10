import * as THREE from "three";
import fragment from "./shader/fragment.glsl";
import vertex from "./shader/vertexParticles.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import * as dat from "dat.gui";
import fragmentSimulation from "./shader/fragmentSimulation.glsl";

const WIDTH = 135;

export default class Sketch {
  constructor(options) {
    this.scene = new THREE.Scene();

    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.appendChild(this.renderer.domElement);
    //this.loader = new GLTFLoader();
    //console.log(gltf.scene.children[0]);

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      1000
    );

    // var frustumSize = 10;
    // var aspect = window.innerWidth / window.innerHeight;
    // this.camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
    this.camera.position.set(0, 0, 4);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.time = 0;
    //aca carga la imagen
    //this.loader.load(face,(gltf)=>{
    //console.log(gltf.scene.children[0]);
    //this.model = gltf.scene.children[1];
    //this.model.geometry.scale(5,5,5);
    //this.facePos = this.model.geometry.attributes.position.array
    //this.faceNumber = this.facePos.length/3;
    this.isPlaying = true;
    this.initGPGPU();
    this.addObjects();
    this.resize();
    this.render();
    this.setupResize();
    // this.settings();
  }

  initGPGPU() {
    this.gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, this.renderer);
    this.dtPosition = this.gpuCompute.createTexture(); //dt = data texture
    this.fillPositions(this.dtPosition);

    this.positionVariable = this.gpuCompute.addVariable(
      "texturePosition",
      fragmentSimulation,
      this.dtPosition
    );
    //to move particles we need to add time
    //next are position of the particles,
    this.positionVariable.material.uniforms["time"] = { value: 0 };

    this.positionVariable.wrapS = THREE.RepeatWrapping;
    this.positionVariable.wrapT = THREE.RepeatWrapping;
    this.gpuCompute.init();
  }

  fillPositions(texture) {
    let arr = texture.image.data;
    for (let i = 0; i < arr.length; i = i + 4) {
      //let rand = Math.floor(Math.random()*this.faceNumber)
      let x = Math.random();
      let y = Math.random();
      let z = Math.random();
      // let x = this.facePos[3*rand];
      // let y = this.facePos[3*rand+1];
      // let z = this.facePos[3*rand+2];
      //positions
      arr[i] = x / 12;
      arr[i + 1] = y;
      arr[i + 2] = z * 10;
      arr[i + 3] = 1;
    }
  }
  settings() {
    //let that = this;
    this.settings = {
      progress: 0,
    };
    this.gui = new dat.GUI();
    this.gui.add(this.settings, "progress", 0, 1, 0.01);
  }
  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.camera.updateProjectionMatrix();
  }

  addObjects() {
    //let that = this;
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        positionTexture: { value: null },
        resolution: { value: new THREE.Vector4() },
      },

      // wireframe: true,
      // transparent: true,
      blending: THREE.AdditiveBlending,
      vertexShader: vertex,
      fragmentShader: fragment,
    });

    this.geometry = new THREE.BufferGeometry();
    let positions = new Float32Array(WIDTH * WIDTH * 3);
    let reference = new Float32Array(WIDTH * WIDTH * 2);
    for (let i = 0; i < WIDTH * WIDTH; i++) {
      let x = Math.random();
      let y = Math.random();
      let z = Math.random();
      //row number
      let xx = (i % WIDTH) / WIDTH;
      //column number
      let yy = ~~(i / WIDTH) / WIDTH;
      positions.set([x, y, z], i * 3);
      reference.set([xx, yy], i * 2);
    }

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    this.geometry.setAttribute(
      "reference",
      new THREE.BufferAttribute(reference, 2)
    );

    this.plane = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.plane);
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if (!this.isPlaying) {
      this.render();
      this.isPlaying = true;
    }
  }

  render() {
    if (!this.isPlaying) return;
    this.time += 0.05;

    this.positionVariable.material.uniforms["time"].value = this.time;
    this.gpuCompute.compute();

    this.material.uniforms.positionTexture.value =
      this.gpuCompute.getCurrentRenderTarget(this.positionVariable).texture;

    this.material.uniforms.time.value = this.time;
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }
}
