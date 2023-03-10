import React, { useRef } from "react";
import { useCarousel } from "use-carousel-hook";


const Carousel = (props) => {
  const { items } = props;
  const { ref, previous, next, setCurrent, reset } = useCarousel();
  console.log(ref);

  const reference = useRef(ref);

  return (
    <div className="carousel">
      <button onClick={() => console.log("chungus")}>pring big chungus to console</button>
      <button onClick={() => previous()}>Previous</button>
      <button onClick={() => previous(2)}>Go back 2 items</button>
      <button onClick={() => next()}>Next</button>
      <button onClick={() => next(2)}>Go forward 2 items</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => setCurrent(2)}>Set index to 2</button>

      <ul ref={reference} className="carousel__list">
        {items.map((item) => (
          <li className="carousel__item" key={item.id}>
            <figure className="carousel__item__figure">
              <div className="carousel__item__img-wrapper">
                <div className="carousel__item__img-inner">
                  <img
                    className="carousel__item__img"
                    src={item.image.src}
                    alt={item.image.alt}
                  />
                </div>
              </div>
              <figcaption className="carousel__item__figcaption">
                {item.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
