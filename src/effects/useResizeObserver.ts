import React from "react";
import { ResizeObserver } from "resize-observer";

export const useResizeObserver = () => {
  const [ width, setWidth ] = React.useState(0);
  const [ height, setHeight ] = React.useState(0);

  const refCallback = React.useCallback(($el: HTMLElement) => {
    if (!$el) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      setWidth(entry.contentRect.width);
      setHeight(entry.contentRect.height);
    });

    ro.observe($el);
    
    setWidth($el.getBoundingClientRect().width);
    setHeight($el.getBoundingClientRect().height);
    
    return () => {
      ro.disconnect();
    }
  }, []);

  return [ 
    width, 
    height, 
    refCallback 
  ] as [ 
    number, 
    number,
    ($el: HTMLElement) => void 
  ];
} 