import React, { useEffect, useRef } from "react";
import "./App.css";
import { main } from "./app/main";

function App() {
  const mount = useRef(null);

  useEffect(() => {
    main(mount);
  }, []);

  return (
    <div className="App">
      <canvas width="500px" height="500px" ref={mount} />
    </div>
  );
}

export default App;
