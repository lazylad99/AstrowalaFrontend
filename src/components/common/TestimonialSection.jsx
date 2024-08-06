import React from "react";
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      image: "",
      name: "Shhimonaa Sharma",
      review:
        "Numerology is very easy & best with astrowala.com. Acharya ji trained course very well. Thanks.",
    },
    {
      id: 2,
      image: "",
      name: "Ramesh Roshan",
      review:
        "I consulted with astrowala.com for my job & by doing 2 remedies only I got my job.",
    },
    {
      id: 3,
      image: "",
      name: "Rohan Sharma",
      review:
        "Remedies in Numerology by astrology are very very good & nominal too. By small small remedies I achieved my goal.",
    },
    {
      id: 4,
      image: "",
      name: "Sushmita Rao",
      review:
        "I was 35 years old and my marriage was not happening, I didn't know why. Astrowala.com gave me one remedy only & I'm married now.",
    },
  ];
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="testimonial_bg py-5">
      <section className="relative mx-auto box-content w-full max-w-maxContentTab px-4 pb-4 mb-12 lg:max-w-maxContent lg:w-full">
        <div className="flex flex-col gap-4 items-center ">
          <div className="flex flex-col items-center w-full mb-8 lg:w-1/2 lg:mb-0">
            <h2 className="mb-4 text-3xl font-bold leading-tight text-center text-gray-800 lg:text-4xl">
              What our customers are saying
            </h2>
            <p className="text-center text-gray-600">
              We are very proud of the service we provide and stand by every
              product we carry. Read our testimonials from our happy customers.
            </p>
          </div>
          <div className="w-full">
            <Slider {...settings}>
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  image={testimonial.image}
                  name={testimonial.name}
                  review={testimonial.review}
                />
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TestimonialSection;
