import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

function NoCountSection() {
    const stats = [
        {
          id: 1,
          value: 15000,
          label: 'HAPPY CLIENTS',
        },
        {
          id: 2,
          value: 75000,
          label: 'STUDENTS',
        },
        {
          id: 3,
          value: 33,
          label: 'AWARDS',
        },
        {
          id: 4,
          value: 2036,
          label: 'OVERSEAS CUSTOMERS',
        },
      ];
    

  return (
    <section className="text-gray-600 body-font py-7">
      <div className="container px-5 py-24 mx-auto nocount_bg rounded-lg">
        <div className="flex flex-wrap -m-4 text-center">
          {stats.map((item) => (
            <CountUpOnView key={item.id} value={item.value} label={item.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

const CountUpOnView = ({ value, label }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,  // Animation triggers only once
    threshold: 0.5,     // Trigger when 50% of the element is visible
  });

  return (
    <div ref={ref} className="px-10 md:w-1/4 sm:w-1/2 w-full">
      <div className="border-2 border-gray-200 py-4 bg-white text-black rounded-full">
        <h2 className="title-font font-bold text-3xl text-newBlue">
          {inView ? <CountUp end={value} duration={2.5} /> : '0'}
        </h2>
        <p className="leading-relaxed text-md text-newBlue">{label}</p>
      </div>
    </div>
  );
};

export default NoCountSection;
