import React from "react";
import _ from "lodash";

export function useWindowSize() {
  let [size, setSize] = React.useState([0, 0]);

  const debouncedSet = _.debounce(updateSize, 30);

  React.useLayoutEffect(() => {
    window.addEventListener('resize', debouncedSet);
    debouncedSet();
    return () => window.removeEventListener('resize', debouncedSet);
  }, []);

  return size;

  function updateSize() {
    console.log("UPDATE SIZE")
    setSize([window.innerWidth, window.innerHeight]);
  }
}