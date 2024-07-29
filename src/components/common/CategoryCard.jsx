import { useState } from "react";

function CategoryCard({ category }) {
  const [isHovered, setIsHovered] = useState(false);
  const descriptionWordSize = 100

  return (
    <div
      className={`relative flex flex-col mt-6 mb-3 text-gray-700 text-white bg-course-details2 shadow-sm bg-clip-border rounded-xl w-96 transition-all duration-200 ${
        isHovered ? "hover:scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal truncate">
          {category.name}
        </h5>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {/* {category.description} */}
          {category.description.length > descriptionWordSize
            ? category.description.substring(0, descriptionWordSize) + "..."
            : category.description}
        </p>
      </div>
    </div>
  );
}

export default CategoryCard;
