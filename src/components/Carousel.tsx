import React from "react";
import { Carousel as CarouselFactory, CarouselItem, CarouselControl } from "reactstrap";

interface Image {
  src: string;
}

interface CarouselProps {
  items: Image[]
}

export const Carousel = (props: CarouselProps) => {
  const [ activeIndex, setIndex ] = React.useState(0);

  const slides = props.items.map((item) => {
    return (
      <CarouselItem key={item.src} >
        <img 
          width={"100%"}
          src={item.src} 
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
  )
}