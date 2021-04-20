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

    controls.enableDamping = true; // Enables inertia on the camera making it come to a more gradual stop.
    controls.dampingFactor = 0.25; // Inertia factor
    controls.maxPolarAngle = Math.PI / 2; // Prevents camra from going under our object

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01; // Add little to the X component
      cube.rotation.z += 0.01; // Add little to the Z component

      controls.update();
      renderer.render(scene, camera);
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
