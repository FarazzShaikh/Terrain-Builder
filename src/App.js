import React, { useState } from "react";
import { Canvas } from "./components/Canvas";
import Controls from "./components/Controls";
import { OPTIONS } from "./Defaults";
import { main, update } from "./app/main";

console.clear();
function App() {
  const [options, setOptions] = useState(OPTIONS);

  console.log(options);
  return (
    <div className="App">
      <Controls options={options} setOptions={setOptions} />
      <Canvas main={main} update={update} options={options} />
    </div>
  );
}

export default App;
