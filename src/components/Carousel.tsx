import React from "react";
import { Carousel as CarouselFactory, CarouselItem, CarouselControl } from "reactstrap";
import { useResizeObserver } from "../effects/useResizeObserver";
import Jimp from "jimp";

interface Image {
  src: string;
}

interface CarouselProps {
  items: Image[];
}

export const Carousel = (props: CarouselProps) => {
  const [ activeIndex, setIndex ] = React.useState(0);
  const [ width, height, refCallback ] = useResizeObserver();

  const slides = props.items.map((item, idx) => {
    if (!width) return <React.Fragment key={idx}></React.Fragment>;

    const height = width * 0.5625;
    
    return (
      <CarouselItem key={idx} >
        <img 
          width={width}
          height={height}
          src={item.src + `?w=${width}&h=${height}`} 
        />
      </CarouselItem>
    );
  });

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
    <div 
      ref={refCallback}>
      <CarouselFactory
        activeIndex={activeIndex}
        next={next}
        previous={prev}
      >
        {slides}
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