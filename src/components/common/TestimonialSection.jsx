import React from "react";
import Slider from "react-slick";
import TestimonialCard from "./TestimonialCard";
import img1 from "../../assets/Images/Horoscope Imgs/podcast1.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      image: img1,
      name: "John Doe",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas tincidunt. Nullam nec purus nec purus ultricies.",
    },
    {
      id: 2,
      image: "",
      name: "Jane Doe",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas tincidunt. Nullam nec purus nec purus ultricies.",
    },
    {
      id: 3,
      image: "",
      name: "John Doe",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas tincidunt. Nullam nec purus nec purus ultricies.",
    },
    {
      id: 4,
      image: "",
      name: "Jane Doe",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas tincidunt. Nullam nec purus nec purus ultricies.",
    },
    {
      id: 5,
      image: "",
      name: "John Doe",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas tincidunt. Nullam nec purus nec purus ultricies.",
    },
    {
      id: 6,
      image: "",
      name: "Jane Doe",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien egestas tincidunt. Nullam nec purus nec purus ultricies.",
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
    <div className="testimonial_bg mb-5 py-5">
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
