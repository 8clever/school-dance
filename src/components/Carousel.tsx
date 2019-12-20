import React from "react";
import { Carousel as CarouselFactory, CarouselItem, CarouselControl } from "reactstrap";
import emptyPNG from "../images/empty.png";

interface ImageItem {
  src: string;
}

interface CarouselProps {
  items: ImageItem[];
}

interface ImageProps {
  src: string;
  width?: number | string;
  height?: number | string;
}

export const Image = (props: ImageProps) => {
  return (
    <div 
      style={{ 
      width: props.width, 
      height: props.height,
      background: `
        url("${props.src}") no-repeat content-box center / cover,
        url("${emptyPNG}") no-repeat content-box center / cover
      `
    }} />
  )
}

export const Carousel = (props: CarouselProps) => {
  const [ activeIndex, setIndex ] = React.useState(0);
  const [ height, setHeight ] = React.useState(0);
  const items = props.items.length ? props.items : [
    {
      src: emptyPNG
    }
  ]

  const next = () => {
    if (props.items[activeIndex + 1]) {
      setIndex(activeIndex + 1);
      return;
    }
    setIndex(0);
  }

  const prev = () => {
    if (props.items[activeIndex - 1]) {
      setIndex(activeIndex - 1)
      return;
    }
    setIndex(props.items.length - 1);
  }

  return (
    <div ref={node => {
      if (!node) return;
      const height = node.getBoundingClientRect().width * 0.5;
      setHeight(height);
    }}>
      <CarouselFactory
        activeIndex={activeIndex}
        next={next}
        previous={prev}
      >
        {items.map((item, idx) => {
          return (
            <CarouselItem key={idx}>
              <Image 
                width={"100%"}
                height={height}
                src={item.src}
              />
            </CarouselItem>
          )
        })}
        <CarouselControl 
          direction="prev" 
          directionText="Previous" 
          onClickHandler={prev} 
        />
        <CarouselControl 
          direction="next" 
          directionText="Next" 
          onClickHandler={next} 
        />
      </CarouselFactory>
    </div>
  )
}