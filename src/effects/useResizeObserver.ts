import React from "react";
import { ResizeObserver } from "resize-observer";

export const useResizeObserver = () => {
  const [ rect, setRect ] = React.useState({
    width: 0,
    height: 0
  })

  const refCallback = React.useCallback(($el: HTMLElement) => {
    if (!$el) return;

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      setRect(entry.contentRect);
    });

    ro.observe($el);
    setRect($el.getBoundingClientRect())
    
    return () => {
      ro.disconnect();
    }
  }, []);

  return [ 
    rect.width, 
    rect.height, 
    refCallback 
  ] as [ 
    number, 
    number,
    ($el: HTMLElement) => void 
  ];
} 