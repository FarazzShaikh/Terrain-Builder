import React, { useState } from "react";
import main from "./app/main";
import { Canvas } from "./components/Canvas";
import Controls from "./components/Controls";
import { OPTIONS } from "./Defaults";

console.clear();
function App() {
  const [options, setOptions] = useState(OPTIONS);

  console.log(options);
  return (
    <div className="App">
      <Controls options={options} setOptions={setOptions} />
      <Canvas main={main} options={options} />
    </div>
  );
}

export default App;
