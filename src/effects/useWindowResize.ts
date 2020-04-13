import React from "react";
import _ from "lodash";

export const useWindowResize = () => {
  const [ token, setToken ] = React.useState(false);

  const fn = () => setToken(token ? false : true);

  const debounce = React.useMemo(() => _.debounce(fn, 300), [fn]);

  React.useEffect(() => {
    window.addEventListener("resize", debounce);
    return () => {
      window.removeEventListener("resize", debounce);
    }
  },[debounce]);

  return [];
}