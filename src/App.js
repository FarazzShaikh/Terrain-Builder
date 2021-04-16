import React, { useEffect, useRef } from "react";
import "./App.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function App() {
  const mount = useRef(null);

  useEffect(() => {
    console.clear();
    console.log(mount);

    const fov = 45;
    const aspectRatio = window.innerWidth / window.innerHeight;
    const nearPlane = 0.1;
    const farPlane = 1000;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      fov,
      aspectRatio,
      nearPlane,
      farPlane
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: mount.current,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      cube.rotation.x += 0.01; // Add little to the X component
      cube.rotation.z += 0.01; // Add little to the Z component

      controls.update();
      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="App">
      <canvas width="500px" height="500px" ref={mount} />
    </div>
  );
}

export default App;
