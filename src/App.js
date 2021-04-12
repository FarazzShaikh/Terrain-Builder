import React, { useEffect, useRef } from "react";
import "./App.css";

import * as THREE from "three";

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

    const animate = function () {
      requestAnimationFrame(animate);
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
