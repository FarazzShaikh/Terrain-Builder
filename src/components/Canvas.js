import React, { useEffect, useRef } from "react";

export function Canvas({ main, update, options }) {
  const mount = useRef(null);

  useEffect(() => {
    if (mount.current) {
      main(mount, options);
      mount.current = false;
    } else {
      update(options);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return <canvas width="500px" height="500px" ref={mount} />;
}
