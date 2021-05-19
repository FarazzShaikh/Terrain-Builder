import React, { useEffect, useRef } from "react";
import { update } from "../app/main";

export function Canvas({ main, octaves }) {
  const mount = useRef(null);

  useEffect(() => {
    main(mount, octaves);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    update(octaves);
  });

  return <canvas width="500px" height="500px" ref={mount} />;
}
