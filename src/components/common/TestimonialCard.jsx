import defaultAvtar from "../../assets/Images/Horoscope Imgs/podcast3.webp"
function TestimonialCard({ image, name, review }) {
    const defaultImage = defaultAvtar; // Replace with your default image path
  
    return (
      <div className="flex flex-col items-center p-4 bg-white rounded-lg  w-[250px] border-2 border-pure-greys-100">
        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-200 rounded-full overflow-hidden">
          <img src={image || defaultImage} alt={name} className="object-cover w-full h-full" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-center text-gray-600">{review}</p>
      </div>
    );
  }
  
  export default TestimonialCard;
  